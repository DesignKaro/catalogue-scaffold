"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressiveImage from "@/components/ProgressiveImage";

const reviews = [
  { quote: "L’équipe nous a aidés à trouver le bon équipement pour un chantier complexe et a simplifié toutes les démarches.", name: "Client exemple", detail: "Projet d’échafaudage", image: "photo-1534528741775-53994a69daeb" },
  { quote: "Un bon choix de produits, des conseils clairs et une livraison organisée au bon moment.", name: "Client exemple", detail: "Client professionnel", image: "photo-1500648767791-00dcc994a43e" },
  { quote: "Nous avions quelques questions avant de commander et avons obtenu des réponses utiles de spécialistes du métier.", name: "Client exemple", detail: "Équipement d’accès", image: "photo-1531123897727-8f129e1688ce" },
  { quote: "Une source fiable pour les pièces d’échafaudage et les équipements de sécurité utilisés sur nos chantiers.", name: "Client exemple", detail: "Équipe de chantier", image: "photo-1506794778202-cad84cf45f1d" },
  { quote: "L’équipe nous a aidés à définir notre besoin et nous a tenus informés à chaque étape.", name: "Client exemple", detail: "Projet d’échafaudage", image: "photo-1544005313-94ddf0286df2" },
  { quote: "Un service agréable et un choix de matériel bien adapté à notre dernier projet.", name: "Client exemple", detail: "Client professionnel", image: "photo-1507003211169-0a1dd7228f2d" },
];

export default function ReviewsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (direction === 1 && viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2) return;
    const targetIndex = Math.max(0, Math.min(reviews.length - 1, activeReview + direction));
    const cards = viewport.querySelectorAll<HTMLElement>(".review-card");
    const targetCard = cards[targetIndex];
    if (targetCard) {
      const left = targetCard.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
      viewport.scrollTo({ left, behavior: "smooth" });
    }
  };

  const updateActiveReview = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setAtEnd(viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2);
    const viewportLeft = viewport.getBoundingClientRect().left;
    const cards = viewport.querySelectorAll<HTMLElement>(".review-card");
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const left = card.getBoundingClientRect().left - viewportLeft;
      if (Math.abs(left) < closestDistance) {
        closestIndex = index;
        closestDistance = Math.abs(left);
      }
    });
    setActiveReview(closestIndex);
  };

  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <div className="reviews-inner">
        <div className="reviews-viewport" ref={viewportRef} onScroll={updateActiveReview} aria-label="Avis de clients exemples">
          <div className="reviews-track">
            {reviews.map((review, index) => (
              <article className={`review-card${index === 1 ? " review-card--feature" : ""}`} key={`${review.detail}-${index}`}>
                <p className="review-quote">“{review.quote}”</p>
                <span className="review-mark" aria-hidden="true">”</span>
                <div className="review-author">
                  <ProgressiveImage className="review-avatar" src={`/images/${review.image}.webp`} alt="" fit="cover" position="center 32%" ariaHidden />
                  <span><strong>{review.name}</strong><small>{review.detail}</small></span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="reviews-controls">
          <button type="button" aria-label="Avis précédent" onClick={() => move(-1)} disabled={activeReview === 0}><ArrowLeft aria-hidden="true" /></button>
          <span className="reviews-count" aria-live="polite">{activeReview + 1} <i /> {reviews.length}</span>
          <button type="button" aria-label="Avis suivant" onClick={() => move(1)} disabled={atEnd}><ArrowRight aria-hidden="true" /></button>
        </div>
        <div className="reviews-heading">
          <h2 id="reviews-title">Du bon matériel.<br /><em>Un accompagnement de qualité.</em></h2>
        </div>
      </div>
    </section>
  );
}
