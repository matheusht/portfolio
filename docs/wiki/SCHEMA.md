# Portfolio LLM Wiki Schema

This document defines the taxonomy, structure, metadata standards, and workflows for Matheus's personal AI Safety, Red Teaming, and Security Knowledge Base. It implements Andrej Karpathy's `llm-wiki` design pattern ("compile once, keep current").

## Directory Structure

All files are structured inside `/Users/matheusvsky/Documents/personal/portfolio/docs/wiki/` as follows:

```text
wiki/
  ├── index.md (Master navigation index)
  ├── log.md (Chronological append-only ledger)
  ├── SCHEMA.md (This rules page)
  ├── concepts/ (Reusable algorithms and theoretical attack/defense concepts)
  ├── entities/ (Named actors, tools, and system components)
  ├── systems/ (Cross-cutting architectural overviews and integrations)
  ├── research/ (Exploratory topic analyses and state assessments)
  ├── decisions/ (Design justifications and status tracking)
  └── timelines/ (Evolutionary milestones and records)
```

## Core Principles (from Karpathy's `llm-wiki`)

1. **Persistent Synthesis Layer:** Avoid flat, stateless retrieval (standard RAG). Compile knowledge once into interlinked markdown pages and keep them current.
2. **LLM-Maintained, Human-Guided:** The LLM does the bookkeeping (links, frontmatter, log, and index updates). The human provides judgment, sources, and verification.
3. **No Placeholders:** Pages must be fully realized with complete definitions, equations, and flows. Stubs are prohibited.
4. **Stable kebab-case:** All filenames must be lowercase, hyphen-separated, and descriptive (e.g., `concepts/pair-algorithm.md`).

## Required Frontmatter

Every wiki page must begin with a YAML block conforming to this template:

```yaml
---
title: "Title of the Page"
type: concept | entity | system | research | decision | timeline
status: active | proposed | superseded
summary: "A concise one-line summary of what this page explains."
source_of_truth:
  - "docs/relative/path/to/source.md"
  - "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
updated_by: "Antigravity"
updated_at: 2026-05-20
---
```

## Operation Workflows

### 1. Ingest Loop (Triage-First)
- **Step 1:** Read the raw source completely.
- **Step 2:** Check existing wiki files to avoid duplicate creation.
- **Step 3:** Determine affected directories (`concepts/`, `systems/`, etc.).
- **Step 4:** Write/update files, including frontmatter and cross-links.
- **Step 5:** Update `index.md` and append a entry to `log.md`.

### 2. Lint and Dream Cycle
- Periodically check for:
  - Missing frontmatter fields.
  - Orphan pages (no incoming links).
  - Outdated `source_of_truth` refs.
  - Semantic contradictions across pages.
