import { FormEvent, useState } from "react";
import { cx } from "../lib/utils";
import { track } from "../lib/analytics";

type Props = {
  placement: "inline" | "footer" | "exit-intent";
  compact?: boolean;
};

export function NewsletterForm({ placement, compact }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMessage("That doesn't look like an email, champ.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      // Client-side simulation only — wire this up to your ESP (Buttondown,
      // ConvertKit, Mailchimp, Beehiiv, etc.) by replacing this block with a
      // POST to your API. Intentionally optimistic for now.
      await new Promise((r) => setTimeout(r, 600));
      track({
        name: "newsletter_signup",
        params: { placement, email_domain: email.split("@")[1] },
      });
      setStatus("ok");
      setMessage("You're in. Check your inbox for a confirmation.");
      setEmail("");
    } catch {
      setStatus("err");
      setMessage("Something broke. Try again in a minute.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Newsletter signup"
      className={cx(
        "w-full",
        placement === "exit-intent" ? "max-w-md" : "max-w-full"
      )}
    >
      <div
        className={cx(
          "flex gap-2",
          compact ? "flex-row" : "flex-col sm:flex-row"
        )}
      >
        <label htmlFor={`newsletter-${placement}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${placement}`}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@realaddress.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 bg-ink-800 border border-ink-600 focus:border-neon-red focus:outline-none rounded-md px-3 py-2 text-sm text-white placeholder:text-ink-300"
          aria-invalid={status === "err"}
          aria-describedby={`newsletter-${placement}-msg`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="whitespace-nowrap rounded-md bg-neon-red px-4 py-2 text-sm font-semibold text-white hover:bg-neon-red/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Hang on…" : "Send me rants"}
        </button>
      </div>
      <p
        id={`newsletter-${placement}-msg`}
        className={cx(
          "mt-2 text-xs",
          status === "ok"
            ? "text-neon-blue"
            : status === "err"
            ? "text-neon-red"
            : "text-ink-300"
        )}
        role="status"
      >
        {message ||
          "Weekly-ish. No spam. Unsubscribe before you finish reading an email, if you want."}
      </p>
    </form>
  );
}
