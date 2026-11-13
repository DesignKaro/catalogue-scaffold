"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressiveImage from "@/components/ProgressiveImage";

const slides = [
  { image: "photo-1504307651254-35680f356dfd", alt: "Équipe de chantier équipée pour travailler en sécurité" },
  { image: "photo-1503387762-592deb58ef4e", alt: "Structure de chantier en cours de construction" },
  { image: "photo-1531834685032-c34bf0d84c77", alt: "Matériaux et équipements de construction" },
  { image: "photo-1504917595217-d4dc5ebe6122", alt: "Équipement professionnel pour le chantier" },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const showSlide = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  return (
    <div className="intro-visual" aria-roledescription="carousel" aria-label="Nos univers chantier">
      <div className="carousel-track" aria-live="off">
        {slides.map((slide, index) => (
          <ProgressiveImage
            className={`carousel-slide${index === activeSlide ? " is-active" : ""}`}
            key={slide.image}
            src={`/images/${slide.image}.webp`}
            alt={slide.alt}
            role="img"
            ariaLabel={slide.alt}
            ariaHidden={index !== activeSlide}
            position="center 44%"
            enabled={index === activeSlide}
            priority={index === 0}
          />
        ))}
      </div>
      <div className="carousel-shade" />
      <div className="carousel-controls">
        <div className="carousel-pagination" aria-label="Choisir une diapositive">
          {slides.map((slide, index) => (
            <button
              aria-label={`Afficher la diapositive ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              className={`carousel-dot${index === activeSlide ? " is-active" : ""}`}
              key={slide.image}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button aria-label="Diapositive précédente" onClick={() => showSlide(activeSlide - 1)}><ArrowLeft aria-hidden="true" /></button>
          <button aria-label="Diapositive suivante" onClick={() => showSlide(activeSlide + 1)}><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
