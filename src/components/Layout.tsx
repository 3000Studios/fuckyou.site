import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ExitIntentModal } from "./ExitIntentModal";
import { StickyMobileAd } from "./ads/StickyMobileAd";
import { ScrollProgress } from "./ScrollProgress";
import { Backdrop } from "./visual/Backdrop";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-full flex flex-col bg-ink-900 text-ink-50 selection:bg-neon-red/80 selection:text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Backdrop className="opacity-70" intensity={1} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,42,85,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(41,216,255,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/25 via-ink-900/85 to-ink-950" />
      </div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink-700 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <ExitIntentModal />
      <StickyMobileAd />
    </div>
  );
}
