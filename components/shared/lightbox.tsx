"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLightbox, useLightboxImage } from "@/lib/lightbox-store";

/**
 * The global fullscreen image viewer. Rendered once inside `LightboxProvider`
 * and portaled to `document.body`; it shows whatever image the store holds.
 * Closes on the ✕ button, on the backdrop, or with ESC (which also unlocks
 * body scroll for the duration of the view).
 */
export function LightboxViewport() {
  const image = useLightboxImage();
  const { close } = useLightbox();

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [image, close]);

  if (!image) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
    >
      {/* backdrop — click anywhere outside the photo to close */}
      <button
        type="button"
        onClick={close}
        aria-label="Close photo"
        className="absolute inset-0 cursor-zoom-out bg-foreground/90"
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative h-[75vh] w-[75vh] max-w-[90vw] overflow-hidden rounded-xl bg-foreground/40 shadow-2xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="90vw"
            className="object-contain"
          />
        </div>
        {image.caption && (
          <p className="font-mono text-[0.7rem] text-background/80 uppercase tracking-[0.2em]">
            {image.caption}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Close photo"
        className="absolute top-4 right-4 z-20 flex size-11 items-center justify-center rounded-lg border border-background/30 text-background transition-colors hover:bg-background/10"
      >
        <X className="size-5" aria-hidden />
      </button>
    </div>,
    document.body,
  );
}
