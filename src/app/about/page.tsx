import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, Headset, Layers3, SearchCheck, ShieldCheck, Wrench } from "lucide-react";
import { categories } from "@/data/categories";
import { createGeneralContactMailto } from "@/lib/email";
import ProgressiveImage from "@/components/ProgressiveImage";

export const metadata: Metadata = {
  title: "À propos | TeamSync",
  description: "Découvrez TeamSync, son catalogue d’équipements de chantier et l’accompagnement proposé aux professionnels.",
};

const reasons = [
  { title: "Des gammes ciblées", text: "Retrouvez des équipements pour l’échafaudage, les bâches et filets, l’étaiement et le coffrage.", icon: Layers3 },
  { title: "Un conseil adapté", text: "Décrivez votre besoin à notre équipe pour être orienté vers les produits du catalogue.", icon: Headset },
  { title: "Des demandes claires", text: "Transmettez les références, les quantités et votre contexte pour faciliter la préparation d’un devis.", icon: ClipboardList },
  { title: "Une recherche simple", text: "Parcourez les univers et sous-catégories pour repérer les familles de matériel utiles à votre chantier.", icon: SearchCheck },
  { title: "Des informations accessibles", text: "Consultez les détails disponibles sur les pages produits et demandez des précisions si nécessaire.", icon: ShieldCheck },
  { title: "Un échange direct", text: "Une question sur un équipement ? Contactez-nous par e-mail avec votre demande.", icon: Wrench },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-inner">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link><span aria-hidden="true">›</span><span>À propos</span>
        </nav>

        <section className="about-hero">
          <div className="about-hero-copy">
            <h1>Tout pour vos<br /><em>chantiers.</em></h1>
            <p>Un catalogue d’équipements et d’accessoires pour les professionnels du bâtiment, avec une équipe à votre écoute pour vous aider à avancer.</p>
            <div className="about-actions">
              <Link className="button-link" href="/categories">Explorer nos catégories <ArrowRight aria-hidden="true" /></Link>
              <Link className="about-text-link" href="/contact">Contacter l’équipe <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
          <ProgressiveImage className="about-hero-image" src="/images/photo-1504307651254-35680f356dfd.webp" alt="Chantier de construction en activité" role="img" ariaLabel="Chantier de construction en activité" position="center 46%" priority />
        </section>

        <section className="about-story" aria-labelledby="about-story-title">
          <ProgressiveImage className="about-story-image" src="/images/photo-1581094794329-c8112a89af12.webp" alt="Matériaux et équipements sur un chantier" role="img" ariaLabel="Matériaux et équipements sur un chantier" />
          <div className="about-story-copy">
            <h2 id="about-story-title">Le bon matériel, au bon endroit.</h2>
            <p>TeamSync rassemble dans un même catalogue des équipements pour l’échafaudage, l’étaiement, le coffrage, ainsi que des bâches et des filets pour chantier.</p>
            <p>Nous avons conçu ces pages pour vous aider à parcourir les gammes, repérer les familles de produits et nous transmettre facilement votre besoin.</p>
            <Link className="about-text-link" href="/categories">Voir toutes les catégories <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="about-reasons" aria-labelledby="about-reasons-title">
          <div className="about-section-heading">
            <h2 id="about-reasons-title">Un accompagnement pensé pour le terrain.</h2>
            <p>Un accès simple aux gammes et un contact direct lorsque vous avez besoin d’un renseignement.</p>
          </div>
          <div className="about-reason-grid">
            {reasons.map(({ title, text, icon: Icon }) => (
              <article className="about-reason-card" key={title}>
                <span className="about-reason-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-ranges" aria-labelledby="about-ranges-title">
          <div className="about-section-heading about-section-heading-row">
            <div><h2 id="about-ranges-title">Nos univers de produits.</h2></div>
            <Link className="about-text-link" href="/categories">Toutes les catégories <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="about-range-grid">
            {categories.map((category, index) => (
              <Link className="about-range-card" href={`/categories/${category.id}`} key={category.id}>
                <ProgressiveImage className="about-range-image" src={`/images/${category.image}.webp`} alt={category.name}>
                  <span className="about-range-index">0{index + 1}</span>
                  <span className="about-range-arrow"><ArrowRight aria-hidden="true" /></span>
                </ProgressiveImage>
                <span className="about-range-copy"><strong>{category.name}</strong><small>{category.items.length} familles de produits</small></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-support" aria-labelledby="about-support-title">
          <ProgressiveImage className="about-support-image" src="/images/photo-1503387762-592deb58ef4e.webp" alt="Équipement de chantier prêt à être utilisé" role="img" ariaLabel="Équipement de chantier prêt à être utilisé" position="center 48%" />
          <div className="about-support-copy">
            <h2 id="about-support-title">Parlons de votre projet.</h2>
            <p>Transmettez-nous les références qui vous intéressent, les quantités et les informations utiles sur votre chantier. Nous pourrons vous répondre et vous aider à préciser votre demande.</p>
            <Link className="button-link" href="/contact">Contacter notre équipe <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="about-bottom-cta">
          <div><h2>Vous ne trouvez pas ce qu’il vous faut ?</h2><p>Écrivez-nous et indiquez-nous ce que vous recherchez.</p></div>
          <a className="button-link" href={createGeneralContactMailto()}>hello@xyz.com <ArrowRight aria-hidden="true" /></a>
        </section>
      </div>
    </main>
  );
}
