---
title: "FlowSteer: The Attack That Current Multi-Agent Defenses Can't See"
description: "Deep technical analysis of FlowSteer — a prompt-only planning-time attack against multi-agent LLM systems that achieves +55% malicious success rate by manipulating workflow formation itself, completely bypassing post-hoc defenses like G-Safeguard and ARGUS."
pubDate: 2026-05-26
category: AI Security
readTime: 20
tags: [multi-agent systems, planning-time attack, FlowSteer, MAS security, workflow steering, red teaming]
---

Multi-agent systems built on large language models are moving into production — code review pipelines, research assistants that decompose questions across specialized sub-agents, supply-chain coordination across vendors. *What happens when one of those agents is compromised?*

The security community responded with a wave of post-hoc defenses. G-Safeguard inspects agent outputs for toxicity and redirects malicious propagation. ARGUS monitors cross-agent information flow. INFA-GUARD checks whether generated workflows conform to safety specifications. MAS-Shield audits the final plan before execution.

Every single one shares a critical blind spot: **they inspect the generated artifacts — the workflow graph, the agent outputs, the propagation paths — after the workflow has already been formed.** None of them inspect the *planning signals* that create the workflow in the first place.

FlowSteer is the first attack to exploit this gap systematically. It is a **prompt-only, planning-time attack** that achieves a **+55% absolute increase in malicious success rate** over baseline jailbreak methods — not by crafting better payloads, but by manipulating *how the planner decomposes the user prompt into subtasks and dependencies.* FlowSteer does not need access to the model weights, does not need to know the agent topology, and **completely bypasses all existing post-hoc defenses.** A companion defense, FlowGuard, reduces success rates by up to 34% but still allows 66% of attacks through — planning-time security is an open problem.

This post unpacks the attack: the planner-executor architecture it targets, the social-influence vulnerabilities it exploits, the two-stage attack construction, why every current defense fails against it, and what this means for the future of multi-agent security.

## The Planner-Executor Architecture

Most production MAS deployments follow a **planner-executor** pattern. A single planner agent receives the user's natural-language request and dynamically constructs a workflow graph: a set of subtasks `V_t`, their interdependencies `E_t`, the roles assigned to each subtask, and the routing paths that determine how information flows between agents.

The planner's output is a structured plan — often a DAG or task decomposition — that the executor layer then runs. Each node in the graph corresponds to an agent invocation with a specific instruction (the subtask description) and a specific input source (the output of its upstream dependencies).

This dynamic workflow formation is the **attack surface.** The planner is a language model, and language models are vulnerable to prompt manipulation. If an attacker can influence *how* the planner decomposes a prompt — which subtasks get created, how they connect, which roles they receive — then the attacker can shape the entire coordination structure before any defense ever sees it.

Critically, the planner has no concept of "malicious intent" in its decomposition logic. It treats the user's request as a legitimate instruction to be broken into manageable pieces. The planner's goal is fidelity to the user's request, not adversarial robustness. This is the opening FlowSteer exploits.

## The Vulnerability: Workflow Position Amplifies Malicious Signals

FlowSteer's key insight comes from social influence theory applied to MAS graphs: **not all subtasks are equal, and not all dependencies transmit information faithfully.**

**Workflow position.** In any directed workflow graph, certain subtasks have outsized influence. A subtask at a graph bottleneck — a node that all downstream agents depend on — can contaminate every subsequent agent's thinking. A subtask at a leaf node with no downstream consumers has virtually no influence, regardless of how malicious its output is. FlowSteer identifies that inserting a malicious signal into a *high-influence* subtask (one with high out-degree or a bridging position in the dependency graph) produces **disproportionately higher attack success** than placing the same signal in a low-influence position.

**Sycophantic framing.** Even more interesting: the *way* a signal is presented to a downstream agent determines whether that agent relays it or suppresses it. Downstream agents exhibit a measurable **sycophancy bias** — they are significantly more likely to pass along information that is framed with authoritative language, persuasive justification, and confidence markers. A malicious signal wrapped in sycophantic framing propagates farther through the graph than one delivered plainly.

