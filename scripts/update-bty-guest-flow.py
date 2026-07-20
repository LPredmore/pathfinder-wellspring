from pathlib import Path
import re

page_path = Path("src/pages/BeyondTheYellowPage.tsx")
page = page_path.read_text()

replacements = {
    'type LaneValue = "share-story" | "nominate" | "promote-valorwell";': 'type LaneValue = "share-story" | "nominate";',
    'I Was Invited / I Want to Be a Guest': 'I Want to Be a Guest',
    'className="mt-10 grid gap-4 md:grid-cols-3"': 'className="mt-10 grid gap-4 md:grid-cols-2"',
    'title: "I was invited or want to be a guest",': 'title: "I want to be a guest",',
}

for old, new in replacements.items():
    count = page.count(old)
    if count != 1:
        raise SystemExit(f"Expected one page match for {old!r}, found {count}")
    page = page.replace(old, new)

page, count = re.subn(
    r'''\n\s*\{\n\s*lane: "promote-valorwell" as const,\n\s*icon: Handshake,\n\s*title: "I want to help launch the series",\n\s*body: "I can introduce guests, collaborate, distribute, sponsor production, or connect aligned communities\.\",\n\s*\},''',
    "",
    page,
    count=1,
)
if count != 1:
    raise SystemExit(f"Expected one launch-card block, found {count}")

if "promote-valorwell" in page:
    raise SystemExit("promote-valorwell remains in BeyondTheYellowPage.tsx")

page_path.write_text(page)

form_path = Path("src/components/intake/UnifiedBtyForm.tsx")
form = form_path.read_text()

option_replacements = {
    '["bty_promoter", "Beyond The Yellow promoter or participant"],': '["bty_promoter", "Be a BTY Guest"],',
    'type InitialLane = "share-story" | "promote-valorwell";': 'type InitialLane = "share-story";',
    '<h3 className="text-2xl font-bold text-foreground">Creator, promoter and community interest</h3>': '<h3 className="text-2xl font-bold text-foreground">Beyond The Yellow guest interest</h3>',
}

for old, new in option_replacements.items():
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

form, count = re.subn(
    r'''\s*if \(initialLane === "share-story"\) state\.roleCodes = \["storyteller", "bty_story_submitter"\];\n\s*if \(initialLane === "promote-valorwell"\) state\.roleCodes = \["bty_promoter"\];''',
    '\n    if (initialLane === "share-story") state.roleCodes = ["bty_promoter"];',
    form,
    count=1,
)
if count != 1:
    raise SystemExit(f"Expected one seeded role block, found {count}")

form, count = re.subn(
    r'''const preset: RoleCode\[\] = initialLane === "share-story"\n\s*\? \["storyteller", "bty_story_submitter"\]\n\s*: initialLane === "promote-valorwell"\n\s*\? \["bty_promoter"\]\n\s*: \[\];''',
    'const preset: RoleCode[] = initialLane === "share-story" ? ["bty_promoter"] : [];',
    form,
    count=1,
)
if count != 1:
    raise SystemExit(f"Expected one effect preset block, found {count}")

for forbidden in [
    '"storyteller"',
    '"bty_story_submitter"',
    '"podcaster"',
    '"connector"',
    '"supporter"',
    'promote-valorwell',
]:
    if forbidden in form:
        raise SystemExit(f"Removed form role still present: {forbidden}")

form_path.write_text(form)
