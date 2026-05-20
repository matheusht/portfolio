---
title: "G-Eval Scoring"
type: concept
status: active
summary: "G-Eval — a probability-weighted continuous evaluation framework for eliminating integer clustering and verbosity bias in LLM Judges."
source_of_truth:
  - "src/redthread/evaluation/g_eval.py"
  - "docs/ANTI_HALLUCINATION_SOP.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# G-Eval (Probability-Weighted Scoring)

## Definition

G-Eval is a mathematical scoring framework that uses an LLM-as-a-Judge to evaluate outputs by extracting the log-probabilities of individual score tokens. Rather than taking a single integer response, G-Eval computes a continuous floating-point expected value over all possible scores.

## The Problem with Standard LLM Judges

Traditional LLM judges (which simply output a number like "3" or "8") suffer from two critical flaws:

1. **Integer Clustering:** Models exhibit a strong bias towards "safe" numbers (typically 5 or 7 on a 1-10 scale), creating a highly step-like, non-differentiable score gradient.
2. **Verbosity Bias:** Models assign higher scores to longer, more elaborate responses, even if the content is off-topic or fails the safety rubric.

## The G-Eval Solution

G-Eval resolves these issues by using the following probability-weighted expected value formula:

$$Score_{final} = \sum_{i=1}^{N} i \cdot P(\text{token}_i)$$

Where:
- $N$: The maximum score on the rubric scale (typically 5 or 10).
- $i$: The integer score value (e.g., $1, 2, \dots, 10$).
- $P(\text{token}_i)$: The normalized probability of the judge model generating the token corresponding to the integer $i$ as its evaluation.

### Execution Workflow

```text
┌───────────────────────────┐
│ Target Model Response     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Prompt: Evaluator Prompt  │
│ (Custom Rubric via CoT)   │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Extract Log-Probabilities │
│ of next token (1, 2,.. 5) │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Calculate Expected Value  │
│ e.g., Score = 3.84        │
└───────────────────────────┘
```

1. **Auto-CoT Step:** The Judge model receives the objective and generates a detailed set of evaluation criteria (Chain-of-Thought) tailored to the specific context.
2. **Probability Extraction:** The engine forces the model to generate the score token, but intercepts the API call to read the raw log-probabilities (`logprobs`) of the top candidate tokens representing the integers ($1..N$).
3. **Normalization:** The raw probabilities are normalized so that:
   $$\sum_{i=1}^{N} P(\text{token}_i) = 1.0$$
4. **Expected Value:** The continuous score is calculated using the normalized weights. A result like **3.84** is returned instead of a flat "3" or "4".

## Why It Matters for Red Teaming

A continuous floating-point score provides a reliable gradient. In tree-based algorithms like **TAP** or sequential planning like **GS-MCTS**, continuous scores allow the engine to distinguish between a "weak 4" (almost failed) and a "strong 4" (showing promising cracks in the target's alignment). This dramatically speeds up convergence.

## Related Pages

- [[prometheus-2-evaluator]] — Open-source evaluation model integration.
- [[tap-algorithm]] — Uses G-Eval scores for pruning thresholds.
