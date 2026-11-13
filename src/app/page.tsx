import HeroCarousel from "@/components/HeroCarousel";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CategorySidebar from "@/components/CategorySidebar";
import { categories, categorySlug } from "@/data/categories";
import Link from "next/link";
import { BadgeCheck, BadgeDollarSign, HardHat, Network, Truck } from "lucide-react";
import { createGeneralContactMailto } from "@/lib/email";
import ProgressiveImage from "@/components/ProgressiveImage";

const cards = [
  { name: "Manutention", image: "photo-1581092160562-40aa08e78837", tag: "Levage & transport" },
  { name: "Protection individuelle", image: "photo-1504307651254-35680f356dfd", tag: "Équipements de sécurité" },
  { name: "Stockage", image: "photo-1586528116311-ad8dd3c8310d", tag: "Organisation de chantier" },
  { name: "Colliers technique", image: "photo-1504917595217-d4dc5ebe6122", tag: "Assemblage & fixation" },
  { name: "Colliers orthogonaux", image: "photo-1504148455328-c376907d081c", tag: "Échafaudage" },
  { name: "Colliers orientables", image: "photo-1530124566582-a618bc2615dc", tag: "Échafaudage" },
  { name: "Colliers à clavette", image: "photo-1581783898377-1c85bf937427", tag: "Fixations" },
  { name: "Colliers Axclamps", image: "photo-1581092580497-e0d23cbdf1dc", tag: "Fixations" },
  { name: "Demi-colliers", image: "photo-1580901368919-7738efb0f87e", tag: "Accessoires" },
  { name: "Fabrication et maintenance", image: "photo-1503387762-592deb58ef4e", tag: "Atelier & chantier" },
  { name: "Amarrage", image: "photo-1518709268805-4e9042af9f23", tag: "Ancrage" },
  { name: "Tubes", image: "photo-1531834685032-c34bf0d84c77", tag: "Structure" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const benefits = [
  { label: "Experts du métier", icon: HardHat },
  { label: "Livraison rapide", icon: Truck },
  { label: "Des décennies d’expérience", icon: Network },
  { label: "Des produits de qualité", icon: BadgeCheck },
  { label: "Solutions de financement", icon: BadgeDollarSign },
];

function categoryHref(name: string) {
  const parent = categories.find((category) => category.items.some((item) => item === name));
  return parent ? `/categories/${parent.id}/${categorySlug(name)}` : "/categories";
}

export default function Home() {
  return (
    <main className="catalogue-page">
      <section className="intro" id="accueil">
        <div className="intro-copy">
          <h1>Tout pour vos<br /><em>chantiers.</em></h1>
          <p>Retrouvez notre sélection d’équipements et d’accessoires pour l’échafaudage, l’étaiement et le coffrage.</p>
          <a className="primary-link" href="#categories">Explorer le catalogue <ArrowIcon /></a>
        </div>
        <HeroCarousel />
      </section>

      <section className="benefits-strip benefits-strip--hero" aria-label="Nos services">
        {benefits.map((benefit) => (
          <div className="benefit-item" key={benefit.label}>
            <benefit.icon aria-hidden="true" strokeWidth={2} />
            <span>{benefit.label}</span>
          </div>
        ))}
      </section>

      <section className="catalogue-section" id="categories">
        <CategorySidebar />

        <div className="catalogue-content" id="selection">
          <div className="section-heading">
            <div><h2>Nos catégories</h2><p>Le bon équipement, au bon endroit.</p></div>
            <Link className="text-link button-link" href="/categories">Voir toutes les catégories <ArrowIcon /></Link>
          </div>
          <div className="category-grid">
            {cards.map((card) => (
              <Link href={categoryHref(card.name)} className="category-card" key={card.name}>
                <ProgressiveImage className="card-image" src={`/images/${card.image}.webp`} alt={card.name}>
                  <span className="card-arrow"><ArrowIcon /></span>
                </ProgressiveImage>
                <div className="card-copy"><span>{card.tag}</span><h3>{card.name}</h3></div>
              </Link>
            ))}
          </div>
          <div className="catalogue-bottom"><span>Vous ne trouvez pas ce que vous cherchez ?</span><a className="button-link" href={createGeneralContactMailto()}>Contactez notre équipe <ArrowIcon /></a></div>
        </div>
      </section>

      <section className="supplier-feature" aria-labelledby="supplier-feature-title">
        <div className="supplier-feature-inner">
          <div className="supplier-feature-copy">
            <h2 id="supplier-feature-title">Échafaudages<br /><em>neufs et d’occasion.</em></h2>
            <p>Nous fournissons tous types d’échafaudages et d’équipements d’accès : systèmes Kwikstage et Cuplok, étais Acrow, colliers de tube, équipements de sécurité et planches d’échafaudage certifiées.</p>
            <p>Depuis 1999, notre équipe met plus de 40 ans d’expérience à votre service pour vous aider à trouver le matériel adapté. Si vous ne trouvez pas ce qu’il vous faut, contactez-nous : nous serons ravis de vous aider.</p>
            <a className="primary-link supplier-feature-cta" href={createGeneralContactMailto("Demande de devis")}>Demander un devis <ArrowIcon /></a>
          </div>
          <ProgressiveImage className="supplier-feature-image" src="/images/photo-1504307651254-35680f356dfd.webp" alt="Échafaudage autour d’une maison en construction" role="img" ariaLabel="Échafaudage autour d’une maison en construction" position="center 44%" />
        </div>
      </section>

      <ReviewsCarousel />

      <section className="benefits-strip" aria-label="Nos services">
        {benefits.map((benefit) => (
          <div className="benefit-item" key={benefit.label}>
            <benefit.icon aria-hidden="true" strokeWidth={2} />
            <span>{benefit.label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
