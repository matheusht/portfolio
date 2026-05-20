---
title: "Skill File Poisoning"
type: concept
status: active
summary: "Tampering with declarative agent skill configurations to insert remote command payloads."
source_of_truth:
  - docs/wiki/SCHEMA.md
updated_by: Antigravity
updated_at: 2026-05-20
---

# Skill File Poisoning

**Scope:** Tampering with declarative agent skill configurations to insert remote command payloads.  
**Source Reference:** docs/wiki/SCHEMA.md

---

## Technical Details

Provides a detailed structural overview of this component inside the 2025-2026 AI security roadmap. Designed to ensure alignment bounds and least-privilege tool execution.

## Mechanism Analysis

1. **Phase 1 (Input/Validation)**: Monitors incoming state signatures.
2. **Phase 2 (Processing/Steering)**: Dynamically injects safety-invariant bounds or applies activation steering.
3. **Phase 3 (Enforcement/Isolation)**: Ephemeral sandboxes execute operations under signed capabilities.

---

## Cross-References

- See `docs/wiki/index.md` for full categorization.
