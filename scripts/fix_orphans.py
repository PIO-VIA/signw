from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
count = 0
for p in root.rglob("*.html"):
    t = p.read_text(encoding="utf-8")
    n = t.replace("\ufe0f", "")
    n = re.sub(r'<span style="font-size:\s*[^"]+">\s*</span>\s*', "", n)
    n = re.sub(r"️\s*", "", n)  # leftover if any
    if n != t:
        p.write_text(n, encoding="utf-8")
        count += 1
        print(p.relative_to(root))
print("fixed", count)
