import { siteConfig } from "@/lib/config/site";
import { SiteLogo } from "@/components/shared/site-logo";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { AtSign, Camera, Globe, Mail, MapPin, Phone } from "lucide-react";

/**
 * Footer — contact details, socials, a final WhatsApp CTA and the
 * family-run sign-off. Everything reads from the config file.
 */
export function Footer() {
  const { footer, business, nav } = siteConfig;
  const { contact, socials } = business;

  const socialLinks = [
    { href: socials.instagram, label: "Instagram", icon: Camera },
    { href: socials.facebook, label: "Facebook", icon: Globe },
  ];

  return (
    <footer id="contact" className="relative scroll-mt-20 overflow-hidden bg-primary text-primary-foreground">
      {/* soft glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-[-6rem] size-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="wrap relative pb-28 pt-16 sm:pt-20">
        {/* CTA band */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-7 sm:p-9 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {footer.ctaHeading}
            </h2>
            <p className="mt-2 max-w-md text-sm text-primary-foreground/70">
              {footer.ctaText}
            </p>
          </div>
          <WhatsAppButton
            label={footer.ctaButton}
            size="lg"
            className="h-12 shrink-0 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
          />
        </div>

        {/* columns */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <SiteLogo showTagline={false} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              {business.familyLine}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${business.name} on ${label}`}
                  className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/80 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              {footer.quickLinksHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              {footer.contactHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {contact.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-accent" aria-hidden />
                <a href={`tel:${contact.whatsappNumber}`} className="transition-colors hover:text-accent">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {business.name}. {footer.copyrightSuffix}
          </p>
          <p className="flex items-center gap-1.5">
            <AtSign className="size-3.5" aria-hidden />
            {business.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}