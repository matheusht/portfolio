---
title: "Large Language Models Hallucination: A Comprehensive Survey (2025)"
type: research
status: active
summary: "Systematic taxonomy of hallucination types, root causes across the LLM lifecycle, detection methods, mitigation strategies, and evaluation benchmarks."
source_of_truth:
  - arXiv:2510.06265
updated_by: Antigravity
updated_at: 2026-05-20
---

# Large Language Models Hallucination: A Comprehensive Survey (2025)

**Scope:** Full-spectrum survey of hallucination causes, detection, and mitigation across data collection, architecture, and inference.  
**Source Reference:** arXiv:2510.06265

---

## Technical Details

- Taxonomy of hallucination types: intrinsic (input-conflicting), extrinsic (fact-conflicting), and context-conflicting
- Root cause analysis across data, architecture, training, and inference phases
- Structured detection taxonomy: uncertainty-based, consistency-based, retrieval-based, and fact-checking approaches
- Mitigation taxonomy: prompt engineering, RAG, fine-tuning, architecture modifications, and hybrid methods

## Relevance

Hallucination is the single largest barrier to reliable LLM deployment in production. This survey provides a unified reference for understanding and addressing the problem.

## Key Findings

- Hallucination emerges from multiple interacting causes — no single mitigation suffices
- Detection methods show complementary strengths across hallucination types
- RAG reduces but does not eliminate hallucination, especially for parametric knowledge conflicts
- Evaluation benchmarks remain fragmented and lack standardization
