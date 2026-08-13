import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { WhatsAppIcon } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * A "chat/order via WhatsApp" CTA. Opens a wa.me link in a new tab with an
 * optional pre-filled message. If no message is passed it sends a generic
 * greeting, so it's safe to drop anywhere without an order.
 */
export function WhatsAppButton({
  label,
  message,
  variant = "accent",
  size = "default",
  className,
  withIcon = true,
  ...rest
}: {
  label: string;
  /** Optional pre-filled message; defaults to a plain greeting. */
  message?: string;
  withIcon?: boolean;
} & ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>) {
  const { contact, name, orderIntro } = siteConfig.business;
  const whatsappNumber = contact.whatsappNumber;

  const resolvedMessage = message ?? `${orderIntro}\n\n— ${name}`;

  const href = buildWhatsAppUrl(whatsappNumber, resolvedMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — opens WhatsApp in a new tab`}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {withIcon && <WhatsAppIcon data-slot="icon" className="size-4" />}
      {label}
    </a>
  );
}
