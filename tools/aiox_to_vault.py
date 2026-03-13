import os
import shutil
from datetime import date
from pathlib import Path

VAULT_INBOX = Path("C:/Users/Gabriel/personal-vault/00-Inbox/aiox-outputs")
AIOX_ROOT = Path("C:/Users/Gabriel/aiox-workspace")

SEARCH_DIRS = [
    "squads/research",
    "data",
    "knowledge-base",
]

def detect_client(content):
    content_lower = content.lower()
    if "fialho" in content_lower:
        return "fialho-motors"
    return "interno"

def has_frontmatter(content):
    return content.strip().startswith("---")

def add_frontmatter(filename, content):
    client = detect_client(content)
    today = date.today().strftime("%Y-%m-%d")
    title = filename.replace("-", " ").replace("_", " ").title()
    frontmatter = f"""---
title: "{title}"
type: research
category: market-research
client: {client}
tags:
  - research
  - client/{client}
date: {today}
status: draft
squad: aiox
author: ai-agent
up: "[[Research MOC]]"
---

"""
    return frontmatter + content

def run():
    VAULT_INBOX.mkdir(parents=True, exist_ok=True)
    processed = []

    for search_dir in SEARCH_DIRS:
        source_dir = AIOX_ROOT / search_dir
        if not source_dir.exists():
            continue
        for md_file in source_dir.rglob("*.md"):
            content = md_file.read_text(encoding="utf-8", errors="ignore")
            if not has_frontmatter(content):
                content = add_frontmatter(md_file.stem, content)
            dest = VAULT_INBOX / md_file.name
            dest.write_text(content, encoding="utf-8")
            processed.append(str(md_file))

    print(f"\n[OK] {len(processed)} arquivos processados:\n")
    for f in processed:
        print(f"  -> {f}")

if __name__ == "__main__":
    run()
