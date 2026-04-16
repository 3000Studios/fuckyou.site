import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ExitIntentModal } from "./ExitIntentModal";
import { StickyMobileAd } from "./ads/StickyMobileAd";
import { ScrollProgress } from "./ScrollProgress";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col bg-ink-900 text-ink-50 selection:bg-neon-red/80 selection:text-white">
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
