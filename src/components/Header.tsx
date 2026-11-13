"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { categories, categorySlug } from "@/data/categories";
import { createGeneralContactMailto } from "@/lib/email";

const navItems = [
  { label: "Échafaudage", href: "/categories/echafaudage" },
  { label: "Bâches et filets", href: "/categories/baches-et-filets" },
  { label: "Étaiement", href: "/categories/etaiement" },
  { label: "Coffrage", href: "/categories/coffrage" },
  { label: "À propos", href: "/about" },
];

type SearchResult = {
  title: string;
  detail: string;
  href: string;
  searchText: string;
  kind: "Catégorie" | "Famille" | "Produit";
};

const searchIndex: SearchResult[] = [
  ...categories.flatMap((category) => [
    {
      title: category.name,
      detail: "Univers de produits",
      href: `/categories/${category.id}`,
      searchText: `${category.name} ${category.description}`,
      kind: "Catégorie" as const,
    },
    ...category.items.map((item) => ({
      title: item,
      detail: category.name,
      href: `/categories/${category.id}/${categorySlug(item)}`,
      searchText: `${item} ${category.name} ${category.description}`,
      kind: "Famille" as const,
    })),
  ]),
  {
    title: "Corde de levage bleue PPT",
    detail: "Échafaudage · Manutention",
    href: "/products/blue-pulley-rope-ppt",
    searchText: "Corde de levage bleue PPT polypropylène manutention poulie crochet",
    kind: "Produit",
  },
];

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function HeaderSearch({ idPrefix }: { idPrefix: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const normalizedQuery = normalizeSearchText(query);
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);
  const results = queryWords.length
    ? searchIndex
        .map((result, sourceIndex) => {
          const title = normalizeSearchText(result.title);
          const searchableText = normalizeSearchText(`${result.searchText} ${result.detail}`);
          const matches = queryWords.every((word) => searchableText.includes(word));
          const rank = title === normalizedQuery ? 0 : title.startsWith(normalizedQuery) ? 1 : title.includes(normalizedQuery) ? 2 : 3;
          return { result, sourceIndex, matches, rank };
        })
        .filter((item) => item.matches)
        .sort((a, b) => a.rank - b.rank || a.sourceIndex - b.sourceIndex)
        .slice(0, 7)
        .map(({ result }) => result)
    : [];
  const resultsId = `${idPrefix}-search-results`;

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!formRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  const navigateToResult = (result = results[activeIndex] ?? results[0]) => {
    if (!result) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
    setQuery("");
    router.push(result.href);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateToResult();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <form
      ref={formRef}
      className={`header-search${idPrefix === "mobile" ? " header-search-mobile" : ""}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.5" /><path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <input
        type="search"
        placeholder="Rechercher…"
        aria-label="Rechercher un produit ou une catégorie"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen && Boolean(normalizedQuery)}
        aria-controls={resultsId}
        aria-activedescendant={activeIndex >= 0 ? `${idPrefix}-search-option-${activeIndex}` : undefined}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => {
          if (normalizedQuery) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      <button className="header-search-submit" type="submit" aria-label="Lancer la recherche">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {isOpen && normalizedQuery && (
        <div className="header-search-results" id={resultsId} role="listbox" aria-label="Résultats de recherche">
          {results.length ? results.map((result, index) => (
            <Link
              className={`header-search-result${activeIndex === index ? " is-active" : ""}`}
              id={`${idPrefix}-search-option-${index}`}
              href={result.href}
              key={`${result.href}-${result.title}`}
              role="option"
              aria-selected={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
            >
              <span><strong>{result.title}</strong><small>{result.detail}</small></span>
              <small className="header-search-kind">{result.kind}</small>
            </Link>
          )) : <p className="header-search-empty">Aucun résultat. Essayez un autre terme.</p>}
        </div>
      )}
    </form>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <nav className="header-nav" aria-label="Navigation principale">{navItems.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav>
        <Link href="/" className="brand" aria-label="TeamSync, accueil"><span className="brand-name">TeamSync</span></Link>
        <div className="header-right">
          <HeaderSearch idPrefix="desktop" />
          <a className="header-action" href={createGeneralContactMailto()}>Parlons <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
        </div>
        <button className="menu-toggle" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d={open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg></button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Navigation mobile"><HeaderSearch idPrefix="mobile" />{navItems.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>}
    </header>
  );
}
