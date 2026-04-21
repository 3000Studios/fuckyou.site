import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { AutoVideo } from "../components/media/AutoVideo";
import { ScrollReveal } from "../components/ScrollReveal";
import { MEDIA } from "../lib/media";
import { SITE } from "../lib/site";

export function VideosPage() {
  const hero = MEDIA[0];
  const rest = MEDIA.slice(1);

  return (
    <>
      <Seo
        title="Videos"
        description={`Auto-playing, copyright-safe (or properly licensed) vibes for ${SITE.name}.`}
        path="/videos"
        keywords={["videos", "background", "webm", "credits"]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-red">
          Visual Noise
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
          Videos that actually move.
        </h1>
        <p className="mt-3 max-w-2xl text-ink-100">
          These are used as responsive wallpapers and page-level backdrops. All
          sources are credited on{" "}
          <Link to="/credits" className="underline hover:text-white">
            Media Credits
          </Link>
          .
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {hero && (
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AutoVideo media={hero} className="aspect-video" />
              </div>
              <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-6">
                <h2 className="font-display text-xl font-bold text-white">
                  Now playing
                </h2>
                <p className="mt-2 text-sm text-ink-100">{hero.title}</p>
                <p className="mt-2 text-xs text-ink-200">
                  Attribution: {hero.attribution}
                </p>
                <a
                  href={hero.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-4 items-center gap-2 rounded-lg bg-ink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-600"
                >
                  View source
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" strokeLinecap="round" />
                    <path d="M10 7h7v7" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((m, i) => (
            <ScrollReveal key={m.id} delay={Math.min(i * 0.04, 0.25)}>
              <div className="group rounded-2xl border border-ink-600 bg-ink-800/50 overflow-hidden hover:border-neon-red/60 transition-colors">
                <AutoVideo
                  media={m}
                  className="aspect-video"
                  posterGradient="from-ink-800 via-ink-900 to-ink-950"
                />
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-amber transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink-200">{m.attribution}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={m.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-neon-blue hover:text-white"
                    >
                      Source
                    </a>
                    <span className="text-ink-400">·</span>
                    <a
                      href={m.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-ink-200 hover:text-white"
                    >
                      {m.licenseName}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}

