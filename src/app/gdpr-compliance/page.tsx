import type { Metadata } from "next";
import InformationPage from "@/components/InformationPage";

export const metadata: Metadata = { title: "Conformité RGPD | TeamSync", description: "Nos engagements concernant la protection et le traitement de vos données personnelles." };

export default function GdprPage() {
  return <InformationPage policyPage title="Conformité RGPD" intro="TeamSync accorde une attention particulière à la protection de vos données personnelles et s’engage à les traiter de manière transparente, limitée et sécurisée." sections={[
    { heading: "Nos principes", paragraphs: ["Les données sont utilisées uniquement pour répondre à vos demandes, préparer un devis ou assurer le fonctionnement du catalogue. Nous cherchons à ne collecter que les informations utiles à ces finalités."], items: ["Vous informer clairement de l’usage de vos données.", "Limiter l’accès aux personnes qui en ont besoin.", "Ne pas vendre vos données personnelles.", "Conserver les données pendant une durée adaptée à leur usage."] },
    { heading: "Vos droits", paragraphs: ["Selon la réglementation applicable, vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation de leur traitement ou vous opposer à certains usages."], items: ["Pour exercer vos droits, écrivez à hello@xyz.com.", "Nous pouvons vous demander des informations raisonnables pour vérifier votre identité avant de traiter la demande."] },
    { heading: "Responsable du traitement", paragraphs: ["Pour toute question sur le traitement de vos données, contactez-nous à hello@xyz.com. Les coordonnées complètes de l’entité responsable pourront être communiquées sur demande."] },
  ]} />;
}
