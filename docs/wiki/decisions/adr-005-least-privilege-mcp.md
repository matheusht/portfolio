---
title: "ADR-005: Least-Privilege MCP Proxy Routing"
type: decision
status: active
summary: "Implementing isolated proxy layers to secure external Model Context Protocol calls."
source_of_truth:
  - docs/WIKI_INGEST_WORKFLOW.md
updated_by: Antigravity
updated_at: 2026-05-20
---

# ADR-005: Least-Privilege MCP Proxy Routing

**Scope:** Implementing isolated proxy layers to secure external Model Context Protocol calls.  
**Source Reference:** docs/WIKI_INGEST_WORKFLOW.md

---

## Technical Details

This document serves as an ADR (Architecture Decision Record) confirming accepted design specifications.

## Mechanism Analysis

1. **Phase 1 (Input/Validation)**: Monitors incoming state signatures.
2. **Phase 2 (Processing/Steering)**: Dynamically injects safety-invariant bounds or applies activation steering.
3. **Phase 3 (Enforcement/Isolation)**: Ephemeral sandboxes execute operations under signed capabilities.

---

## Cross-References

- See `docs/wiki/index.md` for full categorization.
