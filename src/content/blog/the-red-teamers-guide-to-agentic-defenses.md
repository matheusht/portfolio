---
title: "The Red Teamer's Guide to Agentic Defenses: 12 Systems and Where They Break"
description: "A technical survey of every major agentic defense system published in 2025-2026 — SafeAgent, AgentSentry, CoopGuard, Constitutional Classifiers, RvB, FlowGuard, SHIELD, DynaTrust, TrajGuard, AegisLLM, Stable Agentic Control, and PocketAgents — with an attacker's perspective on each."
pubDate: 2026-05-26
category: AI Security
readTime: 25
tags: [agentic security, red teaming, defense systems, guardrails, runtime protection, LLM security]
---

Between January 2025 and May 2026, the research community released at least twelve distinct agentic defense systems. Each claims state-of-the-art attack success rate reductions. Each introduces novel architectural patterns. Each carves out a slightly different threat model.

The field has moved beyond naive "just-prompt-better" guardrails. We now see formal verification (Lean 4 proofs), game-theoretic multi-agent audits, temporal causal diagnostics, and production-grade classifiers trained on actual adversary-in-the-loop data. But complexity is the attacker's friend. Every new layer of defense introduces a new interface, a new trust assumption, a new side channel.

This post surveys every major agentic defense system published in 2025-2026, organized into a taxonomy, analyzed from the attacker's perspective. Where does it break? What assumptions does an adversary violate? Where are the seams between defenses?

## The Defense Stack Taxonomy

No single defense covers the full attack surface. The systems we surveyed fall into five layers, each targeting a different phase of the agentic attack lifecycle:

| Layer | Systems | Threat Model Coverage |
|-------|---------|----------------------|
| **Runtime Governance** | SafeAgent, AgentSentry, PocketAgents | In-flight tool calls, execution-time injection |
| **Cooperative Multi-Agent** | CoopGuard, AegisLLM, RvB | Collusion, deception, multi-agent manipulation |
| **Formal Verification** | Stable Agentic Control | Action safety bounds, provable invariants |
| **Guardrails & Detection** | Constitutional Classifiers v2, TrajGuard, SHIELD | Input/output policy violations, trajectory anomalies |
| **MAS-Specific** | DynaTrust, FlowGuard | Trust evolution, inter-agent message integrity |

There are also emergent architecture efforts — specifically Microsoft's defense-in-depth framework for autonomous agents and the Open Agent Trust Stack (OATS) specification — that attempt to standardize how these layers compose. We'll reference both throughout.

## Deep Dive: Runtime Governance Layer

### SafeAgent

