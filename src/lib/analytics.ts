import { SITE } from "./site";

let installed = false;

export function installAnalytics(): void {
  if (installed || typeof window === "undefined") return;
  const id = SITE.gaMeasurementId;
  if (!id) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  const gtag: (...args: unknown[]) => void = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
  installed = true;
}

export type TrackEvent = {
  name: string;
  params?: Record<string, unknown>;
};

export function track({ name, params }: TrackEvent): void {
  if (typeof window === "undefined") return;
  try {
    if (window.gtag) {
      window.gtag("event", name, params || {});
    } else if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[analytics:dev]", name, params);
    }
  } catch {
    /* noop */
  }
}
