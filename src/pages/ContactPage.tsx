import { FormEvent, useState } from "react";
import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";
import { track } from "../lib/analytics";
import { cx } from "../lib/utils";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "general",
    message: "",
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    if (!form.name.trim() || !form.message.trim()) {
      setErr("Name and message are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErr("That email doesn't look right.");
      return;
    }
    setPending(true);
    try {
      // Open the user's mail client as a reliable client-only fallback.
      // Replace with a POST to your API (e.g. Cloudflare Pages Function at
      // /api/contact) when you're ready to collect directly.
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`
      );
      const subject = encodeURIComponent(
        `[${form.topic}] Message from ${form.name}`
      );
      window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
      track({ name: "contact_submit", params: { topic: form.topic } });
      setSent(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${SITE.name} — send a rant, a pitch, or a correction.`}
        path="/contact"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-neon-red">
          Contact
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
          Yell at us on purpose.
        </h1>
        <p className="mt-3 text-ink-100">
          Pitches, corrections, business inquiries, and tips land in the
          same inbox. We read everything. We reply to most of it.
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl border border-neon-blue/40 bg-neon-blue/5 p-5">
            <p className="text-white font-semibold">Sent.</p>
            <p className="mt-1 text-sm text-ink-100">
              We just opened your email client. If nothing happened, copy
              your message and send it to{" "}
              <a
                className="text-neon-blue underline"
                href={`mailto:${SITE.contactEmail}`}
              >
                {SITE.contactEmail}
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="c-name"
                label="Your name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                autoComplete="name"
                required
              />
              <Field
                id="c-email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="c-topic"
                className="block text-xs uppercase tracking-[0.18em] font-semibold text-ink-200 mb-1"
              >
                Topic
              </label>
              <select
                id="c-topic"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-ink-800 border border-ink-600 focus:border-neon-red focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white"
              >
                <option value="general">General</option>
                <option value="pitch">Pitch a rant</option>
                <option value="correction">Correction</option>
                <option value="business">Business / Partnerships</option>
                <option value="tip">Tip</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="c-msg"
                className="block text-xs uppercase tracking-[0.18em] font-semibold text-ink-200 mb-1"
              >
                Message
              </label>
              <textarea
                id="c-msg"
                rows={6}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full bg-ink-800 border border-ink-600 focus:border-neon-red focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-ink-300"
                placeholder="Tell us what's up. Be specific. Be petty. We can take it."
              />
            </div>
            {err && (
              <p className="text-sm text-neon-red" role="alert">
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className={cx(
                "inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white",
                "bg-neon-red hover:bg-neon-red/90 disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {pending ? "Sending…" : "Send it"}
            </button>
            <p className="text-xs text-ink-300">
              We don't sell your email. We don't even mail you unless you
              explicitly sign up for the newsletter.
            </p>
          </form>
        )}
      </section>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.18em] font-semibold text-ink-200 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-ink-800 border border-ink-600 focus:border-neon-red focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-ink-300"
      />
    </div>
  );
}
