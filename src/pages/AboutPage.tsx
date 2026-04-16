import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";
import { CATEGORIES } from "../data/categories";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description={`About ${SITE.name} — why this site exists, who runs it, and what you're reading.`}
        path="/about"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-neon-red">
          About
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
          We say the thing everyone's thinking.
        </h1>
        <div className="prose-rant mt-6">
          <p>
            <strong>{SITE.name}</strong> is a humor and commentary site about
            the small, stupid indignities of modern life — bad bosses, slow
            WiFi, expensive groceries, and every app that secretly hates you.
            We publish rants that are funny, relatable, and sometimes
            accidentally useful.
          </p>
          <p>
            We don't do hateful content. We don't punch down. We don't
            publish anything we wouldn't show our mom (or, honestly, our
            group chat). The goal is catharsis: you read, you laugh, you
            realize you're not alone, you send it to a friend who needed it
            more than you did.
          </p>
          <h2>What we write about</h2>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`}>
                  <strong>{c.name}</strong>
                </Link>
                {" — "}
                {c.blurb}
              </li>
            ))}
          </ul>
          <h2>How we make money</h2>
          <p>
            We run standard display ads (via Google AdSense) and occasionally
            recommend products through affiliate links. When you buy through
            those links, we get a small commission at no extra cost to you.
            That's it. We don't do sponsored posts disguised as articles. We
            don't sell your data. Our business model is 'be readable enough
            that you come back.'
          </p>
          <h2>Want to write for us?</h2>
          <p>
            We're always open to guest rants. If you've got 800 words of
            well-aimed frustration about something real, send us a pitch at{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
            Include a sample of your writing and the topic you'd like to tear
            into.
          </p>
          <h2>Editorial principles (the boring version)</h2>
          <ul>
            <li>
              We fact-check claims that look like facts. Opinions are
              labeled.
            </li>
            <li>
              We link to primary sources when we cite statistics.
            </li>
            <li>
              We update articles when something changes. Notes are left at
              the bottom.
            </li>
            <li>We correct mistakes publicly, not quietly.</li>
            <li>
              We don't scrape or republish other people's work. Every rant
              here is original.
            </li>
          </ul>
          <p>
            Questions, threats, love letters, business inquiries: all go to{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
