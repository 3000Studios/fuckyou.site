import { useParams, Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { ArticleCard } from "../components/ArticleCard";
import { CategoryPills } from "../components/CategoryPills";
import { AdSlot } from "../components/ads/AdSlot";
import { getCategory } from "../data/categories";
import { getArticlesByCategory } from "../data/articles";
import { NotFoundPage } from "./NotFoundPage";

export function CategoryPage() {
  const { slug = "" } = useParams();
  const cat = getCategory(slug);
  if (!cat) return <NotFoundPage />;

  const articles = getArticlesByCategory(cat.slug);

  return (
    <>
      <Seo
        title={`${cat.name} Rants`}
        description={`${cat.blurb} Browse articles about ${cat.name.toLowerCase()} on fuckyou.site.`}
        path={`/category/${cat.slug}`}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 border-b border-ink-600/40">
        <nav
          aria-label="Breadcrumb"
          className="text-xs uppercase tracking-[0.18em] text-ink-300 mb-2"
        >
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-ink-400">/</span>
          <Link to="/blog" className="hover:text-white">
            Rants
          </Link>
          <span className="mx-2 text-ink-400">/</span>
          <span className="text-white">{cat.name}</span>
        </nav>
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-neon-red">
          Category
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white">
          {cat.name}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-100">{cat.blurb}</p>
        <div className="mt-6">
          <CategoryPills />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSlot slot="category-top" minHeight={90} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {articles.length === 0 ? (
          <p className="text-center text-ink-100 py-12">
            No articles in this category yet. Give us a week.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
