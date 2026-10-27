from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
targets = list((root / "app").rglob("*.html")) + [
    root / "js" / "core" / "formrender.js",
    root / "js" / "core" / "formbuilder.js",
]

rx = re.compile(r"\s*border-top:\s*[^;\"']+;?", re.I)
count = 0
for p in targets:
    if not p.exists():
        continue
    t = p.read_text(encoding="utf-8")
    n = rx.sub("", t)
    n = re.sub(r'\sstyle=""', "", n)
    n = re.sub(r'style="\s*;\s*', 'style="', n)
    n = re.sub(r';\s*;\s*"', '"', n)
    if n != t:
        p.write_text(n, encoding="utf-8")
        count += 1
        print(p.relative_to(root))
print("updated", count)
