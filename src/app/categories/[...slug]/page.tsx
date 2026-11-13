import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, ChevronRight } from "lucide-react";
import CategorySidebar from "@/components/CategorySidebar";
import { categories, categorySlug } from "@/data/categories";
import { createGeneralContactMailto } from "@/lib/email";
import ProgressiveImage from "@/components/ProgressiveImage";

type CategoryRoute = { parent: (typeof categories)[number]; item?: string };

function resolveCategory(slug: string[]): CategoryRoute | undefined {
  if (slug.length < 1 || slug.length > 2) return undefined;
  const parent = categories.find((category) => category.id === slug[0]);
  if (!parent) return undefined;
  if (slug.length === 1) return { parent };
  const item = parent.items.find((categoryItem) => categorySlug(categoryItem) === slug[1]);
  return item ? { parent, item } : undefined;
}

export function generateStaticParams() {
  return categories.flatMap((category) => [
    { slug: [category.id] },
    ...category.items.map((item) => ({ slug: [category.id, categorySlug(item)] })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = resolveCategory(slug);
  if (!result) return { title: "Catégorie introuvable | Catalogue" };
  const title = result.item ?? result.parent.name;
  return {
    title: `${title} | Catalogue`,
    description: result.item ? `${result.item} : découvrez notre sélection dans la catégorie ${result.parent.name}.` : result.parent.description,
  };
}

type CategoryParams = Promise<{ slug: string[] }>;

export default function CategoryDetailPage({ params }: { params: CategoryParams }) {
  return (
    <Suspense fallback={<CategoryDetailFallback />}>
      <CategoryDetailContent params={params} />
    </Suspense>
  );
}

async function CategoryDetailContent({ params }: { params: CategoryParams }) {
  const { slug } = await params;
  const result = resolveCategory(slug);
  if (!result) notFound();

  const { parent, item } = result;
  const title = item ?? parent.name;
  const description = item
    ? `Parcourez notre sélection ${item.toLowerCase()} dans l’univers ${parent.name.toLowerCase()}. Retrouvez les solutions conçues pour les usages courants sur chantier et découvrez les familles de matériel disponibles. Notre équipe peut vous conseiller pour choisir les équipements adaptés à votre installation et à votre projet.`
    : parent.description;

  return (
    <main className="category-detail-page">
      <div className="category-detail-inner">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link><ChevronRight aria-hidden="true" />
          <Link href="/categories">Catégories</Link><ChevronRight aria-hidden="true" />
          {item ? <><Link href={`/categories/${parent.id}`}>{parent.name}</Link><ChevronRight aria-hidden="true" /><span>{item}</span></> : <span>{parent.name}</span>}
        </nav>

        <section className="category-detail-hero" aria-labelledby="category-detail-title">
          <div className="category-detail-copy">
            <h1 id="category-detail-title">{title}</h1>
            <p>{description}</p>
          </div>
          <ProgressiveImage className="category-detail-image" src={`/images/${parent.image}.webp`} alt={`Équipements de chantier pour la catégorie ${title}`} role="img" ariaLabel={`Équipements de chantier pour la catégorie ${title}`} position="center 45%" />
        </section>

        <div className="category-detail-layout">
          <CategorySidebar activeParentId={parent.id} activeItem={item} />

          <section className="category-products" aria-labelledby="category-products-title">
            <div className="category-products-heading">
              <div><h2 id="category-products-title">Produits</h2></div>
            </div>
            {parent.id === "echafaudage" ? (
              <div className="category-product-grid">
                <Link className="category-product-card" href="/products/blue-pulley-rope-ppt">
                  <ProgressiveImage className="category-product-card-image" src="/images/product-rope-main.webp" alt="Corde bleue de chantier avec crochet de sécurité" fit="contain" />
                  <span className="category-product-card-copy"><strong>Corde de levage bleue PPT</strong><small>Cordage de manutention · CMU 40 kg</small><span>Voir le produit <ArrowRight aria-hidden="true" /></span></span>
                </Link>
              </div>
            ) : (
              <div className="category-products-empty">
                <span className="category-products-icon"><Boxes aria-hidden="true" /></span>
                <h3>Les produits arrivent bientôt</h3>
                <p>Notre catalogue produits pour cette catégorie est en préparation. Contactez notre équipe pour toute demande ou recommandation.</p>
                <a className="button-link" href={createGeneralContactMailto()}>Contactez notre équipe <ArrowRight aria-hidden="true" /></a>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function CategoryDetailFallback() {
  return (
    <main className="category-detail-page" aria-busy="true" aria-label="Chargement de la catégorie">
      <div className="category-detail-inner">
        <div className="category-detail-skeleton-crumb" />
        <div className="category-detail-skeleton-hero"><div /><div /></div>
        <div className="category-detail-skeleton-body"><div /><div /></div>
      </div>
    </main>
  );
}
