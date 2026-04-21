import { Seo } from "../components/Seo";
import { MEDIA } from "../lib/media";
import { SITE } from "../lib/site";

export function CreditsPage() {
  return (
    <>
      <Seo
        title="Media Credits"
        description={`Licensing and attribution for videos used on ${SITE.name}.`}
        path="/credits"
        keywords={["credits", "licenses", "attribution", "media"]}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-red">
          Credits
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
          Media Credits
        </h1>
        <p className="mt-3 text-ink-100">
          We only use media that is public domain or properly licensed. If you
          believe a credit is missing or incorrect, contact us and we’ll fix it.
        </p>

        <div className="mt-8 space-y-4">
          {MEDIA.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-ink-600 bg-ink-800/60 p-5"
            >
              <h2 className="font-display text-lg font-bold text-white">
                {m.title}
              </h2>
              <p className="mt-1 text-sm text-ink-100">
                Attribution: {m.attribution}
              </p>
              <p className="mt-1 text-xs text-ink-200">
                License:{" "}
                <a
                  href={m.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {m.licenseName}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a
                  href={m.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:text-white font-semibold"
                >
                  Source page
                </a>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-100 hover:text-white font-semibold"
                >
                  Direct file
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

