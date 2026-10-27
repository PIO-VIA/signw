"""Pass DA: retire emojis courants, calme btn-gold CTAs."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent

EMOJI_RE = re.compile(
    "["
    "\U0001F300-\U0001F9FF"
    "\U00002700-\U000027BF"
    "\U00002600-\U000026FF"
    "\U0001F600-\U0001F64F"
    "\U0001F680-\U0001F6FF"
    "\U0001FA00-\U0001FAFF"
    "]+",
    flags=re.UNICODE,
)

REPLACEMENTS = [
    ("⚡ COMPTES DE DÉMONSTRATION", "Comptes de démonstration"),
    ("COMPTES DE DÉMONSTRATION", "Comptes de démonstration"),
    ("ACTION URGENTE : ", ""),
    ("btn btn-gold btn-lg", "btn btn-primary"),
    ("btn btn-gold btn-sm", "btn btn-primary btn-sm"),
    ('class="btn btn-gold"', 'class="btn btn-primary"'),
    ("btn-gold w-full", "btn-primary w-full"),
    ("font-weight: 800", "font-weight: 700"),
    ("Plus+Jakarta+Sans:wght@700;800", "Plus+Jakarta+Sans:wght@600;700"),
    ("background: #FFF9E6; border: 1.5px solid #F39C12", "background: var(--ink-50); border: 1px solid var(--ink-200)"),
    ("border: 2px solid #F39C12", "border: 1px solid #F0D9A8"),
]


def clean_text(text: str) -> str:
    for a, b in REPLACEMENTS:
        text = text.replace(a, b)

    out = []
    for line in text.splitlines(keepends=True):
        # Preserve sector icon pickers / value attributes with emoji
        if "selectSectorIcon" in line or "ns-icon" in line or re.search(r'value="[^"]*[\U0001F300-\U0001FAFF]', line):
            out.append(line)
            continue
        cleaned = EMOJI_RE.sub("", line)
        cleaned = re.sub(r"([^\S\n]*?)\s{2,}([^\s])", r"\1 \2", cleaned)
        out.append(cleaned)
    return "".join(out)


count = 0
for p in root.rglob("*.html"):
    if any(x in p.parts for x in (".git", "assets", "node_modules")):
        continue
    original = p.read_text(encoding="utf-8")
    updated = clean_text(original)
    if updated != original:
        p.write_text(updated, encoding="utf-8")
        count += 1
        print(p.relative_to(root))

print("CLEANED", count)
