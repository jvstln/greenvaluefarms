import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Shared Open Graph / Twitter image generator, branded to the "nigerian
 * market / dispatch board" identity (see app/globals.css light tokens).
 *
 * Route files (`app/opengraph-image.tsx`, `app/about-us/opengraph-image.tsx`,
 * …) call `makeOgImage` with their own copy and re-export `size`,
 * `contentType` and `alt`. Fonts are read once at build time from
 * `assets/fonts`; if they're ever missing the image silently falls back to
 * the ImageResponse default font stack.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Design tokens — light theme, mirror of `:root` in app/globals.css. */
const PAPER = "#f6f1e7";
const INK = "#1b231b";
const GREEN = "#1f4630";
const YELLOW = "#f4a93c";
const RUST = "#c2542f";
const MUTED = "#60675b";
const TICKET_INK = "#2a1c04";
const PAPER_GLOW = "rgba(246, 241, 231, 0.65)";

interface OgFont {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 700 | 900;
  style: "normal";
}

let fontCache: OgFont[] | null = null;

async function loadFonts(): Promise<OgFont[]> {
  if (fontCache) return fontCache;
  const base = join(process.cwd(), "assets", "fonts");
  fontCache = [
    {
      name: "Archivo",
      data: await readFile(join(base, "Archivo-Black.ttf")),
      weight: 900,
      style: "normal",
    },
    {
      name: "Archivo",
      data: await readFile(join(base, "Archivo-Bold.ttf")),
      weight: 700,
      style: "normal",
    },
    {
      name: "PlexMono",
      data: await readFile(join(base, "IBM-Plex-Mono-Medium.ttf")),
      weight: 500,
      style: "normal",
    },
  ];
  return fontCache;
}

/* Barcode bars — widths in px, rendered as a row of paper bars. */
const BAR_BLOCKS = [4, 9, 3, 6, 12, 3, 8, 4, 6, 10, 3, 7, 5, 11, 3, 6, 4].map(
  (width, index) => ({ width, id: `bar-${index}` }),
);

export interface OgImageOptions {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Printed price ticket content, e.g. Whole Chicken / ₦11,500 / per bird. */
  ticket?: { caption: string; price: string; unit: string };
  footer: string;
}

export async function makeOgImage(
  options: OgImageOptions,
): Promise<ImageResponse> {
  const { eyebrow, title, subtitle, ticket, footer } = options;

  let fonts: OgFont[] = [];
  try {
    fonts = await loadFonts();
  } catch {
    fonts = [];
  }

  /* Long headlines (about page) drop a size so they still fit. */
  const headlineSize = title.length > 40 ? 58 : 82;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: PAPER,
        color: INK,
        fontFamily: "Archivo",
      }}
    >
      {/* -------- copy column -------- */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 56px 60px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* mono eyebrow with accent block mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 22, height: 22, background: YELLOW }} />
            <div
              style={{
                fontFamily: "PlexMono",
                fontSize: 24,
                letterSpacing: "0.2em",
                color: RUST,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              fontSize: headlineSize,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              textTransform: "uppercase",
              whiteSpace: "pre-wrap",
              maxWidth: 720,
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                fontSize: 27,
                lineHeight: 1.45,
                color: MUTED,
                maxWidth: 640,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* print rule — ink / yellow / rust */}
          <div style={{ display: "flex", width: 220, height: 12 }}>
            <div style={{ flex: 1, background: INK }} />
            <div style={{ flex: 1, background: YELLOW }} />
            <div style={{ flex: 1, background: RUST }} />
          </div>
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 20,
              letterSpacing: "0.18em",
              color: MUTED,
              textTransform: "uppercase",
            }}
          >
            {footer}
          </div>
        </div>
      </div>

      {/* -------- deep-green ticket band -------- */}
      <div
        style={{
          width: 320,
          background: GREEN,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "56px 40px 60px",
        }}
      >
        {ticket && (
          <div
            style={{
              background: YELLOW,
              padding: "26px 26px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "PlexMono",
                fontSize: 18,
                letterSpacing: "0.16em",
                color: TICKET_INK,
                textTransform: "uppercase",
              }}
            >
              {ticket.caption}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <div style={{ fontSize: 58, fontWeight: 900, color: INK }}>
                {ticket.price}
              </div>
              <div
                style={{
                  fontFamily: "PlexMono",
                  fontSize: 16,
                  color: TICKET_INK,
                  textTransform: "uppercase",
                }}
              >
                {ticket.unit}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              height: 42,
            }}
          >
            {BAR_BLOCKS.map((bar) => (
              <div
                key={bar.id}
                style={{
                  width: bar.width,
                  height: "100%",
                  background: PAPER_GLOW,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 17,
              letterSpacing: "0.18em",
              color: PAPER_GLOW,
              textTransform: "uppercase",
            }}
          >
            Raised right · Delivered fresh
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
