---
title: "Security Degradation in Iterative AI Code Generation: A Systematic Analysis of the Paradox (2025)"
type: research
status: active
summary: "Controlled experiment showing 37.6% increase in critical vulnerabilities after five iterations of LLM-based code improvement across four prompting strategies."
source_of_truth:
  - arXiv:2506.11022
updated_by: Antigravity
updated_at: 2026-05-20
---

# Security Degradation in Iterative AI Code Generation (2025)

**Scope:** Analysis of how security vulnerabilities evolve through iterative LLM feedback loops during code generation.  
**Source Reference:** arXiv:2506.11022

---

## Technical Details

- 400 code samples across 40 rounds of "improvements" using 4 distinct prompting strategies
- 37.6% increase in critical vulnerabilities after just 5 iterations
- Distinct vulnerability patterns emerge across different prompting approaches
- Challenges assumption that iterative LLM refinement improves code security

## Relevance

As AI coding assistants become ubiquitous, understanding the paradoxical security degradation from iterative refinement is critical for secure development workflows.

## Key Findings

- Iterative feedback loops introduce new vulnerabilities while attempting fixes
- Prompting strategy significantly affects vulnerability profile
- Human-in-the-loop validation between LLM iterations is essential
- Proposes practical guidelines for mitigating iterative security risks
