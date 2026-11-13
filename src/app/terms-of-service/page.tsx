import type { Metadata } from "next";
import InformationPage from "@/components/InformationPage";

export const metadata: Metadata = { title: "Conditions de service | TeamSync", description: "Conditions d’utilisation du catalogue en ligne TeamSync." };

export default function TermsPage() {
  return <InformationPage policyPage title="Conditions de service" intro="Les présentes conditions encadrent l’accès au catalogue TeamSync et son utilisation. En naviguant sur le site, vous acceptez de les respecter." sections={[
    { heading: "Objet du site", paragraphs: ["Le site présente des équipements et accessoires destinés aux professionnels du bâtiment et permet de prendre contact avec l’équipe TeamSync. Les informations du catalogue sont fournies à titre indicatif."] },
    { heading: "Informations produits et demandes de devis", paragraphs: ["Les caractéristiques, visuels et disponibilités peuvent évoluer. Une demande envoyée depuis le site ne constitue pas une commande et aucun contrat de vente n’est conclu avant confirmation écrite des produits, prix, délais et conditions applicables."] },
    { heading: "Utilisation du site", paragraphs: ["Vous vous engagez à utiliser le site conformément aux lois applicables, à ne pas perturber son fonctionnement et à ne pas tenter d’accéder sans autorisation à ses systèmes ou données."] },
    { heading: "Propriété intellectuelle", paragraphs: ["Les contenus du site, notamment les textes, éléments graphiques et marques, sont protégés par les droits applicables. Leur reproduction ou réutilisation nécessite l’autorisation préalable de leurs titulaires, sauf exception prévue par la loi."] },
    { heading: "Disponibilité et responsabilité", paragraphs: ["Nous cherchons à maintenir le site accessible et ses informations à jour, sans garantir une disponibilité continue ni l’absence d’erreurs. Dans les limites autorisées par la loi, TeamSync ne saurait être tenu responsable des dommages indirects liés à l’utilisation du site."] },
    { heading: "Contact et évolution", paragraphs: ["Pour toute question concernant ces conditions, écrivez à hello@xyz.com. Ces conditions peuvent être mises à jour ; la version publiée sur cette page est celle en vigueur lors de votre visite."] },
  ]} />;
}
