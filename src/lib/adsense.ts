import { SITE } from "./site";

let installed = false;

export function installAdSense(): void {
  if (installed || typeof window === "undefined") return;
  const client = SITE.adsenseClient;
  if (!client || !client.startsWith("ca-pub-")) {
    // No valid publisher ID configured — skip loader to keep dev clean.
    return;
  }
  if (document.querySelector('script[data-adsbygoogle-loader]')) {
    installed = true;
    return;
  }
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    client
  )}`;
  s.crossOrigin = "anonymous";
  s.setAttribute("data-adsbygoogle-loader", "true");
  document.head.appendChild(s);

  // Google meta tag used by AdSense for ownership / auto ads
  const meta = document.createElement("meta");
  meta.name = "google-adsense-account";
  meta.content = client;
  document.head.appendChild(meta);

  installed = true;
}

export function pushAd(): void {
  if (typeof window === "undefined") return;
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
    // Swallow — AdSense frequently throws in dev.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[adsense] push error", err);
    }
  }
}
