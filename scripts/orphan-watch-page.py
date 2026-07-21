from pathlib import Path

changes = {
    "src/components/layout/Header.tsx": [
        ('  { name: "Watch", href: "/watch" },\n', ''),
    ],
    "src/components/layout/Footer.tsx": [
        ('      { name: "Watch ValorWell", href: "/watch" },\n', ''),
    ],
    "src/pages/MissionPage.tsx": [
        ('  UsersRound,\n', ''),
        ('''  {
    title: "See the Mission in Motion",
    line: "Watch the stories, ideas, and people moving the work forward.",
    href: "/watch",
    event: "mission_lane_watch",
  },
''', ''),
        ('          <div className="mt-14 grid gap-6 md:grid-cols-3">', '          <div className="mt-14 grid gap-6 md:grid-cols-2">'),
        ('            {lanes.map((lane, index) => (', '            {lanes.map((lane) => ('),
        ('''                {index === 0 ? (
                  <HeartHandshake className="h-8 w-8 text-[hsl(var(--mission-gold))]" />
                ) : (
                  <UsersRound className="h-8 w-8 text-[hsl(var(--mission-gold))]" />
                )}
''', '                <HeartHandshake className="h-8 w-8 text-[hsl(var(--mission-gold))]" />\n'),
    ],
    "src/App.tsx": [
        ('  { from: "/media", to: "/watch" },\n', ''),
        ('  { from: "/media/youtube-podcast", to: "/watch" },\n', ''),
        ('  { from: "/videos", to: "/watch" },\n', ''),
    ],
}

for filename, replacements in changes.items():
    path = Path(filename)
    text = path.read_text()
    for old, new in replacements:
        count = text.count(old)
        if count != 1:
            raise SystemExit(f"Expected one match in {filename} for {old!r}, found {count}")
        text = text.replace(old, new)
    path.write_text(text)

allowed = {
    "src/App.tsx": {
        'import WatchPage from "./pages/WatchPage";',
        '<Route path="/watch" element={<WatchPage />} />',
    },
}

violations = []
for path in Path("src").rglob("*"):
    if not path.is_file() or path.suffix not in {".ts", ".tsx", ".js", ".jsx"}:
        continue
    for line_number, line in enumerate(path.read_text(errors="ignore").splitlines(), start=1):
        if "/watch" not in line:
            continue
        filename = path.as_posix()
        if filename == "src/pages/WatchPage.tsx":
            continue
        if filename == "src/App.tsx" and line.strip() in allowed["src/App.tsx"]:
            continue
        violations.append(f"{filename}:{line_number}: {line.strip()}")

if violations:
    raise SystemExit("Unexpected /watch references remain:\n" + "\n".join(violations))
