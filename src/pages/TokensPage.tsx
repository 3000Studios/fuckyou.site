import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { AdSlot } from "../components/ads/AdSlot";
import { TokenBadge } from "../components/TokenBadge";
import {
  TOKEN_PACKS,
  tokens,
  type Wallet,
  FEATURE_COSTS,
  DAILY_FREE_TOKENS,
} from "../lib/tokens";
import { track } from "../lib/analytics";
import { cx } from "../lib/utils";

export function TokensPage() {
  const [w, setW] = useState<Wallet>(() => tokens.get());
  const [toast, setToast] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  useEffect(() => tokens.subscribe(setW), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const provider = params.get("provider");
    const stripeSession = params.get("session_id");
    const paypalOrder = params.get("token");
    if (provider !== "stripe" && provider !== "paypal") return;
    if (provider === "stripe" && !stripeSession) return;
    if (provider === "paypal" && !paypalOrder) return;
    const run = async () => {
      try {
        const res = await fetch("/api/confirm-purchase", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            provider,
            sessionId: stripeSession ?? undefined,
            orderId: paypalOrder ?? undefined,
          }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          receiptId?: string;
          sku?: string;
          tokens?: number;
          error?: string;
        };
        if (!res.ok || !data.ok || !data.receiptId || !data.sku || !data.tokens) {
          throw new Error(data.error || "Payment verification failed.");
        }
        const granted = tokens.grantPackFromReceipt(
          data.sku,
          data.tokens,
          data.receiptId
        );
        if (granted.granted) {
          setToast(`Payment confirmed. Added ${data.tokens} tokens.`);
        } else {
          setToast("This payment was already redeemed.");
        }
        track({
          name: "tokens_checkout_confirmed",
          params: { provider, sku: data.sku, tokens: data.tokens },
        });
      } catch (error) {
        setToast(error instanceof Error ? error.message : "Checkout confirmation failed.");
      } finally {
        window.setTimeout(() => setToast(null), 3000);
        const clean = new URL(window.location.href);
        clean.searchParams.delete("provider");
        clean.searchParams.delete("session_id");
        clean.searchParams.delete("token");
        clean.searchParams.delete("PayerID");
        window.history.replaceState({}, "", clean.toString());
      }
    };
    void run();
  }, []);

  const buy = async (
    provider: "stripe" | "paypal",
    sku: string,
    amount: number,
    price: number
  ) => {
    const key = `${provider}:${sku}`;
    setBusyKey(key);
    try {
      track({
        name: "tokens_checkout_click",
        params: { provider, sku, amount, price },
      });
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ provider, sku }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Failed to start checkout.");
      }
      window.location.href = data.checkoutUrl;
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Checkout failed.");
      window.setTimeout(() => setToast(null), 3000);
      setBusyKey(null);
    }
  };

  return (
    <>
      <Seo
        title="Tokens — Fuel the Chaos"
        description="Tokens power roast battles, prank call generation, and future features. Free daily tokens, optional packs. No subscriptions."
        path="/tokens"
        keywords={["tokens", "pricing", "buy tokens"]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-red-glow pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neon-amber">
            The Economy
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-black tracking-tight">
            Tokens
          </h1>
          <p className="mt-3 text-ink-100 max-w-2xl mx-auto">
            You get <span className="text-neon-amber font-semibold">{DAILY_FREE_TOKENS} free tokens</span>{" "}
            every day. Tokens unlock the Roast Game and Prank Call Generator.
            No subscriptions. No dark patterns. Spend them, refill them, or
            grab a pack if you're feeling spicy.
          </p>
          <div className="mt-5 flex justify-center">
            <TokenBadge />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-ink-800/60 border border-ink-600 rounded-2xl p-5 mb-8">
          <div className="grid sm:grid-cols-4 gap-4 text-center">
            <Stat label="Balance" value={w.balance} accent="text-neon-amber" />
            <Stat label="Earned (lifetime)" value={w.lifetimeEarned} />
            <Stat label="Spent (lifetime)" value={w.lifetimeSpent} />
            <Stat label="Packs purchased" value={w.purchases.length} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOKEN_PACKS.map((p) => (
            <div
              key={p.sku}
              className={cx(
                "relative rounded-2xl border bg-ink-800/60 p-5 flex flex-col",
                p.popular
                  ? "border-neon-red shadow-[0_0_0_1px_rgba(255,42,85,0.3)]"
                  : "border-ink-600"
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-5 px-2 py-0.5 text-[10px] uppercase tracking-widest bg-neon-red rounded-md">
                  Popular
                </span>
              )}
              <div className="font-display text-lg font-bold">{p.name}</div>
              <div className="mt-1 text-xs text-ink-200">{p.tagline}</div>
              <div className="mt-4 text-4xl font-display font-black">
                {p.tokens}
              </div>
              <div className="text-xs text-ink-200">tokens</div>
              <div className="mt-3 text-xl font-semibold">${p.priceUsd.toFixed(2)}</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => buy("stripe", p.sku, p.tokens, p.priceUsd)}
                  disabled={busyKey !== null}
                  className={cx(
                    "h-10 rounded-lg font-semibold text-xs disabled:opacity-50",
                    p.popular
                      ? "bg-neon-red text-white"
                      : "bg-ink-700 hover:bg-ink-600"
                  )}
                >
                  {busyKey === `stripe:${p.sku}` ? "Opening..." : "Buy with Stripe"}
                </button>
                <button
                  onClick={() => buy("paypal", p.sku, p.tokens, p.priceUsd)}
                  disabled={busyKey !== null}
                  className="h-10 rounded-lg font-semibold text-xs bg-neon-blue text-ink-950 disabled:opacity-50"
                >
                  {busyKey === `paypal:${p.sku}` ? "Opening..." : "Buy with PayPal"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {toast && (
          <div
            role="status"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink-800 border border-ink-500 rounded-full px-4 h-10 flex items-center text-sm shadow-xl"
          >
            {toast}
          </div>
        )}

        <div className="my-10">
          <AdSlot slot="tokens-mid" format="horizontal" />
        </div>

        <section className="bg-ink-800/60 border border-ink-600 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            How tokens get used
          </h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <li className="p-3 rounded-lg bg-ink-900 border border-ink-600">
              <span className="text-neon-red font-semibold">
                Roast turn · {FEATURE_COSTS.roast} token
              </span>
              <p className="text-ink-100 mt-1">
                Each time you send a message to the Roast Game, it costs 1 token.
              </p>
            </li>
            <li className="p-3 rounded-lg bg-ink-900 border border-ink-600">
              <span className="text-neon-blue font-semibold">
                Generate a prank · {FEATURE_COSTS.prank_generate} tokens
              </span>
              <p className="text-ink-100 mt-1">
                Each personalized prank call script generation.
              </p>
            </li>
            <li className="p-3 rounded-lg bg-ink-900 border border-ink-600">
              <span className="text-neon-amber font-semibold">
                Read Outrage News · free
              </span>
              <p className="text-ink-100 mt-1">
                Reading is always free. Being mad is a human right.
              </p>
            </li>
            <li className="p-3 rounded-lg bg-ink-900 border border-ink-600">
              <span className="text-ink-100 font-semibold">
                Daily refill · {DAILY_FREE_TOKENS} tokens
              </span>
              <p className="text-ink-100 mt-1">
                Top up to {DAILY_FREE_TOKENS} tokens every day, automatically.
              </p>
            </li>
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm">
            <strong className="text-amber-200">Heads up:</strong> Token grants
            are only applied after server-side payment verification from Stripe
            or PayPal.
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              to="/roast"
              className="px-4 h-11 leading-[2.75rem] rounded-xl bg-neon-red text-white font-semibold"
            >
              Go roast yourself
            </Link>
            <Link
              to="/prank"
              className="px-4 h-11 leading-[2.75rem] rounded-xl bg-neon-blue text-ink-950 font-semibold"
            >
              Generate a prank
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: string;
}) {
  return (
    <div>
      <div className={cx("text-3xl font-display font-black", accent)}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-ink-200">
        {label}
      </div>
    </div>
  );
}
