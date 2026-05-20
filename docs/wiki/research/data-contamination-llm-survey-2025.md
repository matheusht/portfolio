---
title: "A Survey on Data Contamination for Large Language Models (2025)"
type: research
status: active
summary: "Comprehensive survey of data contamination in LLMs covering definition, impacts, contamination-free evaluation methods, and detection approaches."
source_of_truth:
  - arXiv:2502.14425
updated_by: Antigravity
updated_at: 2026-05-20
---

# A Survey on Data Contamination for Large Language Models (2025)

**Scope:** Definition, detection, and mitigation of benchmark contamination across the LLM lifecycle.  
**Source Reference:** arXiv:2502.14425

---

## Technical Details

- Three evaluation strategies: data updating, data rewriting, prevention-based methods
- Contamination detection categorized by model information dependency: White-Box, Gray-Box, Black-Box
- Highlights dynamic benchmarks and LLM-driven evaluation as contamination-resistant approaches
- Analyzes root causes across data collection, architecture design, and inference

## Relevance

Benchmark contamination undermines every red team evaluation and safety benchmark in the field. Understanding detection and mitigation is essential for trustworthy assessment.

## Key Findings

- Static benchmarks are increasingly unreliable due to training data overlap
- Dynamic benchmarks (frequent refresh, procedural generation) are the primary defensive approach
- No single detection method is sufficient — multi-layered contamination screening is required
