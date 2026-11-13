import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, categorySlug } from "@/data/categories";
import { createGeneralContactMailto } from "@/lib/email";

export default function CategorySidebar({ activeParentId = categories[0].id, activeItem }: { activeParentId?: string; activeItem?: string }) {
  return (
    <aside className="category-sidebar">
      <div className="sidebar-heading"><div><strong>Nos produits</strong><small>Parcourir les catégories</small></div></div>
      <nav aria-label="Catégories de produits">
        {categories.map((category) => (
          <div className="category-group" id={category.id} key={category.id}>
            <Link className={`parent-category ${category.id === activeParentId ? "is-active" : ""}`} href={`/categories/${category.id}`}>
              <span>{category.name}</span><span className="category-count">{String(category.items.length).padStart(2, "0")}</span>
            </Link>
            <ul>
              {category.items.map((item) => {
                const isCurrentItem = category.id === activeParentId && item === activeItem;
                return <li key={item}><Link className={isCurrentItem ? "is-current" : ""} aria-current={isCurrentItem ? "page" : undefined} href={`/categories/${category.id}/${categorySlug(item)}`}>{item}</Link></li>;
              })}
            </ul>
          </div>
        ))}
      </nav>
      <a className="sidebar-help" href={createGeneralContactMailto("Question sur un produit")}><span>Une question sur un produit ?</span><strong>Parlons de votre projet <ArrowRight aria-hidden="true" /></strong></a>
    </aside>
  );
}
