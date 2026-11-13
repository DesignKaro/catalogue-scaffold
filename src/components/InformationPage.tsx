import Link from "next/link";

type Section = { heading: string; paragraphs: string[]; items?: string[] };

export default function InformationPage({
  title,
  intro,
  sections,
  policyPage = false,
}: {
  title: string;
  intro: string;
  sections: Section[];
  policyPage?: boolean;
}) {
  return (
    <article className={`information-page${policyPage ? " is-policy-page" : ""}`}>
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link><span aria-hidden="true">›</span><span>{title}</span>
      </nav>
      <header className="information-heading">
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="information-content">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
      </div>
    </article>
  );
}
