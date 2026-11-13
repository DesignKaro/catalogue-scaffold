export const categories = [
  { id: "echafaudage", name: "Échafaudage", description: "Découvrez nos équipements pour monter, sécuriser et entretenir vos structures d’échafaudage. Retrouvez les éléments de liaison, d’ancrage et de fixation ainsi que les accessoires de chantier sélectionnés pour accompagner les professionnels au quotidien. Parcourez les familles de produits et contactez notre équipe pour un conseil adapté à votre installation.", image: "photo-1504307651254-35680f356dfd", items: ["Amarrage", "Broches et goupilles", "Clavettes", "Colliers à clavette", "Colliers Axclamps", "Colliers orientables", "Colliers orthogonaux", "Colliers technique", "Demi-colliers", "Fabrication et maintenance", "Fixation et visserie", "Manutention", "Outillage", "Protection individuelle", "Roues", "Sécurisation", "Socles à vérin", "Stockage", "Tôles", "Tubes"] },
  { id: "baches-et-filets", name: "Bâches et filets", description: "Protégez les zones de travail et les façades avec nos bâches et filets pour chantier. Parcourez les solutions de couverture et de protection adaptées aux besoins des équipes et des professionnels du bâtiment. Retrouvez les principales familles de produits et demandez conseil à notre équipe selon votre chantier.", image: "photo-1504917595217-d4dc5ebe6122", items: ["Bâches", "Filets d’échafaudage"] },
  { id: "etaiement", name: "Étaiement", description: "Retrouvez les composants nécessaires à la mise en place de vos systèmes d’étaiement. Notre sélection regroupe les bases et fourches qui aident les équipes à configurer leur matériel selon les besoins du chantier. Explorez les sous-catégories disponibles et contactez-nous pour trouver une solution adaptée à votre projet.", image: "photo-1503387762-592deb58ef4e", items: ["Socle à vérin", "Fourche à double entrée", "Fourche à vérin"] },
  { id: "coffrage", name: "Coffrage", description: "Parcourez les accessoires et le matériel dédiés aux opérations de coffrage. La gamme rassemble tiges, écrous et outils de coffreur dans plusieurs dimensions pour faciliter la préparation de vos travaux. Consultez les familles disponibles et contactez notre équipe si vous souhaitez être accompagné dans le choix de vos équipements.", image: "photo-1581092160562-40aa08e78837", items: ["Accessoires divers", "Accessoires tiges 15–17 mm", "Accessoires tiges 20–23 mm", "Écrous 15–17 mm", "Écrous 20–23 mm", "Outillage coffreur", "Tiges 15–17 mm", "Tiges 20–23 mm"] },
] as const;

export function categorySlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
