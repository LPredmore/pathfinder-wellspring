from pathlib import Path

path = Path("src/components/intake/UnifiedBtyForm.test.tsx")
text = path.read_text()

replacements = {
    'roleCodes: ["supporter"]': 'roleCodes: ["bty_promoter"]',
    'relationship_types: ["supporter"]': 'relationship_types: ["bty_promoter"]',
    '/Creator, promoter and community interest/': '/Beyond The Yellow guest interest/',
}

for old, new in replacements.items():
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"Expected one test match for {old!r}, found {count}")
    text = text.replace(old, new)

path.write_text(text)
