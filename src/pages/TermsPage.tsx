import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";

export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description={`Terms of Service for ${SITE.name}.`}
        path="/terms"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-neon-red">
          Legal
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-ink-300">Effective: April 1, 2026</p>
        <div className="prose-rant mt-6">
          <p>
            These Terms of Service ("Terms") govern your access to and use
            of {SITE.name} ("Site"). By using the Site you agree to these
            Terms. If you don't agree, don't use the Site.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 13 years old (or 16 in the EU) to use the
            Site. By using the Site you represent that you meet this
            requirement.
          </p>

          <h2>2. Content</h2>
          <p>
            All articles, images, logos, and other materials on the Site are
            owned by {SITE.name} or used with permission, and are protected
            by copyright and other intellectual property laws. You may read
            and share links to our content for personal, non-commercial use.
            You may not copy, republish, scrape, or redistribute the content
            without our written permission.
          </p>

          <h2>3. Permitted use</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the Site for any unlawful purpose.</li>
            <li>
              Attempt to gain unauthorized access to any portion of the
              Site, its systems, or related networks.
            </li>
            <li>
              Interfere with or disrupt the Site, servers, or networks.
            </li>
            <li>
              Use automated means (bots, scrapers) to access the Site
              without our prior written consent.
            </li>
            <li>
              Use the Site to transmit malware or engage in harassment.
            </li>
          </ul>

          <h2>4. User submissions</h2>
          <p>
            When you submit a message via our contact form, pitch, comment
            (if/when enabled), or newsletter, you grant us a non-exclusive,
            worldwide, royalty-free license to use, store, reproduce, and
            (for pitches we accept) publish your submission on the Site and
            in promotional materials. You represent that your submissions
            are your own and do not violate anyone's rights.
          </p>

          <h2>5. Advertising and affiliate links</h2>
          <p>
            We earn money through display ads (Google AdSense) and
            affiliate links. Some links on the Site are affiliate links,
            which means we may earn a small commission when you click
            through and make a purchase, at no extra cost to you. We only
            recommend products we believe are worth considering. See our{" "}
            <a href="/disclaimer">Disclaimer</a> for more.
          </p>

          <h2>6. Third-party links</h2>
          <p>
            The Site may link to third-party websites. We don't control or
            endorse those sites and are not responsible for their content
            or practices.
          </p>

          <h2>7. Disclaimers</h2>
          <p>
            The Site and its content are provided "as is" for entertainment
            and informational purposes only. We do not guarantee accuracy,
            completeness, or timeliness. Nothing on the Site is legal,
            medical, financial, or professional advice. See our{" "}
            <a href="/disclaimer">Disclaimer</a>.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {SITE.name} and its
            contributors will not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of or
            relating to your use of the Site. Our total liability for any
            claim related to the Site will not exceed the amount you paid
            us in the past twelve months (which, since the Site is free,
            will usually be zero).
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless {SITE.name}
            from any claims or damages arising out of your use of the Site
            or your violation of these Terms.
          </p>

          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate your access to the Site at any time
            if we believe you have violated these Terms or for any other
            reason, without notice.
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update these Terms from time to time. The "Effective"
            date at the top indicates when they were last revised. Your
            continued use of the Site after changes means you accept them.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of Delaware,
            USA, without regard to conflict-of-law principles.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