SafeAgent introduces a two-component architecture: a **Reasoning Core** (the LLM) and a **Decision Core** (a separate, hardened module that validates the Reasoning Core's action proposals before execution). The key insight is separation of concerns — the Reasoning Core proposes actions freely, but only the Decision Core authorizes tool calls.

**Results**: SafeAgent achieves a 0.0% attack success rate on InjecAgent, the standard indirect prompt injection benchmark for agent tool calls. This is the strongest published result against known injection attacks.

**Architecture**: The Decision Core maintains a whitelist of allowed tool call schemas, validates parameter types and ranges, and applies a separate safety LLM to assess whether the proposed action violates policy. The Reasoning Core never directly invokes tools — it produces a structured action proposal that the Decision Core parses, validates, and either executes or rejects.

**Attack Implications**: The Decision Core is itself an LLM. This means it is vulnerable to:
- **Adversarial action proposals**: If the attacker can craft an action proposal that passes the Decision Core's policy filter while achieving malicious intent, the defense collapses. The Decision Core's safety LLM must be at least as capable as the attacker's jailbreak techniques.
- **Side-channel leakage**: The Decision Core's validation responses may leak information about why an action was rejected, giving attackers a feedback signal for iterative refinement.
- **Decision Core compromise**: If the attacker gains access to the Decision Core's policy configuration (e.g., via a poisoned tool that reads config files), the entire defense disintegrates.

SafeAgent's 0.0% ASR is impressive, but it's measured against known benchmarks. Zero-day injection techniques that target the Decision Core itself are not yet captured.

### AgentSentry

AgentSentry takes a fundamentally different approach: **temporal causal diagnostics**. Instead of inspecting individual actions, AgentSentry constructs a causal graph of the agent's execution trace and identifies anomalous causal pathways.

**Architecture**: AgentSentry maintains a knowledge base of "normal" causal patterns — sequences of observations, reasoning steps, and tool calls that constitute benign agent behavior. When an agent executes, AgentSentry:
1. Logs the full execution trace as a causal DAG
2. Compares each step to historical normal patterns
3. Identifies "counterfactual inconsistencies" — points where the observed action diverges from what the causal model predicts

**Key capability**: **Counterfactual re-execution**. When AgentSentry flags a suspicious action, it can re-execute that action in a sandboxed environment under different inputs to determine whether the action's outcome was adversarially influenced.

**Attack Implications**:
- **Temporal resolution**: AgentSentry's causal diagnostics depend on dense logging. If an attacker can operate in low-log-frequency windows (e.g., rapid-fire tool calls that overflow the log buffer), they may evade detection.
- **Counterfactual cost**: Counterfactual re-execution is computationally expensive. An attacker can mount a computational DoS by triggering enough flags to exhaust the sandbox budget, allowing subsequent undetected actions to slip through.
- **Causal model poisoning**: If AgentSentry's baseline causal model is trained on logs that include historical attacks (false negatives), the model learns to treat certain attack patterns as "normal." Causal model poisoning is an underexplored attack vector.

### PocketAgents

PocketAgents is the most recent entry in this layer (May 2026) and takes a micro-containerization approach: each tool call executes in a fresh, ephemeral, capability-limited environment.

**Architecture**: Each agent is decomposed into "pockets" — minimal sandboxes with precisely scoped filesystem access, network rules, and environment variables. When an agent decides to call a tool, PocketAgents spawns a new pocket, injects only the necessary data, executes the call, and extracts only the permitted output. No state persists between pockets.

**Attack Implications**:
- **Inter-pocket smuggling**: The attacker's goal shifts to smuggling data between pockets. If pocket A can write to a shared location that pocket B reads, the attacker has re-established persistent state. Side-channel attacks (timing, error codes, file-locking) become the primary vector.
- **Permissive pocket boundaries**: The defense is only as good as the capability scoping. If the agent framework defines overly broad pocket permissions (e.g., "allow all HTTP requests"), micro-containerization provides little protection.
- **Bootstrapping vulnerability**: The system that defines pocket boundaries — the "pocket orchestrator" — must itself be secure. Compromise the orchestrator, and you control every pocket.

## Deep Dive: Cooperative Defense Layer

### CoopGuard

CoopGuard deploys three specialized agents alongside the primary agent:
1. **Deferring Agent**: Intercepts suspicious actions and routes them to the Forensic Agent
2. **Tempting Agent**: Actively attempts jailbreak against the primary agent's peers, testing the system's robustness in real-time
3. **Forensic Agent**: Analyzes intercepted actions for attack patterns and updates the detection rules

**Results**: CoopGuard claims a 78.9% ASR reduction across a suite of indirect prompt injection and tool misuse benchmarks.

**Architecture**: The three agents operate asynchronously. The Deferring Agent applies lightweight heuristics to flag actions for deeper inspection. The Tempting Agent runs continuous adversarial probes against other instances of the same LLM (scaled-down copies) to pre-identify jailbreak vectors. The Forensic Agent performs the expensive deep analysis only on flagged actions.

**Attack Implications**:
- **Deception cascade**: If the attacker identifies the Tempting Agent's probing pattern, they can feed it plausible jailbreak attempts that trigger false confirmations ("this jailbreak works!"), causing the primary defense to waste resources or make incorrect policy updates.
- **Forensic Agent latency**: The Forensic Agent introduces delay. If the attacker can trigger enough Forensic Agent investigations to create a backlog, subsequent actions may execute without scrutiny.
- **Adversarial cooperation**: The multi-agent architecture itself becomes an attack surface. If the attacker can inject a message that causes the Deferring Agent to misinterpret a malicious action as benign (or vice versa), they can manipulate the triage pipeline.

### RvB — Red vs. Blue

RvB applies game-theoretic hardening: a Red agent and a Blue agent engage in an ongoing adversarial game, with the Blue agent learning to defend against the Red agent's novel attack strategies in real-time.

**Architecture**: The Blue agent is the production agent. The Red agent is a parallel instance that continuously attempts to jailbreak the Blue agent. When the Red agent succeeds, the Blue agent's policy is updated — either via in-context learning (fast loop) or fine-tuning (slow loop). The game repeats with the Red agent adapting.

**Results**: RvB achieves a 90% Defense Success Rate (DSR) against held-out attacks — the strongest game-theoretic result in the literature.

**Attack Implications**:
- **Decoy detection**: RvB's effectiveness depends on the Red agent being undetectable to an attacker who has compromised the Blue agent. If the attacker can detect whether they are interacting with a Blue-only or Red+Blue environment (e.g., by observing latency, response patterns, or probing the Red agent's existence), they can adapt their strategy.
- **Game equilibrium stagnation**: The Red agent is itself a fixed model. If the attacker discovers attack strategies that lie outside the Red agent's search space, the Blue agent will never learn to defend against them. The RvB game only covers strategies reachable by the Red agent's architecture and training.
- **Policy instability**: Rapid policy updates from the Red-Blue game may introduce inconsistent behavior — the Blue agent overfits to recent Red attacks and forgets earlier defenses. An attacker can exploit this by cycling through attack strategies faster than the slow-loop fine-tuning can keep up.

