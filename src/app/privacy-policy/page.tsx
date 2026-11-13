import type { Metadata } from "next";
import InformationPage from "@/components/InformationPage";

export const metadata: Metadata = { title: "Politique de confidentialité | TeamSync", description: "Découvrez comment le site TeamSync utilise et protège les données personnelles." };

export default function PrivacyPolicyPage() {
  return <InformationPage policyPage title="Politique de confidentialité" intro="Cette politique explique quelles données peuvent être recueillies lors de votre utilisation du catalogue TeamSync et comment elles sont utilisées." sections={[
    { heading: "Données susceptibles d’être recueillies", paragraphs: ["Lorsque vous nous contactez, nous pouvons recevoir les informations que vous choisissez de transmettre, comme votre nom, votre adresse e-mail, votre entreprise, votre demande et les produits qui vous intéressent."], items: ["Les coordonnées transmises dans un e-mail ou une demande de devis.", "Les informations techniques nécessaires au fonctionnement et à la sécurité du site."] },
    { heading: "Utilisation et partage", paragraphs: ["Nous utilisons ces informations pour répondre à vos questions, établir des propositions commerciales et améliorer la sécurité du site. Elles ne sont pas vendues. Elles peuvent être accessibles à des prestataires techniques qui contribuent au fonctionnement du site, dans la mesure nécessaire à leur mission."] },
    { heading: "Conservation et sécurité", paragraphs: ["Les informations sont conservées uniquement le temps nécessaire à la gestion de votre demande et aux obligations applicables. Nous appliquons des mesures raisonnables pour éviter tout accès, usage ou divulgation non autorisés."] },
    { heading: "Vos choix et vos droits", paragraphs: ["Vous pouvez demander l’accès, la correction ou la suppression de vos données, sous réserve des obligations légales applicables. Adressez votre demande à hello@xyz.com. Si le site utilise des cookies non essentiels, vos préférences peuvent être gérées depuis le bandeau de consentement affiché sur le site."] },
    { heading: "Mise à jour de cette politique", paragraphs: ["Cette page peut être mise à jour lorsque les pratiques du site évoluent. Pour toute question, contactez hello@xyz.com."] },
  ]} />;
}
