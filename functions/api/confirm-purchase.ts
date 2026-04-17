type ConfirmResult = {
  ok: true;
  receiptId: string;
  sku: string;
  tokens: number;
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function confirmStripe(
  env: Record<string, string>,
  sessionId: string
): Promise<ConfirmResult> {
  const secret = env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("Stripe is not configured.");
  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { headers: { Authorization: `Bearer ${secret}` } }
  );
  const data = (await res.json()) as {
    id?: string;
    payment_status?: string;
    payment_intent?: string;
    metadata?: { sku?: string; tokens?: string };
    error?: { message?: string };
  };
  if (!res.ok) throw new Error(data.error?.message || "Stripe verification failed.");
  if (data.payment_status !== "paid") throw new Error("Stripe payment not completed yet.");
  const sku = data.metadata?.sku;
  const tokens = Number(data.metadata?.tokens || "0");
  if (!sku || !tokens) throw new Error("Stripe session metadata missing.");
  const receiptId = data.payment_intent || data.id || sessionId;
  return { ok: true, receiptId: `stripe:${receiptId}`, sku, tokens };
}

async function getPaypalToken(env: Record<string, string>): Promise<string> {
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
    throw new Error(data.error_description || "PayPal auth failed.");
  }
  return data.access_token;
}

async function confirmPaypal(
  env: Record<string, string>,
  orderId: string
): Promise<ConfirmResult> {
  const token = await getPaypalToken(env);
  const base = env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
  const captureRes = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: "{}",
  });
  const captureData = (await captureRes.json()) as {
    id?: string;
    status?: string;
    purchase_units?: { custom_id?: string; payments?: { captures?: { id?: string; status?: string }[] } }[];
    message?: string;
  };

  if (!captureRes.ok && captureRes.status !== 422) {
    throw new Error(captureData.message || "PayPal capture failed.");
  }

  const readRes = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await readRes.json()) as {
    id?: string;
    status?: string;
    purchase_units?: { custom_id?: string; payments?: { captures?: { id?: string; status?: string }[] } }[];
  };
  if (!readRes.ok) throw new Error("Failed to read PayPal order.");
  const unit = data.purchase_units?.[0];
  const customId = unit?.custom_id ?? "";
  const [sku, tokenText] = customId.split("|");
  const tokens = Number(tokenText || "0");
  const captureId = unit?.payments?.captures?.[0]?.id || data.id || orderId;
  const captureStatus = unit?.payments?.captures?.[0]?.status;
  if (captureStatus !== "COMPLETED") throw new Error("PayPal payment not completed.");
  if (!sku || !tokens) throw new Error("PayPal order metadata missing.");
  return { ok: true, receiptId: `paypal:${captureId}`, sku, tokens };
}

export const onRequestPost: PagesFunction<Record<string, string>> = async ({
  request,
  env,
}) => {
  try {
    const body = (await request.json()) as {
      provider?: "stripe" | "paypal";
      sessionId?: string;
      orderId?: string;
    };
    if (body.provider === "stripe" && body.sessionId) {
      return json(await confirmStripe(env, body.sessionId));
    }
    if (body.provider === "paypal" && body.orderId) {
      return json(await confirmPaypal(env, body.orderId));
    }
    return json({ error: "Missing provider checkout reference." }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Purchase verification failed.";
    return json({ error: message }, 500);
  }
};
