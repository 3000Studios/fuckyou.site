import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { AdSlot } from "../components/ads/AdSlot";
import { ShareButtons } from "../components/ShareButtons";
import {
  getOutrageStory,
  getRelatedOutrage,
} from "../data/outrage";
import { formatDate } from "../lib/utils";
import { AutoVideo } from "../components/media/AutoVideo";
import { pickWallpaper } from "../lib/wallpaper";

export function OutrageStoryPage() {
  const { slug = "" } = useParams();
  const story = getOutrageStory(slug);
  if (!story) return <Navigate to="/outrage" replace />;
  const related = getRelatedOutrage(slug, 3);
  const wallpaper = pickWallpaper(`outrage:${story.slug}`);

  return (
    <>
      <Seo
        title={story.title}
        description={story.description}
        path={`/outrage/${story.slug}`}
        type="article"
        keywords={story.tags}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <nav className="text-xs text-ink-200 mb-4">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link to="/outrage" className="hover:text-white">
            Outrage
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-300 line-clamp-1 inline-block max-w-[60%] align-bottom">
            {story.title}
          </span>
        </nav>

        <div
          className={`relative rounded-3xl overflow-hidden p-8 md:p-10 bg-gradient-to-br ${story.gradient} mb-6`}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-100">
            <span>🔥 {story.kicker}</span>
            <span>·</span>
            <time dateTime={story.publishedAt}>
              {formatDate(story.publishedAt)}
            </time>
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-black tracking-tight">
            {story.title}
          </h1>
          <p className="mt-3 text-ink-100 max-w-2xl">{story.description}</p>
          <p className="mt-2 text-xs text-ink-200">
            Source:{" "}
            <a
              className="underline hover:text-white"
              href={story.source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {story.source.name}
            </a>
          </p>
        </div>

        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-ink-800 border border-ink-600 mb-6">
          <AutoVideo media={wallpaper} className="h-full w-full" />
        </div>
        <p className="mt-2 mb-6 text-xs text-ink-200">
          Wallpaper credit:{" "}
          <Link to="/credits" className="underline hover:text-white">
            Media Credits
          </Link>
        </p>

        <div className="prose prose-invert prose-rant max-w-none">
          <p className="text-lg leading-relaxed">{story.intro}</p>

          <h2>Why this hits different</h2>
          {story.takes.map((t, i) => (
            <p key={i}>{t}</p>
          ))}

          <AdSlot slot="outrage-article" format="horizontal" />

          <h2>Who to blame</h2>
          <ul>
            {story.blame.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <h2>The bottom line</h2>
          <p>{story.conclusion}</p>
        </div>

        <div className="mt-8">
          <ShareButtons title={story.title} url={`/outrage/${story.slug}`} />
        </div>

        <AdSlot slot="outrage-bottom" format="horizontal" />

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold tracking-tight mb-4">
              More ways to be mad today
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/outrage/${r.slug}`}
                  className="block rounded-xl border border-ink-600 bg-ink-800/60 p-4 hover:border-neon-red/60 transition"
                >
                  <div className="text-3xl">{r.emoji}</div>
                  <h3 className="mt-2 font-semibold line-clamp-2">{r.title}</h3>
                  <p className="mt-1 text-xs text-ink-200">{r.kicker}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
