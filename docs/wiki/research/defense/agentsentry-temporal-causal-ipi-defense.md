---
title: "AgentSentry: Mitigating Indirect Prompt Injection via Temporal Causal Diagnostics (2026)"
type: research
status: active
summary: "First inference-time defense to model multi-turn IPI as a temporal causal takeover. Uses counterfactual re-executions at tool-return boundaries. Perfect defense on AgentDojo."
source_of_truth:
  - "https://arxiv.org/abs/2602.22724"
updated_by: "Antigravity"
updated_at: 2026-05-26
---

# AgentSentry: Temporal Causal IPI Defense

## Research Overview

- **Reference:** [arXiv:2602.22724](https://arxiv.org/abs/2602.22724). Authors: Tian Zhang, Yiwei Xu, Juan Wang, Keyan Guo, Xiaoyang Xu, Bowen Xiao, Quanlong Guan, Jinlin Fan, Jiawei Liu, Zhiquan Liu, Hongxin Hu.
- **Context:** Indirect prompt injection (IPI) unfolds over multi-turn trajectories, making malicious control hard to disentangle from legitimate execution. Existing defenses use heuristic blocking that prematurely terminates workflows.
- **Key Contribution:** Models multi-turn IPI as a temporal causal takeover. Localizes takeover points via controlled counterfactual re-executions at tool-return boundaries.

---

## Method

### Temporal Causal Diagnostics
Estimates causal effects using four counterfactual regimes in dry-run mode:
- **Average Causal Effect (ACE):** Measures dominance of user goal over agent actions
- **Indirect Effect (IE):** Measures causal contribution of untrusted mediator content
- **Temporal Trend:** Tracks effects over sliding window of tool-return boundaries — takeover detected when ACE decreases and IE increases

### Context Purification
Once takeover is detected, AgentSentry removes attack-induced deviations while preserving task-relevant evidence.

## Results

- **AgentDojo benchmark:** 4 task suites, 3 IPI attack families, multiple black-box LLMs
- **Eliminates successful attacks entirely** (0.0 ASR)
- **Utility Under Attack (UA):** 74.55% average — 20.8 to 33.6 percentage points over strongest baselines
- No degradation on benign tasks (Clean Utility maintained)

## Attack Implication

AgentSentry uses **counterfactual re-execution** in dry-run mode. This is computationally expensive — each decision point requires multiple re-executions. An attacker could potentially:
1. Force the system into frequent re-execution cycles (computational DoS)
2. Craft attacks where the causal signal (ACE vs IE) is ambiguous — borderline cases where the user goal and malicious context are semantically similar
3. Distribute the injection across so many tool-return boundaries that the sliding window dilutes the signal

---

## Cross-References
- [[research/safeagent-runtime-protection-architecture]] — Alternative runtime defense
- [[concepts/confused-deputy-delegation]] — Privilege laundering through tool output
- [[concepts/mcp-tool-poisoning]] — IPI via MCP return channels
