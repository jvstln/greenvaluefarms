"use client";

/**
 * Global fullscreen image viewer ("lightbox"), backed by a zustand store.
 *
 * Any client component can open an image with `useLightbox().open(...)`; the
 * `LightboxProvider` mounted once in the root layout renders the overlay and
 * ports it to `document.body`, so a transformed / overflow-hidden ancestor can
 * never clip it. SSR always renders nothing — the store starts empty and only
 * ever changes from a user click.
 */
import type { ReactNode } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { LightboxViewport } from "@/components/shared/lightbox";

export interface LightboxImage {
  src: string;
  alt: string;
  /** Optional caption shown under the image. */
  caption?: string;
}

interface LightboxStoreState {
  /** Image being viewed, or `null` when the lightbox is closed. */
  image: LightboxImage | null;
  /** Open the lightbox with an image. */
  open: (image: LightboxImage) => void;
  /** Close the lightbox. */
  close: () => void;
}

const useLightboxStore = create<LightboxStoreState>()((set) => ({
  image: null,
  open: (image) => set({ image }),
  close: () => set({ image: null }),
}));

/**
 * Renders the lightbox overlay. Mount once in the root layout — components
 * trigger it via the global store, not props.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LightboxViewport />
    </>
  );
}

/** Open / close actions. Stable across renders (doesn't re-render on image). */
export function useLightbox(): Pick<LightboxStoreState, "open" | "close"> {
  return useLightboxStore(
    useShallow((state) => ({ open: state.open, close: state.close })),
  );
}

/** The image currently being viewed, or `null`. */
export function useLightboxImage(): LightboxImage | null {
  return useLightboxStore((state) => state.image);
}
