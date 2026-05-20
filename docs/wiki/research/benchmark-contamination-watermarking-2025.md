---
title: "Detecting Benchmark Contamination Through Watermarking (2025)"
type: research
status: active
summary: "Novel approach to detecting benchmark contamination by watermarking test sets before release and detecting radioactivity in trained models."
source_of_truth:
  - arXiv:2502.17259
updated_by: Antigravity
updated_at: 2026-05-20
---

# Detecting Benchmark Contamination Through Watermarking (2025)

**Scope:** Proactive contamination detection by embedding watermarks in benchmark datasets and testing for model memorization.  
**Source Reference:** arXiv:2502.17259

---

## Technical Details

- Watermarks embedded by reformulating benchmark questions with a watermarked LLM
- Detection via "radioactivity" — traces watermarks leave in model weights during training
- Theoretically grounded statistical test for contamination detection
- Validated on 1B models pre-trained from scratch on 10B tokens with controlled contamination

## Relevance

Proactive watermarking of benchmarks enables definitive contamination detection, addressing a critical weakness in LLM evaluation integrity.

## Key Findings

- Successfully detects contamination when models are contaminated enough to enhance performance
- p-value = 10^{-3} for +5% performance boost on ARC-Easy
- Benchmark utility preserved post-watermarking