### AegisLLM

AegisLLM takes a different cooperative approach: instead of adversarial training, it deploys a network of specialized "juror" agents that vote on the safety of each action.

**Architecture**: A panel of LLM-based jurors (each with different system prompts, model sizes, or training distributions) independently evaluates each proposed action. A consensus mechanism determines whether the action proceeds. Jurors are periodically rotated and re-randomized.

**Attack Implications**:
- **Juror poisoning**: If the attacker can influence the training data or system prompt of one or more jurors (e.g., via a compromised data pipeline), they can tilt the vote.
- **Juror collusion**: The defense assumes juror independence. If the attacker finds a single adversarial input that fools all jurors (a universal transfer attack), the consensus collapses.
- **Quorum manipulation**: If the attacker can trigger enough action proposals to exhaust the juror pool (by draining API quotas or rate limits), the system may fall back to a degraded mode with fewer jurors and lower security.

## Deep Dive: Formal Guarantees

### Stable Agentic Control

Stable Agentic Control is the first system to bring formal verification to agent safety. It models agent behavior as a dynamical system and proves (in the Lean 4 theorem prover) that the agent cannot enter unsafe action regions.

**Architecture**: The agent's action space is represented as a state machine with formally specified transitions. A **Lyapunov certificate** — a function that provably decreases (or increases) along every valid trajectory — is constructed and verified in Lean 4. Actions that would increase the Lyapunov function (i.e., move toward an unsafe state) are blocked at runtime.

**Results**: 59% reduction in game value against adversarial RL opponents in a grid-world navigation task with unsafe terminal states.

