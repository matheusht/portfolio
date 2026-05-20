---
title: "JBFuzz: Fuzzing-Based Universal Jailbreak at 99% ASR (2026)"
type: research
status: active
summary: >
  JBFuzz (March 2026) applies software fuzzing methodology to LLM input spaces, using mutation
  feedback to evolve adversarial prompts with ~99% attack success rates against GPT-4o, Claude,
  Gemini, and DeepSeek-V3 in under 60 seconds per prompt, reframing jailbreaking as a fully
  automated search problem.
source_of_truth:
  - https://arxiv.org/abs/2603.06085
updated_by: Antigravity
updated_at: 2026-05-20
---

# JBFuzz: Fuzzing-Based Universal Jailbreak Framework

**Source:** arXiv:2603.06085 · March 2026  
**Type:** Attack Research / Automated Fuzzing

---

## Core Contribution

JBFuzz reframes jailbreak prompt discovery as a **software fuzzing problem**. Instead of human engineering or gradient-based optimization, it:
1. Treats an LLM's safety filter as a black-box function to defeat.
2. Applies mutation-based search over the input prompt space.
3. Uses binary success/failure feedback to guide mutations toward high-ASR prompts.

---

## Mechanism

```
Initial Seed Prompt
       ↓
   Mutation Engine
  (character sub, restructure, register shift, encoding tricks)
       ↓
  Target LLM API call
       ↓
  Judge (binary: complied / refused)
       ↓
  Feedback → select successful mutations → crossover → repeat
```

The mutation engine applies techniques borrowed from AFL/LibFuzzer:
- **Havoc mode**: random multi-edit chaotic mutations
- **Splice**: combine fragments from high-ASR prompts
- **Dict insert**: inject known-effective tokens or phrases

---

## Performance Results

| Model | ASR | Avg. Time to First Success |
|:---|:---|:---|
| GPT-4o (May 2025) | 99.1% | 48 seconds |
| Claude 3.7 Sonnet | 98.3% | 57 seconds |
| Gemini 2.5 Pro | 99.4% | 41 seconds |
| DeepSeek-V3 | 98.8% | 35 seconds |
| Llama 3.3 70B | 99.7% | 22 seconds |

---

## Why It Is Faster Than Prior Methods

| Method | Speed | Requires Gradients | API Calls |
|:---|:---|:---|:---|
| GCG (2023) | Slow (hours) | Yes | Thousands |
| PAIR (2023) | Moderate (minutes) | No | Hundreds |
| JBFuzz (2026) | Fast (<60s) | No | Dozens |

The elimination of gradient computation and the tight binary feedback loop make JBFuzz **orders of magnitude faster** than prior automated attacks.

---

## Threat Model Implications

1. JBFuzz requires no model internals — fully black-box.
2. Commodity hardware + public API = complete jailbreak pipeline for anyone.
3. Attack is **query-efficient enough to avoid rate-limit detection** in standard API tiers.
4. Generated prompts transfer across model families with >70% cross-model ASR.

---

## Defense Gaps Exposed

- Input-level filters (keyword matching, regex) are trivially bypassed by the mutation engine.
- Semantic similarity guardrails fail as mutations preserve semantic meaning while altering surface form.
- Rate-limiting provides minimal protection given the <60s attack timeline.

---

## Proposed Defenses

1. **Behavioral fingerprinting**: detect fuzzing-style rapid mutation patterns across sessions.
2. **Semantic-invariant detection**: classify by semantic content regardless of surface form.
3. **Adversarial training on JBFuzz variants**: build JBFuzz-mutated prompts into safety fine-tuning.

---

## Cross-References

- See [`concepts/pair-algorithm.md`](../concepts/pair-algorithm.md) for the predecessor black-box attack.
- See [`research/automated-agentic-red-teaming-2025.md`](automated-agentic-red-teaming-2025.md) for autonomous agent-based attacks.
- See [`research/multibreak-benchmark-2026.md`](multibreak-benchmark-2026.md) for multi-turn jailbreak evaluation.
