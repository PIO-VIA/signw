from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent

# Remove inline border-left styles from HTML (cards / callouts / timelines)
patterns = [
    # style="... border-left: Npx solid ...; ..."
    (re.compile(r'\s*border-left:\s*[^;"]+;?', re.I), ""),
    # leftover double spaces / empty style attrs cleaned lightly
]

count = 0
for p in root.rglob("*.html"):
    t = p.read_text(encoding="utf-8")
    n = t
    for rx, repl in patterns:
        n = rx.sub(repl, n)
    # tidy empty style=""
    n = re.sub(r'\sstyle=""', "", n)
    n = re.sub(r'style="\s*;\s*', 'style="', n)
    n = re.sub(r';\s*;\s*"', '"', n)
    n = re.sub(r';\s{2,}', "; ", n)
    if n != t:
        p.write_text(n, encoding="utf-8")
        count += 1
        print(p.relative_to(root))

print("updated", count)