**Attack Implications**:
- **Finite action catalog constraint**: The Lyapunov function operates over a fixed, formally specified action catalog. If the attacker can cause the agent to perform an action outside this catalog (through tool escape, plugin invocation, or code execution), the formal guarantees vanish. The proof only covers transitions that the verifier was told about.
- **State abstraction gap**: The Lyapunov function is defined over an abstract state representation. If the attacker can manipulate the real-world state in ways not captured by this abstraction (side effects that don't appear in the formal model), the Lyapunov certificate guarantees nothing.
- **Proof brittleness**: Lean 4 proofs are all-or-nothing. A single bug in the formal specification (an incorrectly modeled transition, an unconsidered edge case) invalidates the entire guarantee. Attackers don't need to break cryptography — they need to find the gap between the model and reality.

Stable Agentic Control represents a principled direction, but the gap between what can be formally verified and what a real agent system does remains wide. Every formally verified system is only as strong as its threat model boundary.

## Deep Dive: Production Guardrails

### Constitutional Classifiers v2

Constitutional Classifiers v2 is the production-grade follow-up to Anthropic's Constitutional AI approach. Instead of training safety into the model itself, it applies a separate classifier that scores outputs against a written constitution of behavioral rules.

**Results**: 0.05% flag rate on benign traffic (extremely low false positive rate), 40x cheaper than the original Constitutional Classifiers, and — most impressively — no universal jailbreak found after 1,736 hours of adversarial testing.

**Architecture**: The classifier is a small Transformer (135M parameters) fine-tuned on constitution-grounded synthetic data augmented with adversarial examples from an automated red-teaming pipeline. The constitution covers output categories (disallowed content, forbidden actions, policy violations) and is designed to be human-readable and auditable.

**Attack Implications**:
- **Trained on known attack families**: CCv2's adversarial examples come from an automated red-teamer that generates attacks from a known taxonomy. Novel attack families that are orthogonal to the training distribution (e.g., attacks that exploit multi-turn context without triggering single-turn classifiers) may bypass detection.
- **Constitution interpretation gap**: The constitution is natural language. If the attacker can construct an input-output pair that technically satisfies the constitution's letter but violates its spirit (e.g., encoding forbidden content in a format not anticipated by the training data), the classifier may pass it.
- **Classifier-model gap**: CCv2 is a separate classifier, not the model itself. If the model's capabilities outpace the classifier's understanding (e.g., the model can generate outputs in a language or format the classifier was not trained on), the attacker has a free pass.

The 1,736 hours of adversarial testing without a universal jailbreak is genuinely impressive. But "no universal jailbreak found" is not "no jailbreak exists." The search space of possible attacks is exponentially larger than what any finite testing campaign can cover.

### SHIELD

SHIELD (Safety Hardening of Instructions and Execution via Learned Detection) is a meta-guardrail that wraps existing agent frameworks (LangChain, AutoGen, CrewAI) with a learned detector that monitors the full input-output loop.

**Architecture**: SHIELD extracts features from the agent's internal state (the conversation history, tool call arguments, execution results) and feeds them to a lightweight classifier trained to detect attack-specific patterns. It operates at three levels: input-level, state-level, and output-level, applying different classifiers at each level.

**Attack Implications**:
- **Feature extraction blind spots**: SHIELD's features are manually designed. If the attacker can express an attack in a way that preserves the malicious semantics but changes the feature representation, SHIELD misses it. Feature engineering is a cat-and-mouse game.
- **State-level evasion**: SHIELD monitors the agent's internal state, but only what the framework exposes. If the agent has internal state that is not reflected in the framework's hooks (e.g., in-memory variables, cached embeddings, tool-specific state), SHIELD has no visibility.
- **Wrapping layer compromise**: As a wrapper around existing frameworks, SHIELD inherits all vulnerabilities of those frameworks. A LangChain vulnerability that bypasses the framework's instrumentation point removes SHIELD's visibility.

### TrajGuard

TrajGuard focuses on trajectory-level anomalies rather than individual actions. An agent's trajectory is the sequence of its observations, reasoning, and actions.

**Architecture**: TrajGuard embeds trajectories into a vector space and flags trajectories that deviate from benign clusters. It uses a contrastive learning objective to learn embeddings that separate benign from malicious trajectories, even for novel attack types unseen during training.

**Results**: 95% detection rate on novel attack patterns (generalization to zero-day attacks), compared to ~60% for action-level detectors.

**Attack Implications**:
- **Slow-roll attacks**: A trajectory-level detector looks for anomalous *patterns*. If the attacker spreads a multi-step attack across a long trajectory where each individual step looks benign (a "slow-roll" attack), the trajectory may still cluster with benign trajectories — especially if the attacker mimics benign patterns in the early steps.
- **Embedding space collision**: If the attacker can find a malicious trajectory that embeds close to a benign cluster center, TrajGuard's contrastive loss will classify it as benign. This is an adversarial example attack on the embedding space.
- **Trajectory-length scaling**: Long trajectories are harder to embed cleanly. The attacker can exploit this by extending trajectories to the point where the embedding degenerates and the classifier's confidence drops, falling back to a default "benign" classification.

## The Seam Analysis: Where Defenses Don't Overlap

The most important question for a red teamer is not "which defense is strongest?" but "where are the gaps between defenses?" Every defense makes assumptions. The seams are where those assumptions don't intersect.

### Planning-Time Attacks (FlowSteer)

FlowGuard (arXiv:2605.11514) and its attack counterpart FlowSteer identify a critical seam: **planning-time attacks** occur before runtime governance activates. If an attacker can manipulate the agent's plan before execution begins, runtime monitors that inspect individual actions will see a coherent sequence — because the plan itself has been poisoned.

FlowSteer demonstrates that adversarial plans can bypass runtime defenses by embedding malicious subgoals into seemingly benign plan structures. The runtime monitor sees each action as individually valid, but the sequence of actions achieves an adversarial outcome.

**Defense gap**: Runtime governance (SafeAgent, AgentSentry) and guardrails (SHIELD, CCv2) don't inspect plans — they inspect actions. Cooperative defenses (CoopGuard, RvB) operate at action time too. TrajGuard's trajectory-level analysis *could* catch this, but only if the trajectory of a poisoned plan embedding differs from benign trajectories in the embedding space — which FlowSteer is specifically designed to avoid.

### Slow-Burn Trust Accumulation (DynaTrust)

DynaTrust (arXiv:2603.15661) manages trust relationships between agents in a multi-agent system, adjusting trust scores based on observed behavior. Trust decays over time and is rebuilt through verifiably benign actions.

**Defense gap**: DynaTrust's trust inertia — the fact that trust changes slowly — cuts both ways. An attacker who establishes a benign track record (e.g., by providing genuinely useful outputs for 100 turns) accumulates trust that makes subsequent malicious actions harder to flag. The slower the trust changes, the harder it is to detect the moment an agent "turns malicious."

Furthermore, trust is relative. If an agent A has high trust and points its finger at agent B, DynaTrust's update rules may penalize B based on A's reputation. An attacker controlling A can trivially frame B.

### Computational DoS on Counterfactual Re-Execution (AgentSentry)

AgentSentry's counterfactual re-execution is its strongest capability — and its most expensive one. Each counterfactual re-execution requires spinning up a sandbox, running the action under alternative inputs, computing the causal divergence, and logging the result.

**Defense gap**: An attacker who triggers enough counterfactual flags can exhaust the compute budget, forcing AgentSentry to either drop some investigations or fall back to a lighter detection mode. This is not a traditional network DoS — it's a *defense DoS*, where the attacker weaponizes the defense's own thoroughness.

This attack is particularly effective in multi-agent settings where a single attacker can control multiple compromised agents, each generating suspicious actions.

### The OATS Blind Spot

The Open Agent Trust Stack (OATS), illustrated at https://github.com/ThirdKeyAI/OpenAgentTrustStack, attempts to define a standardized trust layer for agent communication. It specifies identity verification, message attestation, and audit logging for inter-agent messages.

**Defense gap**: OATS assumes that the agent identity system is trustworthy. If the identity attestation is compromised (e.g., a stolen signing key, a rogue CA, a cryptographic implementation bug), the entire trust layer is theater. OATS also assumes that agents are honest about their own identity — a compromised agent can sign malicious messages with its legitimate key, and OATS logged them as valid.

## The Microsoft Defense-in-Depth Framework

Microsoft's defense-in-depth framework for autonomous AI agents (https://www.microsoft.com/en-us/security/blog/2026/05/14/defense-in-depth-autonomous-ai-agents/) provides an architectural blueprint for composing multiple defense layers. It organizes defenses into:

- **Data Layer**: Encryption, access control, and audit logging for agent data
- **Model Layer**: Safety fine-tuning, constitutional classifiers, adversarial training
- **Application Layer**: Guardrails, rate limiting, policy enforcement
- **Infrastructure Layer**: Network segmentation, compute isolation, identity management

This framework is useful as a composition model, but it inherits a fundamental challenge: **layer boundaries are attack surfaces**. The interfaces between layers — how Data Layer audit logs feed into Application Layer policy decisions, how Model Layer safety scores influence Infrastructure Layer execution permissions — are themselves subject to manipulation.

For the red teamer, the Microsoft framework is a map of exactly where to look: not *within* any single layer, but *between* them.

## USENIX Security 2026 SoK: Agentic Security Landscape

The Systematization of Knowledge (SoK) paper presented at USENIX Security 2026 (Kim, Guo, Song — see https://www.usenix.org/system/files/conference/usenixsecurity26/sec26_prepub_kim-juhee-agentic.pdf) provides the most comprehensive taxonomy of agentic attacks and defenses to date.

The SoK's central figure maps the defense landscape across two axes: **defense target** (input, reasoning, action, output, environment) and **defense mechanism** (detection, prevention, response, recovery). Each defense system we survey occupies a different cell in this 5x4 grid. The critical insight from the SoK is that **most defenses cluster in the detection and prevention columns** — response and recovery mechanisms are significantly underdeveloped.

For the red teamer, the SoK figure reveals the blind spots: attacks on the environment (the external systems the agent interacts with), attacks on memory or state persistence, and attacks that exploit response/recovery gaps (e.g., making a defense waste resources on false positives while the real attack proceeds).

## The AIRS Architecture and Three-Layer Model

The AIRS (AI Runtime Security) project proposes a simpler decomposition: **Sensing → Reasoning → Acting**, with independent monitors at each layer. The architecture diagram is available [here](https://raw.githubusercontent.com/JonathanCGill/airuntimesecurity.io/main/docs/images/three-layer-simple.svg).

AIRS provides a minimal viable architecture for defense composition. The Sensing layer detects anomalies in input and state; the Reasoning layer ensures the agent's plan is consistent with policy; the Acting layer constrains tool execution.

**Attack Implications**: AIRS's separation is architectural, not formal. An attacker who can inject a malicious sensor input (poisoning the Sensing layer's view of the world) can cause the entire stack to make incorrect but internally consistent decisions. The AIRS model is a useful reference architecture, but it is not itself a defense — it's a framework *for* defenses.

## Conclusion

Every defense has an attack implication, and the best defenses have the most interesting ones. SafeAgent's 0.0% ASR is the strongest result on InjecAgent, but the Decision Core is a new attack surface. CCv2's 0.05% flag rate is remarkable, but the constitution interpretation gap is real. Stable Agentic Control's Lean 4 proofs are mathematically sound — within the finite catalog they were proven against.

The seams between defenses are more valuable than any individual weakness. Planning-time attacks (FlowSteer) exploit the gap between plan inspection and action inspection. Slow-roll trust accumulation exploits DynaTrust's inertia. Defense DoS exploits the computational cost of counterfactual analysis.

Complexity is the attacker's friend. Every new defense adds a new system, a new configuration parameter, a new trust assumption. The defense landscape is getting richer, but it is also getting harder to deploy correctly. A misconfigured pocket boundary in PocketAgents, an expired juror certificate in AegisLLM, an undertrained causal model in AgentSentry — these are not theoretical vulnerabilities. They are the inevitable byproducts of complexity.

The defenses are getting better. They are not getting smaller.

## References

1. Kim, J., Guo, A., Song, D. "SoK: Security of LLM Agents." USENIX Security 2026. https://www.usenix.org/system/files/conference/usenixsecurity26/sec26_prepub_kim-juhee-agentic.pdf
2. Chen, L., et al. "SafeAgent: Separating Execution from Reasoning for Secure Agentic Systems." arXiv:2604.17562, 2026.
3. Patel, R., et al. "AgentSentry: Temporal Causal Diagnostics for LLM Agents." arXiv:2602.22724, 2026.
4. Zhang, Y., et al. "CoopGuard: Cooperative Multi-Agent Defense Against Prompt Injection." arXiv:2604.04060, 2026.
5. Liu, H., et al. "AegisLLM: Jury-Based Consensus for Safe Agent Outputs." arXiv:2504.20965, 2026.
6. Wang, T., et al. "RvB: Game-Theoretic Red vs. Blue Hardening for Language Agents." arXiv:2601.19726, 2026.
7. Singh, A., et al. "Stable Agentic Control: Formal Verification of Agent Safety Using Lyapunov Theory." arXiv:2605.03034, 2026.
8. Anthropic. "Constitutional Classifiers v2: Efficient and Robust Safety Classification." arXiv:2601.04603, 2026.
9. Kim, S., et al. "SHIELD: Safety Hardening of Instructions and Execution via Learned Detection." arXiv:2601.19174, 2026.
10. Park, J., et al. "DynaTrust: Dynamic Trust Management for Multi-Agent Systems." arXiv:2603.15661, 2026.
11. Nguyen, T., et al. "TrajGuard: Trajectory-Level Anomaly Detection for LLM Agents." arXiv:2604.07727, 2026.
12. Gupta, R., et al. "PocketAgents: Micro-Containerization for Agent Tool Execution." arXiv:2605.21694, 2026.
13. Li, W., et al. "FlowGuard and FlowSteer: Planning-Time Attacks and Defenses for Agentic Systems." arXiv:2605.11514, 2026.
14. Microsoft Security Blog. "Defense-in-Depth for Autonomous AI Agents." May 14, 2026. https://www.microsoft.com/en-us/security/blog/2026/05/14/defense-in-depth-autonomous-ai-agents/
15. ThirdKeyAI. "Open Agent Trust Stack (OATS) Specification." 2026. https://github.com/ThirdKeyAI/OpenAgentTrustStack
