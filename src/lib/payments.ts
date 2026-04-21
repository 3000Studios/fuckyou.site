export type PaymentLink = {
  label: string;
  href: string;
  provider: "paypal" | "stripe";
};

function env(key: string): string {
  return (import.meta as any).env?.[key] || "";
}

export function getSubscriptionLinks(): PaymentLink[] {
  const links: PaymentLink[] = [];

  const paypal = env("VITE_PAYPAL_PAYMENT_LINK");
  if (paypal) links.push({ label: "PayPal", href: paypal, provider: "paypal" });

  const stripe = env("VITE_STRIPE_PAYMENT_LINK");
  if (stripe) links.push({ label: "Card", href: stripe, provider: "stripe" });

  const paypalStarter = env("VITE_PAYPAL_STARTER_LINK");
  if (paypalStarter)
    links.push({
      label: "PayPal Starter",
      href: paypalStarter,
      provider: "paypal",
    });

  const stripeStarter = env("VITE_STRIPE_STARTER_LINK");
  if (stripeStarter)
    links.push({
      label: "Card Starter",
      href: stripeStarter,
      provider: "stripe",
    });

  const paypalPro = env("VITE_PAYPAL_PRO_LINK");
  if (paypalPro)
    links.push({ label: "PayPal Pro", href: paypalPro, provider: "paypal" });

  const stripePro = env("VITE_STRIPE_PRO_LINK");
  if (stripePro)
    links.push({ label: "Card Pro", href: stripePro, provider: "stripe" });

  const paypalEnterprise = env("VITE_PAYPAL_ENTERPRISE_LINK");
  if (paypalEnterprise)
    links.push({
      label: "PayPal Enterprise",
      href: paypalEnterprise,
      provider: "paypal",
    });

  const stripeEnterprise = env("VITE_STRIPE_ENTERPRISE_LINK");
  if (stripeEnterprise)
    links.push({
      label: "Card Enterprise",
      href: stripeEnterprise,
      provider: "stripe",
    });

  const seen = new Set<string>();
  return links.filter((l) => {
    if (!l.href) return false;
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

