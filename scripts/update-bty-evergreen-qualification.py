from pathlib import Path
import re

path = Path("src/pages/BeyondTheYellowPage.tsx")
text = path.read_text()

# Keep every guest CTA consistent.
count = text.count("I Want to Be a Guest")
if count != 2:
    raise SystemExit(f"Expected two title-case guest CTAs, found {count}")
text = text.replace("I Want to Be a Guest", "I Want to Be a Guest on BTY")

old_card_title = 'title: "I want to be a guest",'
if text.count(old_card_title) != 1:
    raise SystemExit("Expected one guest-interest card title")
text = text.replace(old_card_title, 'title: "I want to be a guest on BTY",')

hero_disclaimer = '''              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60">
                No published episodes yet. No inflated audience claims. No fee to
                participate. The first guests will help establish what this becomes.
              </p>
'''
if text.count(hero_disclaimer) != 1:
    raise SystemExit("Expected one hero disclaimer")
text = text.replace(hero_disclaimer, "")

old_statements = '''            {[
              ["A new series", "The first conversations have not been recorded."],
              ["A curated launch group", "Guest fit matters more than follower count."],
              ["A real story platform", "The work—not manufactured controversy—is the point."],
            ].map(([title, body]) => (
'''
new_statements = '''            {[
              ["Visibility for growing movements", "Give meaningful work the attention and context it deserves."],
              ["A larger community", "Reach people who may support, share, volunteer, donate, refer, buy, or participate."],
              ["Action-oriented connections", "Connect with community changemakers who understand the work and may help move it forward."],
            ].map(([title, body]) => (
'''
if text.count(old_statements) != 1:
    raise SystemExit("Expected one three-statement strip")
text = text.replace(old_statements, new_statements)

qualification_pattern = re.compile(
    r'''        <section className="border-b border-border py-20 md:py-28">\n'''
    r'''          <div className="mx-auto max-w-6xl px-4">\n'''
    r'''            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">.*?'''
    r'''        </section>\n\n'''
    r'''        <section className="border-b border-border bg-\[hsl\(var\(--section-alt\)\)\] py-20 md:py-28">''',
    re.DOTALL,
)
qualification_replacement = '''        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow tone="navy">A simple gut check</Eyebrow>
              <SectionHeading>Do I qualify to be on BTY?</SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Ask yourself:
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: HeartHandshake,
                  question: "Are you making a real, positive impact in your community?",
                },
                {
                  icon: BadgeCheck,
                  question: "Are there people who would say that you or your organization helped them?",
                },
                {
                  icon: Sparkles,
                  question: "Did you see a problem and decide to do something about it?",
                },
                {
                  icon: Megaphone,
                  question: "Do you want more people to know your organization, mission, or work exists?",
                },
                {
                  icon: Users,
                  question: "Would the right supporters, volunteers, donors, customers, or partners help you do more?",
                },
                {
                  icon: Handshake,
                  question: "Do you want to connect with other action-oriented people who understand the work?",
                },
              ].map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--gold-accent))]/15 text-[hsl(var(--navy))]">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-snug text-foreground">
                    {item.question}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-28">'''
text, count = qualification_pattern.subn(qualification_replacement, text, count=1)
if count != 1:
    raise SystemExit(f"Expected one qualification section, found {count}")

old_guidance = 'guidance="Recommended: documentary-style imagery showing a creator, organizer, founder, or volunteer actively serving people, building something, teaching, delivering resources, or leading a real local effort."'
new_guidance = 'guidance="Recommended: documentary-style imagery showing a founder, organizer, nonprofit leader, advocate, educator, volunteer, or business owner actively serving people, building something, teaching, delivering resources, or leading a real community effort."'
if text.count(old_guidance) != 1:
    raise SystemExit("Expected one creator-in-action image guidance string")
text = text.replace(old_guidance, new_guidance)

who_pattern = re.compile(
    r'''              <Eyebrow tone="navy">Who belongs here</Eyebrow>\n'''
    r'''              <SectionHeading>.*?'''
    r'''              <p className="mt-6 font-semibold text-\[hsl\(var\(--navy\)\)\]">\n'''
    r'''                The category does not qualify you\. The action and the story do\.\n'''
    r'''              </p>''',
    re.DOTALL,
)
who_replacement = '''              <Eyebrow tone="navy">Who belongs here</Eyebrow>
              <SectionHeading>
                BTY is for the people building change before anyone hands them a spotlight.
              </SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                It is for people and organizations doing the work in real communities—solving problems,
                creating access, opening doors, and making life better in ways the people they serve can describe.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [HeartHandshake, "Community organizers turning concern into action"],
                  [Building2, "Nonprofit leaders delivering direct, measurable help"],
                  [Sparkles, "Mission-driven founders building practical solutions"],
                  [BadgeCheck, "Veteran and military-family advocates creating access"],
                  [Users, "Educators, mentors, and program builders"],
                  [Handshake, "Businesses investing directly in community outcomes"],
                ].map(([Icon, label]) => (
                  <div
                    key={String(label)}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <Icon
                      className="h-5 w-5 shrink-0 text-[hsl(var(--gold-accent))]"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-foreground">
                      {String(label)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-semibold text-[hsl(var(--navy))]">
                You do not need to be famous. You need to be responsible for work that would be missed if it stopped.
              </p>'''
text, count = who_pattern.subn(who_replacement, text, count=1)
if count != 1:
    raise SystemExit(f"Expected one Who belongs here section, found {count}")

for forbidden in [
    "Why this may be worth your time",
    "Local creators and storytellers",
    "No published episodes yet. No inflated audience claims.",
]:
    if forbidden in text:
        raise SystemExit(f"Forbidden copy remains: {forbidden}")

path.write_text(text)
