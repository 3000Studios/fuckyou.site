import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { BlogPage } from "./pages/BlogPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ArticlePage } from "./pages/ArticlePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { DisclaimerPage } from "./pages/DisclaimerPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RoastPage } from "./pages/RoastPage";
import { PrankPage } from "./pages/PrankPage";
import { OutragePage } from "./pages/OutragePage";
import { OutrageStoryPage } from "./pages/OutrageStoryPage";
import { TokensPage } from "./pages/TokensPage";
import { track } from "./lib/analytics";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    track({
      name: "page_view",
      params: {
        page_path: location.pathname,
        page_location: window.location.href,
      },
    });
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/roast" element={<RoastPage />} />
        <Route path="/prank" element={<PrankPage />} />
        <Route path="/outrage" element={<OutragePage />} />
        <Route path="/outrage/:slug" element={<OutrageStoryPage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
