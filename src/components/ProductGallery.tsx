"use client";

import { useState } from "react";
import ProgressiveImage from "@/components/ProgressiveImage";

const images = [
  {
    src: "/images/product-rope-main.webp",
    alt: "Corde bleue de chantier en polypropylène avec crochet de sécurité",
  },
  {
    src: "/images/product-rope-detail.webp",
    alt: "Autre vue de la corde bleue avec crochet",
  },
];

export default function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  return (
    <div className="product-gallery">
      <div className="product-main-visual">
        <ProgressiveImage key={activeImage.src} src={activeImage.src} alt={activeImage.alt} fit="contain" priority />
      </div>
      <div className="product-thumbnails" aria-label="Photos du produit">
        {images.map((image, index) => (
          <button
            className={index === activeIndex ? "is-selected" : ""}
            type="button"
            key={image.src}
            onClick={() => setActiveIndex(index)}
            aria-label={`Afficher la photo ${index + 1} sur ${images.length}`}
            aria-pressed={index === activeIndex}
          >
            <ProgressiveImage src={image.src} alt="" fit="contain" ariaHidden />
          </button>
        ))}
      </div>

    </div>
  );
}
