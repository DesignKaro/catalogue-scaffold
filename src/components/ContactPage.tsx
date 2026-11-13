import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, PackageCheck } from "lucide-react";
import { createGeneralContactMailto } from "@/lib/email";

const email = "hello@xyz.com";
const demoAddress = "1 rue des Ateliers, 75020 Paris, France";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link><span aria-hidden="true">›</span><span>Nous contacter</span>
      </nav>

      <header className="contact-hero">
        <div>
          <h1>Parlons de votre<br /><em>prochain chantier.</em></h1>
        </div>
        <p>Besoin d’un conseil sur un équipement ou d’un devis ? Notre équipe est là pour vous aider à trouver la bonne solution.</p>
      </header>

      <section className="contact-cards" aria-label="Moyens de contact">
        <a className="contact-card contact-card-primary" href={createGeneralContactMailto()}>
          <span className="contact-card-icon"><Mail aria-hidden="true" /></span>
          <span className="contact-card-title">Écrivez-nous</span>
          <span className="contact-card-detail">{email}</span>
          <span className="contact-card-action">Envoyer un e-mail <ArrowUpRight aria-hidden="true" /></span>
        </a>
        <a className="contact-card" href={createGeneralContactMailto("Demande de devis")}>
          <span className="contact-card-icon"><PackageCheck aria-hidden="true" /></span>
          <span className="contact-card-title">Demander un devis</span>
          <span className="contact-card-detail">Indiquez les produits, quantités et votre lieu de livraison.</span>
          <span className="contact-card-action">Préparer ma demande <ArrowUpRight aria-hidden="true" /></span>
        </a>
        <div className="contact-card">
          <span className="contact-card-icon"><MessageCircle aria-hidden="true" /></span>
          <span className="contact-card-title">Une question produit ?</span>
          <span className="contact-card-detail">Envoyez-nous la référence ou le lien du produit concerné.</span>
          <a className="contact-card-action" href={createGeneralContactMailto("Question sur un produit")}>Contacter l’équipe <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="contact-location" aria-labelledby="contact-location-title">
        <div className="contact-location-copy">
          <span className="contact-location-icon"><MapPin aria-hidden="true" /></span>
          <h2 id="contact-location-title">Un point de repère.</h2>
          <p className="contact-demo-note">Adresse de démonstration — à remplacer par l’adresse réelle avant publication.</p>
          <address>{demoAddress}</address>
          <a className="contact-map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demoAddress)}`} target="_blank" rel="noreferrer">
            Ouvrir dans Google Maps <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="contact-map">
          <iframe
            title="Carte de l’adresse de démonstration à Paris"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(demoAddress)}&z=14&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
