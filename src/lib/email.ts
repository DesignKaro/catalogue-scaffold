const contactEmail = "hello@xyz.com";

type EmailDraft = {
  subject: string;
  body: string;
};

export function createContactMailto({ subject, body }: EmailDraft) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${contactEmail}?${params.toString()}`;
}

export function createGeneralContactMailto(subject = "Demande d’information") {
  return createContactMailto({
    subject,
    body: "Bonjour,\n\nJ’aimerais obtenir des informations. Merci de me recontacter.\n",
  });
}

export function createProductContactMailto(productName: string, model: string, subject = "Demande d’information sur un produit") {
  return createContactMailto({
    subject: `${subject} : ${productName} — modèle ${model}`,
    body: `Bonjour,\n\nJ’aimerais connaître les détails de ce produit : ${productName} (modèle ${model}).\n\nMerci.\n`,
  });
}
