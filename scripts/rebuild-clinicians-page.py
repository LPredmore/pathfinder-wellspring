from pathlib import Path


def replace_section(text: str, start: str, end: str, replacement: str) -> str:
    start_index = text.index(start)
    end_index = text.index(end, start_index)
    return text[:start_index] + replacement.rstrip() + "\n\n" + text[end_index:]


page_path = Path("src/pages/Clinicians.tsx")
page = page_path.read_text()

hero = r'''        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[color:var(--cl-evergreen)]/20">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[color:var(--cl-ember)]/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--cl-evergreen)]/10 blur-3xl" />
          </div>
          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Now Recruiting Licensed Mental-Health Clinicians</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.03] tracking-tight md:text-6xl lg:text-7xl">
                Help build the clinic clinicians keep saying should exist.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/85 md:text-xl">
                Clear pay. Flexible availability. Billing support. Clinical judgment that still belongs to the clinician. And a veteran-focused mission you can help shape while the operating model is still being built.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA>Apply to Join ValorWell</PrimaryCTA>
                <SecondaryCTA to="/operation-claims-success">See the Veteran Mission</SecondaryCTA>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--cl-ink)]/65">
                Independently licensed clinicians only. Current direct-clinician structure is telehealth-first 1099 contract work. Caseload volume is not guaranteed.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-ink)] p-7 text-[color:var(--cl-canvas)] shadow-xl md:p-9">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">The Actual Deal</div>
                <dl className="mt-6 divide-y divide-[color:var(--cl-canvas)]/15 border-y border-[color:var(--cl-canvas)]/15">
                  {[
                    ["Current pay", "$75 per completed session"],
                    ["Pay cadence", "Weekly"],
                    ["Schedule", "You set availability"],
                    ["Structure", "1099 · Telehealth-first"],
                    ["Billing", "Handled by ValorWell"],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[1fr_auto] gap-5 py-5">
                      <dt className="text-sm font-semibold text-[color:var(--cl-canvas)]/65">{label}</dt>
                      <dd className="text-right text-base font-bold text-[color:var(--cl-canvas)] md:text-lg">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-[color:var(--cl-canvas)]/72">
                  You focus on care and timely documentation. ValorWell builds the operational support around the work.
                </p>
              </div>
            </aside>
          </div>
        </section>'''
page = replace_section(page, "        {/* HERO */}", "        {/* MOVEMENT / FOMO */}", hero)

recruiting_focus = r'''        {/* RECRUITING FOCUS */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>What Matters Before the Mission Pitch</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Meaningful work is not enough if the structure makes the work unsustainable.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/80 md:text-xl">
              Clinicians compare compensation, control, administrative burden, caseload reality, professional support, and whether the organization respects the license. So those answers should not be hidden behind a recruiter call.
            </p>

            <div className="mt-14 grid gap-px border border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)]/20 md:grid-cols-2 lg:grid-cols-3">
              {[
                ["Pay you can see", "$75 per completed session, paid weekly. The current rate is public before you apply."],
                ["A schedule you control", "Start with a few sessions or create more capacity as the work grows. You set realistic availability."],
                ["Less administrative drag", "ValorWell handles the billing workflow and builds scheduling, documentation, and telehealth tools around care."],
                ["Honest caseload expectations", "Demand varies by state and pathway. We will not promise a full caseload before the referrals exist."],
                ["Clinical support", "Get support from people who understand clinical care, veteran-specific issues, and ethical documentation."],
                ["A mission with substance", "Help veterans reach legitimate care without turning treatment or disability documentation into a transaction."],
              ].map(([title, body], index) => (
                <article key={title} className="bg-[color:var(--cl-canvas)] p-7 md:p-9">
                  <p className="text-xs font-bold text-[color:var(--cl-ember)]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-xl font-bold leading-tight md:text-2xl">{title}</h3>
                  <p className="mt-3 leading-relaxed text-[color:var(--cl-ink)]/75">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EARLY COHORT */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)] md:text-xs">The Early-Clinician Advantage</div>
                <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                  Join after the system is finished and you inherit it. Join during the build and you can influence it.
                </h2>
              </div>
              <p className="lg:col-span-4 text-lg leading-relaxed text-[color:var(--cl-canvas)]/78">
                The clinicians joining now have the strongest opportunity to shape the culture, workflows, documentation standards, and technology later clinicians will experience as established practice.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                ["Shape the tools", "Identify friction in the EHR, notes, calendar, telehealth, and scheduling while changes are still easier to make."],
                ["Shape the culture", "Help establish what clinician autonomy, accountability, support, and ethical documentation mean in practice."],
                ["Shape the mission", "Help build a legitimate care pathway for veterans before the network and standards become settled infrastructure."],
              ].map(([title, body]) => (
                <article key={title} className="border border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-canvas)]/5 p-7 md:p-9">
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-relaxed text-[color:var(--cl-canvas)]/75">{body}</p>
                </article>
              ))}
            </div>

            <p className="mt-12 max-w-4xl text-2xl font-bold leading-snug md:text-3xl">
              This is not artificial scarcity. It is the practical difference between helping write the standards and joining after they are written.
            </p>
          </div>
        </section>'''
