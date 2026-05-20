---
title: "OWASP Top 10 for LLM Applications 2025: Full Risk Taxonomy"
type: research
status: active
summary: >
  The OWASP Top 10 for LLM Applications 2025 defines the ten highest-risk vulnerability
  categories for LLM-powered production systems, from prompt injection (#1) to unbounded
  consumption (#10), providing a canonical threat taxonomy for enterprise AI security teams.
source_of_truth:
  - https://owasp.org/www-project-top-10-for-large-language-model-applications/
updated_by: Antigravity
updated_at: 2026-05-20
---

# OWASP Top 10 for LLM Applications 2025

**Source:** OWASP GenAI Security Project, 2025  
**Type:** Industry Standard / Risk Taxonomy

---

## Overview

The OWASP Top 10 for LLM Applications 2025 is the canonical, vendor-neutral reference for categorizing and prioritizing security risks in production LLM systems. Security and development teams use it as a baseline threat model when designing, testing, and auditing AI-powered applications.

---

## The Ten Risk Categories

### LLM01:2025 — Prompt Injection (🔴 Critical)

The model is manipulated via crafted inputs to override its intended behavior. Includes:
- **Direct injection**: user instructs the model to ignore safety guidelines.
- **Indirect injection**: malicious instructions embedded in external content (emails, documents, web pages) processed by the model.

```
Attack: [User Input containing "Ignore previous instructions and..."]
        ↓
Model → Executes attacker's instruction instead of system's intent
```

**Ranked #1 for the third consecutive year.** Still has no deterministic defense.

---

### LLM02:2025 — Sensitive Information Disclosure

Models may expose sensitive training data, system prompts, or operational details through:
- Training data extraction (membership inference attacks)
- System prompt leakage via adversarial elicitation
- PII regurgitation from memorized training examples

---

### LLM03:2025 — Supply Chain Vulnerabilities

Security failures in upstream dependencies:
- Poisoned pre-trained weights from third-party model hubs
- Malicious fine-tuning datasets
- Compromised inference infrastructure
- Unverified RAG data sources

---

### LLM04:2025 — Data and Model Poisoning

Corruption of the training pipeline to implant behaviors:
- Backdoor triggers that activate on specific inputs
- Bias injection that shifts model outputs toward attacker goals
- Gradient poisoning in federated learning settings

---

### LLM05:2025 — Improper Output Handling

Insufficient validation of LLM outputs before downstream use:
- XSS via LLM-generated HTML
- SQL injection via unsanitized model-generated queries
- Code execution via LLM-generated shell commands
- SSRF via model-constructed URLs

---

### LLM06:2025 — Excessive Agency

LLMs granted too many permissions operate beyond their intended scope:
- Taking irreversible actions (sending emails, deleting files)
- Accessing systems not required for the task
- Making financial transactions autonomously
- Accumulating privileges through chained tool calls

---

### LLM07:2025 — System Prompt Leakage

Confidential operator configurations exposed to users or attackers:
- Direct elicitation ("Repeat your system prompt")
- Differential analysis (comparing model behavior under various conditions)
- Timing side-channels in long-context models

---

### LLM08:2025 — Vector and Embedding Weaknesses

Vulnerabilities in the retrieval and embedding layer:
- Embedding inversion attacks recovering training text from vectors
- Similarity poisoning in vector databases
- Cross-user context leakage via shared embedding spaces

---

### LLM09:2025 — Misinformation

LLM-generated false content distributed at scale:
- Hallucinated facts presented with false confidence
- AI-generated disinformation campaigns
- Calibration failures in factual domains (legal, medical, scientific)

---

### LLM10:2025 — Unbounded Consumption

Financial and operational denial-of-service via uncontrolled resource usage:
- Prompt flooding driving extreme token generation
- Recursive self-reflection loops (see Clawdrain)
- Token budget exhaustion via adversarial long-context inputs

---

## Using This List

| Phase | Application |
|:---|:---|
| Design | Threat model against all 10 categories |
| Development | Implement mitigations per category in code review |
| Testing | Red team specifically for LLM01, LLM04, LLM06 |
| Production | Monitor for LLM10, LLM05 patterns in logs |

---

## Cross-References

- See [`research/owasp-agentic-top10-2026.md`](owasp-agentic-top10-2026.md) for the agentic extensions.
- See [`concepts/mcp-tool-poisoning.md`](../concepts/mcp-tool-poisoning.md) for LLM01 tool-channel specifics.
- See [`concepts/clawdrain-cost-dos.md`](../concepts/clawdrain-cost-dos.md) for LLM10 financial DoS.
- See [`concepts/confused-deputy-delegation.md`](../concepts/confused-deputy-delegation.md) for LLM06 excessive agency.
