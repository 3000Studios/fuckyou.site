type Pack = { sku: string; tokens: number; priceUsd: number };

const PACKS: Pack[] = [
  { sku: "pack_starter", tokens: 25, priceUsd: 2.99 },
  { sku: "pack_standard", tokens: 100, priceUsd: 7.99 },
  { sku: "pack_pro", tokens: 300, priceUsd: 19.99 },
  { sku: "pack_whale", tokens: 1000, priceUsd: 49.99 },
];

type Provider = "stripe" | "paypal";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function getPack(sku: string): Pack | null {
  return PACKS.find((p) => p.sku === sku) ?? null;
}

function siteBase(request: Request, env: Record<string, string>): string {
  if (env.SITE_URL) return env.SITE_URL;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

async function createStripeCheckout(
  env: Record<string, string>,
  base: string,
  pack: Pack
): Promise<{ url: string }> {
  const secret = env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("Stripe is not configured.");
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", `${base}/tokens?provider=stripe&session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${base}/tokens?checkout=cancelled`);
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", "usd");
  body.set("line_items[0][price_data][unit_amount]", String(Math.round(pack.priceUsd * 100)));
  body.set("line_items[0][price_data][product_data][name]", `${pack.tokens} Tokens`);
  body.set("line_items[0][price_data][product_data][description]", `Token pack ${pack.sku}`);
  body.set("metadata[sku]", pack.sku);
  body.set("metadata[tokens]", String(pack.tokens));

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = (await res.json()) as { url?: string; error?: { message?: string } };
  if (!res.ok || !data.url) {
    throw new Error(data.error?.message || "Failed to create Stripe checkout session.");
  }
  return { url: data.url };
}

async function getPaypalAccessToken(env: Record<string, string>): Promise<string> {
  const clientId = env.PAYPAL_CLIENT_ID;
  const clientSecret = env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("PayPal is not configured.");
  const auth = btoa(`${clientId}:${clientSecret}`);
  const base = env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || "Failed to authenticate PayPal.");
  }
  return data.access_token;
}

async function createPaypalOrder(
  env: Record<string, string>,
  token: string,
  base: string,
  pack: Pack
): Promise<{ url: string }> {
  const apiBase = env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
  const res = await fetch(`${apiBase}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: `${pack.sku}|${pack.tokens}`,
          description: `${pack.tokens} tokens`,
          amount: { currency_code: "USD", value: pack.priceUsd.toFixed(2) },
        },
      ],
      application_context: {
        return_url: `${base}/tokens?provider=paypal`,
        cancel_url: `${base}/tokens?checkout=cancelled`,
      },
    }),
  });
  const data = (await res.json()) as {
    links?: { rel: string; href: string }[];
    message?: string;
  };
  const approve = data.links?.find((l) => l.rel === "approve")?.href;
  if (!res.ok || !approve) {
    throw new Error(data.message || "Failed to create PayPal order.");
  }
  return { url: approve };
}

export const onRequestPost: PagesFunction<Record<string, string>> = async ({
  request,
  env,
}) => {
  try {
    const body = (await request.json()) as { sku?: string; provider?: Provider };
    const sku = body.sku ?? "";
    const provider = body.provider;
    const pack = getPack(sku);
    if (!pack) return json({ error: "Unknown token pack." }, 400);
    if (provider !== "stripe" && provider !== "paypal") {
      return json({ error: "Provider must be stripe or paypal." }, 400);
    }
    const base = siteBase(request, env);
    if (provider === "stripe") {
      const result = await createStripeCheckout(env, base, pack);
      return json({ checkoutUrl: result.url });
    }
    const accessToken = await getPaypalAccessToken(env);
    const result = await createPaypalOrder(env, accessToken, base, pack);
    return json({ checkoutUrl: result.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed.";
    return json({ error: message }, 500);
  }
};
