"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type ProgressiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
  position?: string;
  priority?: boolean;
  enabled?: boolean;
  role?: "img";
  ariaLabel?: string;
  ariaHidden?: boolean;
  children?: ReactNode;
};

export default function ProgressiveImage({
  src,
  alt,
  className = "",
  fit = "cover",
  position = "center",
  priority = false,
  enabled = true,
  role,
  ariaLabel,
  ariaHidden,
  children,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const fullImageRef = useRef<HTMLImageElement>(null);
  const placeholder = src.replace(/\.webp$/, ".blur.webp");
  const imageStyle = {
    "--progressive-fit": fit,
    "--progressive-position": position,
  } as CSSProperties;

  useEffect(() => {
    const image = fullImageRef.current;
    if (enabled && image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, [enabled, src]);

  return (
    <span
      className={`progressive-image${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`}
      style={imageStyle}
      role={role}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <img className="progressive-image-placeholder" src={placeholder} alt="" aria-hidden="true" decoding="async" />
      {enabled && (
        <img
          className="progressive-image-full"
          ref={fullImageRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      )}
      {enabled && !loaded && <span className="progressive-image-sheen" aria-hidden="true" />}
      {children}
    </span>
  );
}