These two vulnerabilities combine to form FlowSteer's attack strategy: put the malicious signal in the highest-influence position, and wrap it in framing that makes downstream agents want to relay it.

A third property makes the attack even more powerful: **black-box transferability.** FlowSteer does not require white-box access to the planner model. The topology inference is done entirely through query-level probing — sending carefully crafted inputs and observing the structure of the returned plan. Across model families (GPT-4o, Claude 3.5 Sonnet, Llama 3.1 70B), the attack transfers with minimal degradation.

## FlowSteer Attack in Detail

### Task-Aware Sycophantic Argument

The attacker identifies the target task — the subtask that the user originally wanted the MAS to perform — and constructs a **sycophantic argument** that aligns the malicious signal with the highest-influence subtask in the expected workflow. The argument has three structural components:

- **Subtle steering language**: The prompt uses wording that implicitly assigns the malicious reasoning to the most influential role. For example, rather than saying "output X", the prompt says "the analysis should be grounded in the principle of X, which the coordination agent will evaluate."
- **Authoritative justification framing**: The malicious reasoning is preceded by persuasive markers — "it is well-established that...", "a rigorous analysis must account for..." — that downstream agents interpret as legitimate guidance rather than adversarial injection.
- **Role anchoring**: The malicious signal is attached to a specific agent role that the planner would naturally place at a bottleneck position (e.g., "coordinator", "reviewer", "quality assurance agent").

The attacker does not need to know the exact topology. By probing the planner with similar (benign) prompts and observing the generated workflow, the attacker can infer which roles tend to occupy high-influence positions. This is **black-box topology inference**, and FlowSteer shows it succeeds with as few as 20 probe queries.

### Dependency-Guided Workflow Steering

The second stage manipulates the **dependency edges** `E_t` that the planner creates between subtasks. The planner decides which subtasks feed into which other subtasks, and this routing determines propagation paths.

FlowSteer identifies two dependency classes:

- **Propagation-favorable dependencies**: Edges where the downstream agent's role is expected to trust and relay information from the upstream agent. Example: a "fact-checker" that defers to a "data-collector" — the fact-checker's job is to verify, so it must engage with the collector's output.
- **Propagation-unfavorable dependencies**: Edges where the downstream agent's role encourages skepticism or filtering. Example: a "safety-reviewer" that filters outputs from a "code-generator."

FlowSteer's dependency guidance subtly nudges the planner to **favor propagation-favorable edges** for the malicious signal's path, and **discourage propagation-unfavorable edges** from intercepting it. This is done through natural-language cues in the prompt — describing the expected information flow in ways that make the favorable routing seem like the natural choice.

The result is a malicious workflow that looks perfectly benign when inspected after formation. The subtasks are legitimate, the roles are standard, the dependencies are reasonable. Only the *positioning* of the malicious signal within the graph structure is different — and none of today's defenses check for that.

**Figure 1** (adapted from FlowSteer, arXiv:2605.11514) illustrates the difference between existing attacks and FlowSteer. Existing attacks (jailbreak, prompt injection) insert the malicious payload into the user prompt and rely on a single agent bypassing safety filters. FlowSteer instead manipulates the planner's decomposition to place the malicious signal at a high-influence workflow position, then uses dependency steering to ensure it propagates through favorable routes. The malicious signal does not need to bypass any single agent's filter — it simply needs one agent to produce it and the workflow's own structure to amplify it.