page = replace_section(page, "        {/* MOVEMENT / FOMO */}", "        {/* MISSION */}", recruiting_focus)

terms = r'''        {/* PRACTICAL TERMS */}
        <section id="practical-terms" className="border-b border-[color:var(--cl-evergreen)]/20 scroll-mt-24">
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>Pay Without the Recruiting Fog</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Mission does not pay your bills. The structure still has to make sense.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/80">
              The examples below use the current $75 completed-session rate. They are gross contractor earnings before taxes and are not promises of referral volume.
            </p>

            <div className="mt-12 grid gap-10 lg:grid-cols-12">
              <dl className="border-t border-[color:var(--cl-evergreen)]/25 lg:col-span-7">
                {[
                  ["Pay per session", "$75 per completed session"],
                  ["Pay cadence", "Paid weekly"],
                  ["Schedule", "You set your availability"],
                  ["Caseload", "No guaranteed volume; grow as demand and fit align"],
                  ["Format", "Telehealth-first"],
                  ["Classification", "1099 contractor"],
                  ["Billing", "Billing workflow handled by ValorWell"],
                  ["Clinical scope", "You control the populations and concerns you accept"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-12 gap-5 border-b border-[color:var(--cl-evergreen)]/25 py-5">
                    <dt className="col-span-5 text-sm font-bold uppercase tracking-wider text-[color:var(--cl-evergreen)] md:col-span-4">{label}</dt>
                    <dd className="col-span-7 text-lg font-semibold md:col-span-8 md:text-xl">{value}</dd>
                  </div>
                ))}
              </dl>

              <aside className="bg-[color:var(--cl-ink)] p-7 text-[color:var(--cl-canvas)] lg:col-span-5 md:p-9">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">Current Rate Examples</div>
                <dl className="mt-6 divide-y divide-[color:var(--cl-canvas)]/15 border-y border-[color:var(--cl-canvas)]/15">
                  {[
                    ["5 sessions/week", "$375 gross/week"],
                    ["10 sessions/week", "$750 gross/week"],
                    ["15 sessions/week", "$1,125 gross/week"],
                    ["20 sessions/week", "$1,500 gross/week"],
                  ].map(([sessions, earnings]) => (
                    <div key={sessions} className="grid grid-cols-[1fr_auto] gap-4 py-5">
                      <dt className="text-[color:var(--cl-canvas)]/70">{sessions}</dt>
                      <dd className="font-bold">{earnings}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-[color:var(--cl-canvas)]/65">
                  The current contract rate applies to completed sessions. No specific weekly caseload is promised.
                </p>
              </aside>
            </div>
          </div>
        </section>'''
page = replace_section(page, "        {/* PRACTICAL TERMS */}", "        {/* APPLICATION HANDOFF */}", terms)

application = r'''        {/* APPLICATION HANDOFF */}
        <section id="raise-your-hand" className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)] scroll-mt-24">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)] md:text-xs">Raise Your Hand</div>
                <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                  The early clinician network is being assembled now.
                </h2>
                <div className="mt-7 space-y-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/80">
                  <p>Tell us where you are licensed, how much capacity you want to create, and what made this opportunity worth exploring.</p>
                  <p>You may apply to join ValorWell directly or to accept appropriate OCS referrals through your own independently VACCN-connected practice.</p>
                </div>
                <p className="mt-8 text-sm leading-relaxed text-[color:var(--cl-canvas)]/65">
                  Applications are reviewed for licensure, operational need, clinical scope, current state pathways, and mission fit. Submission is not automatic acceptance.
                </p>
              </div>

              <div id="clinician-application-slot" aria-label="Clinician application" className="lg:col-span-7">
                <TherapistApplicationForm />
              </div>
            </div>
          </div>
        </section>'''
