import QRCode from "qrcode";
import { WhatsAppIcon } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { buildCatalogUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

/* QR codes need literal colours (the qrcode package can't read CSS vars).
   These mirror the ink / paper tokens in app/globals.css. */
const QR_INK = "#1b231b";
const QR_PAPER = "#ffffff";

/**
 * Resolve the primary "browse on WhatsApp" target. If the business catalog is
 * enabled we point at `wa.me/c/<number>`; otherwise every CTA degrades to a
 * plain chat link that asks for the menu (works for any WhatsApp number).
 */
function catalogHref(): string {
  const { contact, catalog } = siteConfig.business;
  return catalog.enabled
    ? buildCatalogUrl(contact.whatsappNumber)
    : buildWhatsAppUrl(contact.whatsappNumber, catalog.fallbackMessage);
}

/** Plain chat link — the always-working escape hatch under every catalog CTA. */
function chatHref(): string {
  const { contact, catalog } = siteConfig.business;
  return buildWhatsAppUrl(contact.whatsappNumber, catalog.fallbackMessage);
}

async function CatalogQr({ className }: { className?: string }) {
  const svg = await QRCode.toString(catalogHref(), {
    type: "svg",
    margin: 0,
    width: 132,
    errorCorrectionLevel: "M",
    color: { dark: QR_INK, light: QR_PAPER },
  });

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <span className="rounded-lg bg-white p-2.5 shadow-[4px_4px_0_0_rgba(31,70,48,0.1)] [&_svg]:block [&_svg]:size-28">
        <span
          // biome-ignore lint/security/noDangerouslySetInnerHtml: QR SVG is generated locally from a fixed wa.me link, never user input
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </span>
      <span className="font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.2em]">
        {siteConfig.catalogSection.scanHint}
      </span>
    </div>
  );
}

/**
 * Full "browse on WhatsApp" strip — button + always-visible chat fallback +
 * a scannable QR. Rendered under the product grid on the home page.
 */
export function CatalogCta({ className }: { className?: string }) {
  const { catalogSection } = siteConfig;

  return (
    <div
      className={cn(
        "mt-12 flex flex-col gap-8 rounded-xl border border-border border-dashed bg-background p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="max-w-md">
        <p className="font-mono text-[0.7rem] text-rust uppercase tracking-[0.2em]">
          {catalogSection.eyebrow}
        </p>
        <h3 className="mt-2 font-display font-semibold text-xl tracking-tight sm:text-2xl">
          {catalogSection.heading}
        </h3>
        <p className="mt-2 text-muted-foreground text-sm">
          {catalogSection.copy}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={catalogHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${catalogSection.buttonLabel} — opens WhatsApp in a new tab`}
            className={buttonVariants({ variant: "accent", size: "lg" })}
          >
            <WhatsAppIcon data-slot="icon" className="size-4" />
            {catalogSection.buttonLabel}
          </a>
          <a
            href={chatHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.2em] underline decoration-dashed underline-offset-4 transition-colors hover:text-primary"
          >
            {catalogSection.fallbackLabel}
          </a>
        </div>
      </div>
      <CatalogQr className="shrink-0 self-center lg:self-auto" />
    </div>
  );
}

/** Bare catalog link for dense spots (e.g. the footer) — same fallback logic. */
export function CatalogLink({ className }: { className?: string }) {
  const { catalogSection } = siteConfig;
  return (
    <a
      href={catalogHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {catalogSection.buttonLabel}
    </a>
  );
}
