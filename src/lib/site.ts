export const SITE = {
  name: "fuckyou.site",
  shortName: "FYS",
  url: import.meta.env.VITE_SITE_URL || "https://fuckyou.site",
  description:
    "Viral rants, relatable humor, and the unfiltered take on modern life. The internet's loudest vent.",
  tagline: "The internet's loudest rant, in one place.",
  contactEmail:
    import.meta.env.VITE_CONTACT_EMAIL || "contact@fuckyou.site",
  adsenseClient: import.meta.env.VITE_GOOGLE_ADSENSE_ID || "",
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "",
  twitter: "@fuckyousite",
  author: "The Rant Desk",
  startYear: 2026,
} as const;

export const NAV: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Rants", to: "/blog" },
  { label: "Work", to: "/category/work" },
  { label: "Life", to: "/category/life" },
  { label: "Tech", to: "/category/tech" },
  { label: "Money", to: "/category/money" },
  { label: "About", to: "/about" },
];

export const FOOTER_LINKS: { label: string; to: string }[] = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Sitemap", to: "/sitemap.xml" },
];