page = replace_section(page, "        {/* APPLICATION HANDOFF */}", "        {/* WHAT HAPPENS NEXT */}", application)

page = page.replace(
    'title="Clinicians — For clinicians who still give a damn | ValorWell"',
    'title="Mental Health Clinician Opportunities — $75 per session"',
)
page = page.replace(
    'description="A telehealth-first clinician opportunity for licensed mental health professionals who are burned out on the system around the work — not the work itself. $75/session, 1099, paid weekly."',
    'description="Join ValorWell as a telehealth mental-health clinician. $75 per completed session, paid weekly, flexible availability, billing support, clinical autonomy, and an opportunity to help shape a veteran-focused care mission."',
)

page_path.write_text(page)

form_path = Path("src/components/forms/TherapistApplicationForm.tsx")
form = form_path.read_text()
form = form.replace(
    '''const WEEKLY_HOURS_OPTIONS = [
  "30+ hours a week",
  "20-30 hours a week",
  "10-20 hours a week",
  "Whenever I find time",
] as const;''',
    '''const WEEKLY_HOURS_OPTIONS = [
  "1-5 sessions per week",
  "6-10 sessions per week",
  "11-20 sessions per week",
  "20+ sessions per week",
] as const;''',
)
form = form.replace(
    '<CardTitle className="text-center text-2xl">Join Our Team</CardTitle>',
    '<CardTitle className="text-center text-2xl">Apply to Join the Clinician Network</CardTitle>',
)
block_start = form.index('        <div className="mb-8 rounded-lg border border-[color:var(--cl-evergreen)]/25')
block_end = form.index("\n\n        <form", block_start)
compact_block = r'''        <div className="mb-8 rounded-lg border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-canvas)] p-5">
          <h3 className="text-lg font-bold text-[color:var(--cl-ink)]">Choose the participation path that fits</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="border-l-4 border-[color:var(--cl-ember)] bg-white p-4">
              <p className="font-semibold text-[color:var(--cl-evergreen)]">Join ValorWell</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--cl-ink)]/75">Work as a telehealth-first 1099 clinician. ValorWell handles billing workflows and currently pays $75 per completed session, weekly.</p>
            </div>
            <div className="border-l-4 border-[color:var(--cl-evergreen)] bg-white p-4">
              <p className="font-semibold text-[color:var(--cl-evergreen)]">Accept OCS referrals through your practice</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--cl-ink)]/75">For independently licensed clinicians who already participate in VACCN, maintain their own practice, and handle their own VA billing.</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--cl-ink)]/70">Tell us which path interests you in the application. Outside referral providers follow ValorWell documentation standards and complete a proper assessment before supporting any DBQ or Nexus opinion.</p>
        </div>'''
form = form[:block_start] + compact_block + form[block_end:]
form = form.replace(
    '''                Why do you want to work with ValorWell, and which OCS provider
                path interests you? *''',
    '''                What are you looking for, and which clinician path interests you? *''',
)
form = form.replace(
    'placeholder="Tell us whether you want to join ValorWell, accept OCS referrals through your own VACCN-connected practice, or are open to either. Include your current VACCN status and your interest in serving veterans."',
    'placeholder="Tell us whether you want to join ValorWell, accept OCS referrals through your own VACCN-connected practice, or explore either path. Include your current VACCN status, the populations you serve, and what you want from the opportunity."',
)
form = form.replace(
    '<Label>How many hours per week can you commit? *</Label>',
    '<Label>How many sessions per week would you like to make available? *</Label>',
)
form_path.write_text(form)

seo_path = Path("src/components/SEO.tsx")
seo = seo_path.read_text()
seo = seo.replace(
    'description: "Join ValorWell as a licensed mental health clinician serving veterans and military families. Telehealth-first, CHAMPVA billing infrastructure in place. Seeking LCSWs, LPCs, LMFTs, and Psychologists.",',
    'description: "Join ValorWell as a licensed mental-health clinician serving veterans and military families. Telehealth-first 1099 work, $75 per completed session, weekly pay, flexible availability, billing support, and clinical autonomy.",',
)
seo = seo.replace('datePosted: "2026-01-01",', 'datePosted: "2026-07-19",')
seo = seo.replace(
    'responsibilities: "Provide telehealth therapy to veterans and military families. Work within CHAMPVA billing framework.",',
    'responsibilities: "Provide telehealth mental-health care within the clinician\'s license and scope, complete timely clinical documentation, and support veteran and military-family care pathways.",',
)
seo_path.write_text(seo)
