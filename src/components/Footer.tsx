import Link from "next/link";
import { createGeneralContactMailto } from "@/lib/email";

const legalLinks = [
  { label: "Nous contacter", href: "/contact" },
  { label: "Conformité RGPD", href: "/gdpr-compliance" },
  { label: "Politique de confidentialité", href: "/privacy-policy" },
  { label: "Conditions de service", href: "/terms-of-service" },
];

const headerNavLinks = [
  { label: "Échafaudage", href: "/categories/echafaudage" },
  { label: "Bâches et filets", href: "/categories/baches-et-filets" },
  { label: "Étaiement", href: "/categories/etaiement" },
  { label: "Coffrage", href: "/categories/coffrage" },
  { label: "À propos", href: "/about" },
];
const socials = [
  { name: "Facebook", icon: <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.8H7V13h2.7v8h3.7Z" /> },
  { name: "Instagram", icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.6" cy="6.7" r="1.2"/></> },
  { name: "YouTube", icon: <path d="M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9A3 3 0 0 0 3.1 19c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12a31 31 0 0 0-.5-4.9ZM9.8 15.5v-7l6.1 3.5-6.1 3.5Z" transform="translate(0.1) scale(.95)"/> },
  { name: "TikTok", icon: <path d="M15.5 3h3a5.5 5.5 0 0 0 3.5 4v3.2a8.6 8.6 0 0 1-6.5-2.3v7.5a6 6 0 1 1-6-6c.5 0 1 .1 1.5.2v3.4a2.8 2.8 0 1 0 1.5 2.4V3h3Z" transform="translate(-1 -1) scale(.9)"/> },
  { name: "LinkedIn", icon: <path d="M5 8.5A2 2 0 1 0 5 4.5a2 2 0 0 0 0 4Zm-1.7 2H6.7V20H3.3v-9.5ZM9 10.5h3.2v1.3h.1a3.5 3.5 0 0 1 3.1-1.7c3.3 0 3.9 2.1 3.9 4.8V20h-3.4v-4.5c0-1.1 0-2.5-1.6-2.5s-1.9 1.2-1.9 2.4V20H9v-9.5Z"/> },
];

function FooterLinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="footer-column">
      <h2>{title}</h2>
      <ul>
        {links.map((item) => (
          <li key={item.label}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" id="a-propos">
      <div className="footer-main">
        <FooterLinkList title="Informations" links={legalLinks} />
        <div className="footer-column"><h2>Suivez-nous</h2><ul className="social-list">{socials.map((social) => <li key={social.name}><a href="#engagements" aria-label={social.name}><svg viewBox="0 0 24 24" aria-hidden="true">{social.icon}</svg><span>{social.name}</span></a></li>)}</ul></div>
        <FooterLinkList title="Liens utiles" links={headerNavLinks} />
        <div className="footer-column footer-contact"><h2>Nous trouver</h2><address>Écrivez-nous pour toute demande<br />d’information ou de devis.</address><a href={createGeneralContactMailto()}>hello@xyz.com</a></div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 TeamSync. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
