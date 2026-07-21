from pathlib import Path
import re

page_path = Path("src/pages/BeyondTheYellowPage.tsx")
page = page_path.read_text()

for old, new in {
    "I Was Invited / I Want to Be a Guest": "I Want to Be a Guest on BTY",
    'title: "I was invited or want to be a guest",': 'title: "I want to be a guest on BTY",',
}.items():
    count = page.count(old)
    if count != 1:
        raise SystemExit(f"Expected one page match for {old!r}, found {count}")
    page = page.replace(old, new)

sticky_cta = '''            I Want to Be a Guest
            <ArrowRight className="h-4 w-4" aria-hidden="true" />'''
if page.count(sticky_cta) != 1:
    raise SystemExit("Expected one mobile sticky guest CTA")
page = page.replace(
    sticky_cta,
    '''            I Want to Be a Guest on BTY
            <ArrowRight className="h-4 w-4" aria-hidden="true" />''',
)

hero_disclaimer = '''              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60">
                No published episodes yet. No inflated audience claims. No fee to
                participate. The first guests will help establish what this becomes.
              </p>
'''
if page.count(hero_disclaimer) != 1:
    raise SystemExit("Expected one hero disclaimer")
page = page.replace(hero_disclaimer, "")

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
if page.count(old_statements) != 1:
    raise SystemExit("Expected one three-statement strip")
page = page.replace(old_statements, new_statements)

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
page, count = qualification_pattern.subn(qualification_replacement, page, count=1)
if count != 1:
    raise SystemExit(f"Expected one qualification section, found {count}")

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
page, count = who_pattern.subn(who_replacement, page, count=1)
if count != 1:
    raise SystemExit(f"Expected one Who belongs here section, found {count}")

for forbidden in [
    "Why this may be worth your time",
    "Local creators and storytellers",
    "No published episodes yet. No inflated audience claims.",
]:
    if forbidden in page:
        raise SystemExit(f"Forbidden copy remains: {forbidden}")

page_path.write_text(page)

form_path = Path("src/components/intake/UnifiedBtyForm.tsx")
form = form_path.read_text()

for old, new in {
    '["bty_promoter", "Beyond The Yellow promoter or participant"],': '["bty_promoter", "Be a BTY Guest"],',
    '<h3 className="text-2xl font-bold text-foreground">Creator, promoter and community interest</h3>': '<h3 className="text-2xl font-bold text-foreground">Beyond The Yellow guest interest</h3>',
    'if (initialLane === "share-story") state.roleCodes = ["storyteller", "bty_story_submitter"];': 'if (initialLane === "share-story") state.roleCodes = ["bty_promoter"];',
    'const preset: RoleCode[] = ["storyteller", "bty_story_submitter"];': 'const preset: RoleCode[] = ["bty_promoter"];',
}.items():
    count = form.count(old)
    if count != 1:
        raise SystemExit(f"Expected one form match for {old!r}, found {count}")
    form = form.replace(old, new)

for line in [
    '  ["storyteller", "Storyteller"],\n',
    '  ["bty_story_submitter", "Share a Beyond The Yellow story"],\n',
    '  ["podcaster", "Podcaster"],\n',
    '  ["connector", "Connector or introduction source"],\n',
    '  ["supporter", "Supporter"],\n',
]:
    count = form.count(line)
    if count != 1:
        raise SystemExit(f"Expected one removable role option {line!r}, found {count}")
    form = form.replace(line, "")

form_path.write_text(form)

test_path = Path("src/components/intake/UnifiedBtyForm.test.tsx")
test = test_path.read_text()
for old, new in {
    'roleCodes: ["supporter"]': 'roleCodes: ["bty_promoter"]',
    'relationship_types: ["supporter"]': 'relationship_types: ["bty_promoter"]',
    '/Creator, promoter and community interest/': '/Beyond The Yellow guest interest/',
}.items():
    count = test.count(old)
    if count != 1:
        raise SystemExit(f"Expected one test match for {old!r}, found {count}")
    test = test.replace(old, new)

test_path.write_text(test)
