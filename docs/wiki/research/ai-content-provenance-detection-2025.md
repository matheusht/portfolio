---
title: "Provenance Detection for AI-Generated Images: Combining Perceptual Hashing, Homomorphic Encryption, and AI Detection Models (2025)"
type: research
status: active
summary: "Three-part framework for secure, transformation-resilient AI content provenance detection using DinoHash perceptual hashing, multi-party FHE, and AI content detection."
source_of_truth:
  - arXiv:2503.11195
updated_by: Antigravity
updated_at: 2026-05-20
---

# Provenance Detection for AI-Generated Images (2025)

**Scope:** Secure provenance detection framework combining adversarial perceptual hashing, homomorphic encryption, and AI-generated media classification.  
**Source Reference:** arXiv:2503.11195

---

## Technical Details

- **DinoHash**: Adversarially robust perceptual hashing model derived from DINOv2, resilient to filters, compression, and crops — 12% bit accuracy improvement over SOTA watermarking
- **Multi-Party Fully Homomorphic Encryption (MP-FHE)**: Protects query and registry privacy during provenance lookups
- **AI Detection Model**: 25% classification accuracy improvement on real-world AI image generators
- Addresses limitations of conventional watermarking (vulnerable to transformations, re-watermarking of open-source models)

## Relevance

Content provenance is a critical defensive countermeasure against AI-generated disinformation. This work bridges perceptual hashing and cryptographic privacy for verifiable content lineage.

## Key Findings

- DinoHash maintains superior TPR/FPR tradeoffs across common social media transformations
- Combined framework provides better robustness and privacy than prior watermark-only approaches
- Enables source attribution even when content is absent from registry (via detection model fallback)
