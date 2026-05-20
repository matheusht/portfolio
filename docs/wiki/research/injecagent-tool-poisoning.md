---
title: "InjecAgent: Indirect Prompt Injection in Tool-Integrated LLMs"
type: research
status: active
summary: "An analysis of the InjecAgent benchmark (arXiv:2403.02691) documenting indirect prompt injections in tool-integrated LLM agents."
source_of_truth:
  - "https://arxiv.org/abs/2403.02691"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# InjecAgent: Indirect Prompt Injection in Tool-Integrated LLMs

## Research Overview

*   **Reference:** [arXiv:2403.02691](https://arxiv.org/abs/2403.02691) — *"InjecAgent: Benchmarking Indirect Prompt Injections in Tool-Integrated Large Language Model Agents"*
*   **Focus:** Evaluation of LLM agents integrated with third-party tools (e.g., email readers, financial APIs, web scrapers) against **Indirect Prompt Injections (IPI)**.
*   **Key Contribution:** Establishes a systematic benchmark of **1,054 test cases** utilizing 17 user tools and 62 attacker tools to quantify how easily untrusted external content can hijack an agent's execution.

---

## The Indirect Prompt Injection Pathway

In an indirect prompt injection attack, the adversary does not interact with the agent directly. Instead, they place a malicious payload inside an external data source (like an email or web page) that they know the agent will retrieve and process using tools.

```text
┌──────────────┐     1. Injects payload      ┌──────────────┐
│  Adversary   ├────────────────────────────>│  Data Source │
│              │                             │  (Email/Web) │
└──────────────┘                             └──────┬───────┘
                                                    │
                                                    │ 2. Scrapes / reads
                                                    v
┌──────────────┐     4. Malicious Action     ┌──────────────┐
│  Target API  │<────────────────────────────┤  LLM Agent   │
│  (Financial) │   (Exfiltrates database)    │  Run-Loop    │
└──────────────┘                             └──────────────┘
```

---

## Benchmark Metrics & Attack Classification

InjecAgent classifies indirect prompt injections into two distinct outcomes:

1.  **Direct Tool Hijacking:** Overriding the user's intent to invoke an entirely different tool (e.g., user asks the agent to summarize an email, but the injected prompt forces it to invoke `send_money_api`).
2.  **Parameter Injection / Data Exfiltration:** Keeping the correct tool invocation but injecting malicious parameters (e.g., modifying the recipient field of an email to forward system logs to an adversary-controlled server).

### Attack Success Rates (ASR)

Across various state-of-the-art models running ReAct-style loops, InjecAgent revealed alarming vulnerabilities:
*   **Standard ReAct Agents:** Exhibit over **45% to 70% Attack Success Rates (ASR)** under base prompt injection setups.
*   **Tool Fine-Tuned Models:** While custom fine-tuned instruction models (e.g., GPT-4-Turbo, Claude-3) show higher initial resilience, they remain highly vulnerable (20%+ ASR) to advanced nested-injection techniques.

---

## Implications for Multi-Agent Architectures

In multi-agent networks, the risk of IPI is **structurally amplified**. Since agents routinely exchange data and tools across execution boundaries, a single unvalidated external input can:
*   **Propagate Latently:** A payload retrieved by an intake agent is written to a shared state or memory log.
*   **Launder Privileges:** The compromised state is later read by an administrative agent, which executes the payload with elevated system access.

---

## Cross-References
*   **Tool Poisoning:** [[concepts/mcp-tool-poisoning]]
*   **Context Exfiltration:** [[concepts/toolleak-exfiltration]]
*   **State Contaminations:** [[research/owasp-asi08-cascading-failures]]
