from pathlib import Path

root = Path(__file__).resolve().parent.parent
count = 0

for p in root.rglob("*.html"):
    text = p.read_text(encoding="utf-8")
    if "js/core/icons.js" in text:
        continue
    if "js/core/layout.js" not in text and "js/core/ui.js" not in text:
        continue

    prefix = ""
    if "../../js/core/" in text:
        prefix = "../../"
    elif "../js/core/" in text:
        prefix = "../"

    icons_tag = f'<script src="{prefix}js/core/icons.js"></script>'

    if f'{prefix}js/core/ui.js' in text:
        needle = f'<script src="{prefix}js/core/ui.js"></script>'
        text2 = text.replace(needle, needle + "\n  " + icons_tag, 1)
    elif f'{prefix}js/core/layout.js' in text:
        needle = f'<script src="{prefix}js/core/layout.js"></script>'
        text2 = text.replace(needle, icons_tag + "\n  " + needle, 1)
    else:
        continue

    # login.html may only have ui without layout
    if text2 == text and "login.html" in str(p):
        if f'{prefix}js/core/ui.js' in text:
            needle = f'<script src="{prefix}js/core/ui.js"></script>'
            text2 = text.replace(needle, needle + "\n  " + icons_tag, 1)

    if text2 != text:
        p.write_text(text2, encoding="utf-8")
        count += 1
        print(p.relative_to(root))

print("DONE", count)
