import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";

export function DisclaimerPage() {
  return (
    <>
      <Seo
        title="Disclaimer"
        description={`Disclaimer for ${SITE.name} — affiliate links, advertising, and editorial policy.`}
        path="/disclaimer"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-neon-red">
          Legal
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
          Disclaimer
        </h1>
        <p className="mt-2 text-sm text-ink-300">Effective: April 1, 2026</p>
        <div className="prose-rant mt-6">
          <h2>Entertainment purposes</h2>
          <p>
            The content on {SITE.name} is for entertainment, satire, and
            informational purposes only. We write humor and commentary
            about modern life. We are not lawyers, doctors, financial
            advisers, therapists, or any kind of licensed professional.
            Anything you read here should not be taken as legal, medical,
            financial, or professional advice. For real advice, consult a
            licensed professional.
          </p>

          <h2>Accuracy</h2>
          <p>
            We do our best to be accurate, but we make no warranty about
            the completeness, reliability, or accuracy of any information
            on the Site. Any action you take upon information on this
            website is strictly at your own risk, and we will not be liable
            for any losses or damages in connection with the use of the
            Site.
          </p>

          <h2>Affiliate disclosure</h2>
          <p>
            {SITE.name} is a participant in various affiliate advertising
            programs, including the Amazon Services LLC Associates Program
            and other third-party affiliate programs. These are designed to
            provide a means for sites to earn advertising fees by linking
            to products and services. When you click an affiliate link on
            this Site and make a purchase, we may receive a small
            commission at no additional cost to you.
          </p>
          <p>
            We only recommend products we believe are worth considering.
            Our editorial content is never for sale, and no commission
            influences what we choose to review.
          </p>

          <h2>Advertising disclosure</h2>
          <p>
            We display third-party advertisements on the Site, served
            primarily by Google AdSense. Ads are labeled as "Advertisement"
            or "Sponsored." The appearance of an ad on {SITE.name} does not
            constitute an endorsement of the advertiser or its products.
          </p>

          <h2>External links</h2>
          <p>
            Our Site may contain links to external sites. We are not
            responsible for the content or reliability of any external
            websites. The inclusion of a link does not imply endorsement of
            the views expressed within them.
          </p>

          <h2>Satire notice</h2>
          <p>
            Many posts on this Site use satire, hyperbole, and exaggeration
            for comedic effect. Statements like "this should be illegal" or
            "science will study this" are jokes. We're funny, not literal.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this Disclaimer? Email{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
