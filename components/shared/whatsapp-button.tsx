import type { ComponentProps } from "react";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/icons";

/**
 * A "chat/order via WhatsApp" CTA. Opens a wa.me link in a new tab with an
 * optional pre-filled message. If no message is passed it sends a generic
 * greeting, so it's safe to drop anywhere without an order.
 */
export function WhatsAppButton({
  label,
  message,
  variant = "default",
  size = "default",
  className,
  withIcon = true,
  ...rest
}: {
  label: string;
  /** Optional pre-filled message; defaults to a plain greeting. */
  message?: string;
  withIcon?: boolean;
} & ComponentProps<typeof Button>) {
  const { contact, name, orderIntro } = siteConfig.business;
  const whatsappNumber = contact.whatsappNumber;

  const resolvedMessage =
    message ?? `${orderIntro}\n\n— ${name}`;

  const href = buildWhatsAppUrl(whatsappNumber, resolvedMessage);

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={className}
      {...rest}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} — opens WhatsApp in a new tab`}
      >
        {withIcon && <WhatsAppIcon data-slot="icon" className="size-4" />}
        {label}
      </a>
    </Button>
  );
}