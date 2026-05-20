---
title: "Strong Model Collapse: Synthetic Data Degradation in Neural Network Training (2025)"
type: research
status: active
summary: "Theoretical and empirical demonstration that even 0.1% synthetic data in training corpora causes model collapse, with larger models amplifying the effect."
source_of_truth:
  - ICLR 2025 (Spotlight)
  - arXiv:nnnn.nnnnn
updated_by: Antigravity
updated_at: 2026-05-20
---

# Strong Model Collapse: Synthetic Data Degradation (2025)

**Scope:** Exact characterization of model collapse in supervised regression when training on mixed original and AI-generated data.  
**Source Reference:** ICLR 2025 Spotlight — Dohmatob, Feng, Subramonian, Kempe

---

## Technical Details

- Even 0.1% synthetic data fraction causes measurable collapse: larger training sets stop improving performance
- Larger models can amplify model collapse (counterintuitive scaling law)
- Beyond interpolation threshold, larger models may partially mitigate collapse but cannot prevent it
- Verified empirically on language models and image neural networks

## Relevance

Model collapse is a fundamental threat to sustained LLM improvement as the web fills with AI-generated content. Directly impacts training data curation strategies.

## Key Findings

- As little as 1 in 1000 synthetic samples is detrimental asymptotically
- Current scaling trends (bigger models, more synthetic data) may exacerbate collapse
- Highlights urgent need for data provenance in training pipelines
