import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { categories, categorySlug } from "@/data/categories";
import { createGeneralContactMailto } from "@/lib/email";

export const metadata: Metadata = {
  title: "Toutes les catégories | Catalogue",
  description: "Parcourez toutes nos catégories de matériel d’échafaudage, bâches, étaiement et coffrage.",
};

export default function CategoriesPage() {
  return (
    <main className="category-directory">
      <div className="category-directory-inner">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link><ChevronRight aria-hidden="true" /><span>Toutes les catégories</span>
        </nav>

        <nav className="directory-jump" aria-label="Aller à un univers">
          {categories.map((category) => (
            <a href={`#${category.id}`} key={category.id}>{category.name}<ArrowRight aria-hidden="true" /></a>
          ))}
        </nav>

        <div className="directory-groups">
          {categories.map((category) => (
            <section className="directory-group" id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
              <div className="directory-group-heading">
                <div><h2 id={`${category.id}-title`}><Link href={`/categories/${category.id}`}>{category.name}</Link></h2></div>
              </div>
              <ul className="directory-items">
                {category.items.map((item) => (
                  <li key={`${category.id}-${item}`}><Link className="directory-item-name" href={`/categories/${category.id}/${categorySlug(item)}`}>{item}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="directory-contact"><div><h2>On vous aide à trouver le bon équipement.</h2></div><a className="button-link" href={createGeneralContactMailto()}>Contactez notre équipe <ArrowRight aria-hidden="true" /></a></div>
      </div>
    </main>
  );
}