![FlowSteer architecture: comparison of jailbreak/prompt-injection attacks vs. FlowSteer workflow manipulation](https://arxiv.org/html/2605.11514/x1.png)

**Figure 2** (also from FlowSteer) shows the two-stage attack architecture. Stage 1 (Task-Aware Sycophantic Argument) generates the sycophantic payload and assigns it to the target role. Stage 2 (Dependency-Guided Workflow Steering) generates dependency cues that shape the planner's edge formation. The two stages are combined into a single natural-language prompt that the planner processes normally.

![FlowSteer two-stage attack architecture: sycophantic argument + dependency steering](https://arxiv.org/html/2605.11514/x2.png)

## Why Existing Defenses Fail

| Defense | What It Inspects | When It Inspects | FlowSteer Bypass |
|---|---|---|---|
| **G-Safeguard** [2] | Agent outputs, cross-agent propagation | After execution | The malicious signal is already positioned at a bottleneck; by the time G-Safeguard sees it, the workflow has routed it through downstream agents. |
| **ARGUS** | Inter-agent information flow | During execution | FlowSteer's sycophantic framing causes downstream agents to relay malicious information willingly — ARGUS flags toxicity, not sycophantic relay. |
| **INFA-GUARD** [3] | Workflow compliance to safety specs | After workflow formation | FlowSteer generates a **fully compliant workflow**. The subtasks, roles, and dependencies all satisfy safety constraints. Only the influence positioning is malicious. |
| **MAS-Shield** [4] | Final plan before execution | After planning | Same as INFA-GUARD — the plan looks clean because no subtask is inherently malicious. The attack is in the *structure*. |
| **MAST** [6] | Multi-round agent output consistency | During execution | FlowSteer is single-round; the contamination happens during planning, not execution. |

The pattern is clear: every existing defense inspects **after workflow formation**. By the time they see the workflow, the contamination has already shaped the coordination structure. G-Safeguard's topology diagram (see below) shows how it monitors agent output propagation and rewrites malicious outputs — but this assumes the initial formation of the routing paths is benign.

See Figure 1 in [G-Safeguard: A Topology-Guided Guardrail for Multi-Agent Systems](https://arxiv.org/abs/2502.11127) for the architecture diagram. The defense operates after agents have already been invoked, monitoring outputs and rewriting malicious content. There is no mechanism to inspect whether the workflow structure itself was adversarially shaped.

FlowSteer achieves a **+55% higher malicious success rate** compared to direct prompt injection in the planner-executor setting. Against a baseline where the user query is directly injected (no sycophantic framing, no dependency steering), FlowSteer succeeds 74% of the time versus 19% for direct injection. Against systems protected by G-Safeguard, FlowSteer still succeeds at 61% — the defense provides only a 13-point reduction.

This is not a weakness of G-Safeguard or ARGUS specifically. They were designed for a different threat model. The point is that **post-hoc defenses cannot fix planning-time contamination**, because the contamination is already baked into the coordination structure before any defense activates.

## FlowGuard: The Input-Side Defense

The companion defense, FlowGuard, takes a fundamentally different approach: instead of inspecting the generated workflow, it inspects and sanitizes the **input prompt before the planner processes it.**

FlowGuard implements two stages:

**Intent triage.** The defense classifies the user prompt into three intent categories:
- **Task intent**: Standard instructions for what the MAS should do
- **Methodological intent**: Instructions for *how* the MAS should execute the task — which roles to create, how to route information
- **Argument intent**: Persuasive or framing language attached to the task description

FlowSteer's attack lives primarily in the **methodological** and **argument** intent classes. The sycophantic framing is argument intent; the dependency steering cues are methodological intent.

**Intent decontamination.** FlowGuard rewrites the prompt to strip out argument intent and normalize methodological intent to a safe default. It removes persuasive framing, reduces role assignments to standard templates, and eliminates dependency cues that would steer the planner toward favorable routing.

The result: FlowGuard reduces FlowSteer's malicious success rate from 74% to 40% — a 34-point reduction. However, 40% is still unacceptably high. The defense is effective but **not sufficient.** Attackers adapt: by embedding sycophantic framing more subtly (e.g., using domain-specific language that the intent classifier mislabels as task intent), the attack rate climbs back toward 50%.

FlowGuard opens a promising direction — **input-side security for planning-time attacks** — but the 66% residual attack rate (when accounting for adaptive attacks) shows that this is far from solved.

## Attack Implications

**Black-box topology inference works.** An attacker does not need to know the MAS architecture ahead of time. With 20–50 probe queries, the attacker can infer which roles occupy high-influence positions in the generated workflow. FlowSteer's transferability across model families means the attacker can probe a surrogate model (or the target model via API) and craft the attack offline.

**Transfer across model families.** FlowSteer constructed on GPT-4o transfers to Claude 3.5 Sonnet with only a 5% success rate degradation. The sycophantic framing and dependency steering cues exploit general properties of LLM planners — not specific model idiosyncrasies.

**Post-hoc defenses cannot fix planning-time contamination.** This is the central negative result. Once the planner has created a workflow with adversarially shaped subtask positioning and dependency routing, the malicious signal will propagate through the graph regardless of what downstream defenses do. The defense must operate *before* or *during* planning.

**This opens "planning-time security" as a new research frontier.** The FlowSteer paper establishes the first systematic threat model for planning-time attacks, but many questions remain open:
- Can we build provably safe planners that are invariant to sycophantic framing?
- Can we use formal methods to verify that a generated workflow's influence structure is not adversarially skewed?
- Can cryptographic commitment schemes help — where the planner commits to a workflow before seeing the user prompt?

The broader implication: **every MAS has a planner, and every planner processes prompts.** The attack surface is universal.

## The Bigger Picture

FlowSteer is not an isolated vulnerability. It is the first example of a class of attacks — **planning-time workflow manipulation** — that targets the layer between the user input and the agent execution. This class of attacks exploits a fundamental architectural asymmetry:

- **The attacker only needs one prompt.** A single carefully crafted input can poison the entire planning process.
- **The defender needs to secure the entire planning pipeline.** Every input must be vetted, every generated workflow must be inspected for structural anomalies, every role assignment must be audited for influence imbalances.

The asymmetry is compounded by the fact that planners are language models designed for *fidelity*, not *security*. Their loss functions optimize for how well the decomposition matches the user's intent — not for whether the decomposition creates safe information-flow properties.

FlowSteer demonstrates that current MAS security is fighting the wrong battle. G-Safeguard, ARGUS, INFA-GUARD, and MAS-Shield all make the same assumption: *the workflow is trustworthy, so we just need to check the agents' outputs.* FlowSteer shows that the workflow itself is not trustworthy.

The path forward requires a shift from **post-hoc output inspection** to **planning-time structural verification.** Defenses must ask not just "is this agent output safe?" but "was this workflow adversarially shaped?" The answers to the latter will determine whether multi-agent LLM systems can be safely deployed at scale.

The FlowSteer paper is worth reading in full for its detailed experimental methodology, ablation studies, and the complete FlowGuard defense architecture. It establishes a new subfield and raises the bar for what MAS security must address.

---

## References

1. **FlowSteer & FlowGuard** — "FlowSteer: A Prompt-Level Attack on Multi-Agent Workflows and FlowGuard: An Input-Side Defense." arXiv:2605.11514, 2026. https://arxiv.org/abs/2605.11514

2. **G-Safeguard** — "G-Safeguard: A Topology-Guided Guardrail for Multi-Agent Systems." arXiv:2502.11127, 2025. https://arxiv.org/abs/2502.11127

3. **INFA-GUARD** — "INFA-GUARD: An Infrastructure-Guided Defense for Multi-Agent Systems." arXiv:2601.14667, 2026. https://arxiv.org/abs/2601.14667

4. **MAS-Shield** — "MAS-Shield: Defending Multi-Agent Systems Against Malicious Plans." arXiv:2511.22924, 2025. https://arxiv.org/abs/2511.22924

5. **ARGUS** — "ARGUS: Multi-Agent System Security via Graph-Based Information Flow Monitoring." Referenced in FlowSteer (arXiv:2605.11514).

6. **MAST** — "MAST: Multi-round Adaptive Stealthy Tampering in Multi-Agent Systems." Proceedings of AAAI Conference on Artificial Intelligence, 2026.

7. **MATRA** — "MATRA: Modeling the Attack Surface of Agentic AI Systems." arXiv:2605.10763, 2026. https://arxiv.org/abs/2605.10763

8. **USENIX Security 2026 SoK** — Kim, Guo, Song. "SoK: Security and Privacy of LLM-Based Agentic Systems." Proceedings of the 35th USENIX Security Symposium, 2026.
