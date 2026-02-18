import { Layout } from "@/components/layout";
import { Hero } from "@/components/sections";
import { SEO } from "@/components/SEO";

const Privacy = () => (
  <Layout>
    <SEO
      title="Privacy Policy"
      description="ValorWell's privacy policy. Learn how we protect your personal information and health data."
      canonical="/privacy"
    />
    <Hero title="Privacy Policy" subtitle="Your privacy matters to us." ctaText="" ctaLink="" />
    <section className="section-padding">
      <div className="container-narrow prose prose-lg text-muted-foreground">
        <p><strong>Effective Date:</strong> February 18, 2026</p>

        <h2 className="text-foreground">1. Introduction</h2>
        <p>
          ValorWell ("we," "us," or "our") is a mental health services organization serving veterans,
          military families, and clinicians. We are committed to protecting your privacy and handling
          your personal information responsibly. This Privacy Policy explains how we collect, use,
          store, share, and protect your data when you use our website and services.
        </p>
        <p>
          If you have any questions about this policy, please contact us at{" "}
          <a href="mailto:info@valorwell.org">info@valorwell.org</a>.
        </p>

        <h2 className="text-foreground">2. Information We Collect</h2>
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Account and Profile Information:</strong> Name, email address, phone number, and
            professional credentials (for clinicians).
          </li>
          <li>
            <strong>Protected Health Information (PHI):</strong> For clients receiving therapy or
            support services, we collect health-related information necessary to provide care, in
            compliance with HIPAA.
          </li>
          <li>
            <strong>Usage Data and Analytics:</strong> We use Google Analytics and Google Ads
            conversion tracking to understand how visitors interact with our website. This data is
            collected in aggregate and does not personally identify individual users.
          </li>
        </ul>

        <h2 className="text-foreground">3. Google User Data</h2>
        <p>
          ValorWell's electronic health record (EHR) platform integrates with Google Calendar to
          enable appointment syncing for clinicians. This section describes how we handle Google user
          data accessed through Google's OAuth 2.0 authorization flow.
        </p>

        <h3 className="text-foreground">Data Accessed</h3>
        <p>
          When a clinician connects their Google account, ValorWell requests access to the following
          Google API scopes:
        </p>
        <ul>
          <li>
            <strong>calendar.events</strong> — Read and write calendar events for appointment
            syncing between the ValorWell EHR and the clinician's Google Calendar.
          </li>
          <li>
            <strong>calendar.calendarlist.readonly</strong> — Read the clinician's calendar list to
            allow them to select which calendar to sync.
          </li>
          <li>
            <strong>calendar.events.freebusy</strong> — Read free/busy status to determine
            scheduling availability.
          </li>
        </ul>

        <h3 className="text-foreground">Data Usage</h3>
        <p>
          Google Calendar data is used <strong>solely</strong> to synchronize clinician appointments
          between the ValorWell EHR platform and the clinician's Google Calendar. We do not use
          Google user data for any other purpose, including advertising, analytics, or profiling.
        </p>

        <h3 className="text-foreground">Data Sharing</h3>
        <p>
          Google user data is <strong>not shared with any third parties</strong>. Data flows directly
          between Google's API and the ValorWell application. No intermediaries, advertising
          networks, or data brokers have access to Google user data.
        </p>

        <h3 className="text-foreground">Data Storage and Protection</h3>
        <p>
          Calendar sync data is stored in a secure, cloud-hosted database with the following
          protections:
        </p>
        <ul>
          <li>Encryption at rest and in transit (TLS/HTTPS)</li>
          <li>Row-level security ensuring clinicians can only access their own data</li>
          <li>Authentication required for all data access</li>
        </ul>

        <h3 className="text-foreground">Data Retention and Deletion</h3>
        <p>
          Google Calendar sync data is retained only while a clinician is actively employed or
          contracted with ValorWell. Upon separation from ValorWell, their synced calendar data is
          deleted. Clinicians may also request deletion of their Google Calendar data at any time by
          contacting <a href="mailto:info@valorwell.org">info@valorwell.org</a>.
        </p>

        <h3 className="text-foreground">Compliance with Google API Services User Data Policy</h3>
        <p>
          ValorWell's use and transfer of information received from Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2 className="text-foreground">4. Protected Health Information (PHI)</h2>
        <p>
          ValorWell collects and handles Protected Health Information in compliance with the Health
          Insurance Portability and Accountability Act (HIPAA). PHI is used solely for the purpose of
          providing mental health care services.
        </p>
        <p>
          <strong>Retention:</strong> PHI is retained for 10 years after the last date of activity on
          a client's account, in accordance with medical recordkeeping requirements.
        </p>
        <p>
          <strong>Deletion:</strong> Clients may request deletion of their data by contacting{" "}
          <a href="mailto:info@valorwell.org">info@valorwell.org</a>. Deletion requests are honored
          subject to applicable legal retention obligations.
        </p>

        <h2 className="text-foreground">5. How We Use Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and improve mental health services to our clients</li>
          <li>Synchronize clinician calendars for scheduling and appointment management</li>
          <li>Analyze website traffic and measure the effectiveness of outreach campaigns (Google Analytics, Google Ads)</li>
          <li>Communicate with users about our services</li>
        </ul>

        <h2 className="text-foreground">6. Data Sharing</h2>
        <ul>
          <li>We do <strong>not</strong> sell user data.</li>
          <li>We do <strong>not</strong> share Google user data with any third parties.</li>
          <li>We may share de-identified, aggregated analytics data for reporting purposes.</li>
          <li>We may disclose information when required by law or to comply with legal process.</li>
        </ul>

        <h2 className="text-foreground">7. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your data,
          including:
        </p>
        <ul>
          <li>Encryption in transit (TLS/HTTPS) and at rest</li>
          <li>Row-level security on our database to isolate user data</li>
          <li>Access controls and authentication for all systems</li>
        </ul>

        <h2 className="text-foreground">8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to the personal data we hold about you</li>
          <li>Request deletion of your personal data (subject to legal retention requirements)</li>
          <li>Withdraw consent for Google Calendar integration at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:info@valorwell.org">info@valorwell.org</a>.
        </p>

        <h2 className="text-foreground">9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated effective date. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-foreground">10. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
          <a href="mailto:info@valorwell.org">info@valorwell.org</a>
        </p>
      </div>
    </section>
  </Layout>
);

export default Privacy;
