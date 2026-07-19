from pathlib import Path

path = Path("src/pages/Clinicians.tsx")
text = path.read_text()

replacements = {
'''const Rule = () => (
  <div className="h-px w-full bg-[color:var(--cl-evergreen)]/25" />
);

''': '',
'''    q: "What license types are currently included?",
    a: "We are currently onboarding common independent clinical licenses across mental health disciplines. If you are licensed to treat in a way that insurance will accept, we can use you.",''': '''    q: "What license types are currently included?",
    a: "We currently consider independently licensed psychologists, clinical social workers, professional counselors, mental health counselors, and marriage and family therapists, subject to state licensure, payer requirements, clinical scope, and current network need.",''',
'''  {
    q: "What license types are currently included?",''': '''  {
    q: "Do I need prior experience working with veterans?",
    a: "Veteran-specific experience is valuable but is not the only factor we consider. ValorWell provides education on military culture, veteran-specific mental-health issues, ethical VA documentation, and the reasons service-related conditions may be missing from military treatment records.",
  },
  {
    q: "What license types are currently included?",''',
'''                    "You decide which patients you see. No push-back",
                    "Complete support by a team of clinicians, not admins",''': '''                    "You decide which patients you see. No pushback.",
                    "Support from a team that understands clinical care.",''',
'''                  d: "State and national boards already decided you're qualified. We trust their judgment more than a manager's. Your calls stay your calls.",''': '''                  d: "Your independent license and clinical judgment are respected. Clinical decisions remain yours within your scope, professional standards, payer requirements, and collaborative quality review.",''',
'''                  d: "You provide the care. We handle everything sitting between you and the person in front of you.",''': '''                  d: "You provide the care. ValorWell builds the billing, scheduling, documentation, telehealth, and operational workflows intended to reduce the friction around it.",''',
'''                  key={m.n}''': '''                  key={m.t}''',
'''                  <div className="text-2xl font-bold text-[color:var(--cl-ember)] tabular-nums">
                    {m.n}
                  </div>
''': '',
'''                  d: 'Type in plain language after session — "client came in dysregulated, we worked on grounding, homework was..." — and the system converts it into a fully compliant, clinically appropriate note. You edit. You don\'t author from scratch.',''': '''                  d: 'Enter a plain-language clinical summary after session and the system creates a structured note draft aligned with the chart workflow. You remain responsible for reviewing, editing, and signing the final documentation.',''',
'''                  d: "Your real calendar and ValorWell stay in lockstep — both directions, always current, PHI protected. Block personal time once and your availability updates without you touching it.",''': '''                  d: "Your external calendar and ValorWell can stay synchronized in both directions while limiting exposed clinical information. Block personal time once and your availability can update without duplicate calendar work.",''',
}

for old, new in replacements.items():
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"Expected one match, found {count}: {old[:80]!r}")
    text = text.replace(old, new)

path.write_text(text)
