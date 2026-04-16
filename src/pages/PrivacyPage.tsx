import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";

export function PrivacyPage() {
  const effective = `April 1, 2026`;
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`Privacy Policy for ${SITE.name}. How we collect, use, and protect your information.`}
        path="/privacy"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-neon-red">
          Legal
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-300">Effective: {effective}</p>
        <div className="prose-rant mt-6">
          <p>
            This Privacy Policy describes how {SITE.name} ("we", "us", or
            "our") collects, uses, and shares information about you when you
            use the site at{" "}
            <a href={SITE.url}>{SITE.url}</a> (the "Site"). By using the
            Site, you agree to the terms of this policy.
          </p>

          <h2>1. Information we collect</h2>
          <p>
            <strong>Information you give us directly.</strong> If you submit
            the contact form or sign up for our newsletter, we collect the
            name, email address, and message you choose to share.
          </p>
          <p>
            <strong>Automatically collected information.</strong> Like most
            websites, we automatically collect certain information when you
            visit, including IP address, device type, browser type, referral
            URL, pages visited, and the date/time of your visit.
          </p>

          <h2>2. Cookies and similar technologies</h2>
          <p>
            We use cookies and similar technologies to operate the Site, to
            remember your preferences, to analyze site traffic, and to
            deliver and measure advertisements. You can disable cookies in
            your browser settings, though some features of the Site may not
            work correctly without them.
          </p>

          <h2>3. Third-party advertising (Google AdSense)</h2>
          <p>
            We use Google AdSense to display advertisements on the Site.
            Google uses cookies and similar technologies to serve ads based
            on your prior visits to this and other sites. Google's use of
            the DoubleClick cookie enables it and its partners to serve ads
            based on your visits to this and other websites. You may opt out
            of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            . You can also opt out of cookie use by third-party vendors by
            visiting the{" "}
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Advertising Alliance opt-out page
            </a>
            .
          </p>

          <h2>4. Analytics</h2>
          <p>
            We may use Google Analytics or Cloudflare Web Analytics to
            understand how visitors use the Site. These services collect
            usage data (page views, device info, approximate location) on
            our behalf. You can learn more about Google's practices at{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </p>

          <h2>5. How we use information</h2>
          <ul>
            <li>To operate, maintain, and improve the Site.</li>
            <li>To respond to your questions or correspondence.</li>
            <li>
              To send you our newsletter if you explicitly subscribe
              (one-click unsubscribe in every email).
            </li>
            <li>To comply with legal obligations.</li>
            <li>
              To detect, prevent, and investigate fraud, abuse, or security
              issues.
            </li>
          </ul>

          <h2>6. Sharing</h2>
          <p>
            We do not sell your personal information. We share limited
            information with service providers who help us operate the Site
            (for example, hosting, analytics, advertising, and email
            delivery), and only as necessary for them to provide those
            services. We may also disclose information when required by law.
          </p>

          <h2>7. Your choices and rights</h2>
          <p>
            Depending on where you live, you may have the right to access,
            correct, delete, or restrict processing of your personal
            information, and the right to data portability or to object to
            processing. To exercise these rights, contact us at{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
          <p>
            <strong>EU/UK (GDPR)</strong>: you may lodge a complaint with
            your local supervisory authority.{" "}
            <strong>California (CCPA/CPRA)</strong>: California residents
            may request details about the categories of personal information
            we collected and may request deletion, subject to exceptions.
          </p>

          <h2>8. Children</h2>
          <p>
            The Site is not directed to children under 13 (or under 16 in
            the EU). We do not knowingly collect personal information from
            children. If you believe a child has provided us information,
            contact us and we will delete it.
          </p>

          <h2>9. Data retention and security</h2>
          <p>
            We retain personal information only as long as necessary for the
            purposes described in this policy, or as required by law. We
            use commercially reasonable measures to protect your
            information, but no method of transmission or storage is 100%
            secure.
          </p>

          <h2>10. International transfers</h2>
          <p>
            We are based in the United States and process data there. If you
            are using the Site from outside the U.S., your information may
            be transferred to, stored, and processed in a country with
            different data protection laws.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The
            "Effective" date at the top indicates when it was last revised.
            Continued use of the Site after changes constitutes acceptance.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
