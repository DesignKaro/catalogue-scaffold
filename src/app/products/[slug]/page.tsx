import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import CategorySidebar from "@/components/CategorySidebar";
import ProductGallery from "@/components/ProductGallery";
import { categorySlug } from "@/data/categories";
import { createProductContactMailto } from "@/lib/email";
import ProgressiveImage from "@/components/ProgressiveImage";

const product = {
  slug: "blue-pulley-rope-ppt",
  name: "Corde de levage bleue PPT",
  model: "PPT",
  description: "Corde de levage en polypropylène texturé de 20/22 mm de diamètre, équipée d’une boucle manchonnée et d’un crochet à émerillon avec linguet de sécurité.",
  detail: "Cette corde de levage est légère. Son diamètre et sa texture cotonneuse assurent une bonne prise en main.",
  specs: [
    ["Matière", "PPT"],
    ["CMU", "40 kg"],
    ["Diamètre", "22/24 mm"],
    ["Longueur", "40 m, autres longueurs sur demande"],
  ],
  related: [
    { name: "Corde de levage avec crochet", image: "/images/product-rope-main.webp", position: "center" },
    { name: "Corde de manutention bleue", image: "/images/product-rope-detail.webp", position: "center" },
    { name: "Poulie de chantier", image: "/images/product-pulley.webp", position: "center" },
  ],
};

export function generateStaticParams() {
  return [{ slug: product.slug }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return slug === product.slug ? { title: `${product.name} | Catalogue`, description: product.description } : { title: "Produit introuvable | Catalogue" };
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ProductDetailFallback />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

async function ProductDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== product.slug) notFound();

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <nav className="breadcrumb product-breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link><span aria-hidden="true">›</span><Link href="/categories">Catégories</Link><span aria-hidden="true">›</span><Link href="/categories/echafaudage">Échafaudage</Link><span aria-hidden="true">›</span><span>{product.name}</span>
        </nav>

        <div className="product-page-layout">
          <CategorySidebar activeParentId="echafaudage" activeItem="Manutention" />

          <div className="product-page-content">
            <section className="product-detail" aria-labelledby="product-title">
              <div className="product-copy">
                <h1 id="product-title">{product.name}</h1>
                <p>Corde de levage en polypropylène texturé, diamètre 20/22 mm, avec boucle manchonnée et crochet à émerillon avec linguet de sécurité.</p>
                <p>Légère et agréable à prendre en main, sa texture offre une bonne adhérence pour les opérations courantes de manutention sur chantier.</p>

                <dl className="product-specs">
                  {product.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                </dl>

                <p className="product-taxonomy">Catégories : <Link href="/categories/echafaudage">Échafaudage</Link>, <Link href={`/categories/echafaudage/${categorySlug("Manutention")}`}>Manutention</Link></p>
                <div className="product-quote-row">
                  <label htmlFor="quote-quantity">Quantité</label>
                  <input id="quote-quantity" type="number" min="1" defaultValue="1" />
                  <a className="product-quote-button" href={createProductContactMailto(product.name, product.model, "Demande de devis")}>Demander un devis <ArrowRight aria-hidden="true" /></a>
                </div>
              </div>

              <ProductGallery />
            </section>

            <section className="related-products" aria-labelledby="related-products-title">
              <h2 id="related-products-title">À découvrir également</h2>
              <div className="related-product-grid">
                {product.related.map(({ name, image }) => (
                  <article className="category-card" key={name}>
                    <ProgressiveImage className="card-image" src={image} alt={name} role="img" ariaLabel={name} fit="contain">
                      <span className="card-arrow" aria-hidden="true"><ArrowRight /></span>
                    </ProgressiveImage>
                    <div className="card-copy"><span>Matériel de manutention</span><h3>{name}</h3></div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductDetailFallback() {
  return (
    <main className="product-page" aria-busy="true" aria-label="Chargement du produit">
      <div className="product-page-inner">
        <div className="product-detail-skeleton-crumb" />
        <div className="product-detail-skeleton-layout">
          <div className="product-detail-skeleton-sidebar" />
          <div className="product-detail-skeleton-main">
            <div className="product-detail-skeleton-image" />
            <div className="product-detail-skeleton-copy"><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </main>
  );
}
