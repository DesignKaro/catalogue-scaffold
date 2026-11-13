import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = { title: "Nous contacter | TeamSync", description: "Contactez l’équipe TeamSync pour vos demandes d’information et de devis." };

export default function Page() {
  return <ContactPage />;
}
