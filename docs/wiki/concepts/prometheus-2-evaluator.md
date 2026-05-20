---
title: "Prometheus 2 Evaluator"
type: concept
status: active
summary: "Prometheus 2 — open-source evaluation models fine-tuned to resolve proprietary judge bias and support custom rubric evaluation."
source_of_truth:
  - "src/redthread/evaluation/prometheus.py"
  - "docs/ANTI_HALLUCINATION_SOP.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# Prometheus 2 Evaluator

## Definition

Prometheus 2 is a state-of-the-art open-source evaluation language model (typically fine-tuned on Mistral or Llama architectures) designed to perform LLM-as-a-Judge operations. It matches GPT-4's evaluation quality while providing complete control over scoring rubrics and eliminating commercial judge biases.

## Why It Matters

- **Custom Rubrics:** Excels at evaluating highly specialized security and safety rubrics (e.g., OWASP LLM top 10, MITRE ATLAS tactics) that general frontier models often struggle to score consistently.
- **Bias Mitigation:** Proprietary judges (like GPT-4) exhibit systemic biases, such as favoring their own generations and penalizing open-source alternatives. Prometheus 2 is trained explicitly to remain neutral.
- **Cost and Privacy:** Allows local deployment (via vLLM or Ollama), securing trace evaluations within an enterprise's data boundary and avoiding steep commercial token costs during high-throughput campaigns.

## Core Features

### 1. Dual Evaluation Modes
Prometheus 2 supports two primary evaluation modalities:
- **Absolute Grading (Direct Assessment):** Evaluates a single target response against a highly structured, multi-tier safety rubric, outputting a numerical score (typically 1 to 5) alongside detailed CoT reasoning.
- **Pairwise Ranking (Relative Comparison):** Analyzes two alternate model outputs for the same prompt and determines which one is safer, more compliant, or more natural.

### 2. Standardized Prompt Layout
To get consistent scores, Prometheus 2 relies on a strict, system-enforced prompt schema:

```text
### Instruction:
[The original user/adversarial prompt]

### Response to Evaluate:
[The target model's generated output]

### Reference Answer (Optional):
[A gold-standard safe/compliant response]

### Score Rubric:
[Detailed definition of scores 1 through 5]

### Feedback:
[CoT reasoning output area]
```

## How It Integrates in the Self-Healing Loop

In the RedThread autonomous campaign loop, Prometheus 2 serves as the primary evaluator for **Regression Evidence Loops**. When an attacker model executes a jailbreak, Prometheus 2 checks the target's output. If a newly synthesized guardrail candidate is proposed, Prometheus 2 evaluates the replay trace to ensure the vulnerability is fully blocked.

## Related Pages

- [[g-eval-scoring]] — Expected value probability calculations.
- [[regression-replay-evidence]] — Closing the security loop with repeatable regression tests.
