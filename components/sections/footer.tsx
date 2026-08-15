import { AtSign, Camera, Globe, Mail, MapPin, Phone } from "lucide-react";
import { SectionLink } from "@/components/shared/section-link";
import { SiteLogo } from "@/components/shared/site-logo";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { siteConfig } from "@/lib/config/site";

/**
 * Footer — contact details, socials, a final WhatsApp CTA and a clean
 * sign-off. Everything reads from the config file.
 */
export function Footer() {
  const { footer, business, nav } = siteConfig;
  const { contact, socials } = business;

  const socialLinks = [
    { href: socials.instagram, label: "Instagram", icon: Camera },
    { href: socials.facebook, label: "Facebook", icon: Globe },
  ];

  return (
    <footer
      id="contact"
      className="relative scroll-mt-20 bg-primary text-primary-foreground"
    >
      <div className="wrap relative pt-16 pb-28 sm:pt-20">
        {/* CTA band */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-primary-foreground/20 bg-primary-foreground/[0.04] p-7 sm:p-9 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display font-semibold text-2xl tracking-tight sm:text-3xl">
              {footer.ctaHeading}
            </h2>
            <p className="mt-2 max-w-md text-primary-foreground/70 text-sm">
              {footer.ctaText}
            </p>
          </div>
          <WhatsAppButton
            label={footer.ctaButton}
            size="lg"
            className="h-12 shrink-0 rounded-lg px-7"
          />
        </div>

        {/* columns */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <SiteLogo showTagline={false} tone="inverted" />
            <p className="mt-4 max-w-xs text-primary-foreground/70 text-sm leading-relaxed">
              {business.aboutLine}
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
            <h3 className="font-medium font-mono text-[0.7rem] text-accent uppercase tracking-[0.2em]">
              {footer.quickLinksHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <SectionLink
                    href={item.href}
                    className="text-primary-foreground/80 text-sm transition-colors hover:text-accent"
                  >
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-medium font-mono text-[0.7rem] text-accent uppercase tracking-[0.2em]">
              {footer.contactHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-primary-foreground/80 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-accent"
                  aria-hidden
                />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {contact.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-accent" aria-hidden />
                <a
                  href={`tel:${contact.whatsappNumber}`}
                  className="transition-colors hover:text-accent"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-primary-foreground/10 border-t pt-6 text-primary-foreground/60 text-xs sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {business.name}.{" "}
            {footer.copyrightSuffix}
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
