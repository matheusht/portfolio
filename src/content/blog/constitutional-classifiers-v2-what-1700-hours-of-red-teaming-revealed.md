---
title: "Constitutional Classifiers v2: What 1,736 Hours of Red Teaming Revealed About Production AI Defense"
description: "An attacker's analysis of Anthropic's next-generation Constitutional Classifiers — the two-stage cascade, linear probe screening, 0.05% flag rate, 40x cost reduction, and what the absence of a universal jailbreak actually means."
pubDate: 2026-05-26
category: AI Security
readTime: 18
tags: [Constitutional Classifiers, jailbreak defense, Anthropic, red teaming, production AI security, guardrails]
---

In May 2026, Anthropic published the results of the most extensive red-teaming exercise ever conducted on a production AI safety system. Constitutional Classifiers v2 (CCv2) had been stress-tested for approximately 1,736 hours — 72 continuous days of human attackers trying to break it. The attackers logged roughly 198,000 individual attempt queries. Their success rate? Zero universal jailbreaks. The system's flag rate on live production traffic? 0.05% — an 87% reduction from the 0.38% of CCv1.

CCv2 is the first empirical demonstration that production-grade jailbreak defense operating at single-digit percentage compute overhead is achievable at scale. This analysis covers the architectural innovations, the results, the nuances buried in the fine print, and what they imply for the next generation of red-teaming strategies.

## The Architecture: Three Key Innovations

### Exchange Classifiers

The original Constitutional Classifiers deployed two independent guardrails: an input classifier that screened user prompts, and an output classifier that screened model responses. This created a blind spot. An attacker could distribute a harmful request across multiple conversational turns — innocuous in isolation, dangerous when composed — and neither classifier would catch it because neither had the full context.

CCv2 introduces *exchange classifiers*. Instead of evaluating prompts or responses in isolation, the system evaluates each output within its full conversational context. The classifier sees the entire dialogue history: previous assistant responses, the user's follow-ups, the model's drafting process, and the final output. This eliminates the compositional blind spot.

The architectural implication is subtle but important: exchange classifiers make the system stateful. An attack that succeeds by playing the long game — slowly steering the model across multiple turns — now has nowhere to hide.

### Two-Stage Cascade

Running an exchange classifier on every single query would be prohibitively expensive. CCv2 solves this with a two-stage cascade:

**Stage 1 — Lightweight Screening:** A low-cost classifier (we'll cover what it actually is in a moment) screens 100% of production traffic. This stage is designed for high throughput and low latency. Only exchanges flagged as potentially harmful are escalated to the second stage.

**Stage 2 — Full Evaluation:** The expensive exchange classifier runs only on the subset of flagged exchanges. In production, this is approximately 5.5% of all traffic.

Crucially, escalation is not the same as refusal. Most flagged exchanges — roughly 96% in production — are ultimately determined to be safe and are served normally. The first stage is intentionally permissive to avoid frustrating users with false refusals. The second stage makes the final decision. This design philosophy — *escalate first, adjudicate second* — is what allows the system to maintain a 0.05% flag rate while catching attacks that prior systems would miss.

### Linear Probe + Ensemble

Here is where CCv2 gets genuinely interesting from an engineering perspective. The production classifier is not a single model. It is a carefully engineered composite:

**Stage 1 — Linear Probe:** The lightweight first-stage classifier is a linear probe trained on the model's internal activations. A linear probe is essentially a logistic regression layer that reads the model's hidden states and predicts whether the current exchange is likely to contain a harmful output. Because it operates on already-computed internal representations, the marginal compute cost is negligible — a single matrix multiplication.

**Stage 2 — Ensemble:** When the linear probe flags an exchange, a more expensive classifier ensemble takes over. This ensemble combines the probe's output with an external classifier (a separate, fine-tuned language model) that evaluates the semantic content of the exchange. The ensemble significantly reduces false positives relative to either component alone.

The compute savings are dramatic. Running the full exchange classifier on every query would add approximately 40x the overhead of the cascade system. In practice, CCv2 adds roughly 1% additional compute overhead on Claude Opus 4.0 — a number that makes the system viable for production deployment at scale.

![Anthropic's CC architecture diagram showing the two-stage cascade with exchange classifiers](https://www-cdn.anthropic.com/images/4zrzovbb/website/e054f2e8fda9d7ddda10d1e7a5aeb94d3074450c-3840x2264.png)

## The Results

The empirical results define what "state of the art" means in production jailbreak defense:

| Metric | CCv1 | CCv2 | Improvement |
|--------|------|------|-------------|
| Production flag rate | 0.38% | 0.05% | 87% reduction |
| Compute overhead | ~several % | ~1% | ~40x cost reduction vs full exchange classifier |
| Red team hours | — | ~1,736 | First large-scale public red team |
| Universal jailbreaks found | — | 0 | None across 8 target CBRN queries |
| High-risk vulnerabilities found | — | 1 | 0.005 per thousand queries |
| Attempts in red team | — | ~198K | Largest published red team dataset |

The lone high-risk vulnerability is particularly instructive. It existed for six days before being patched. The paper does not disclose the specific attack vector, but the fact that a single vulnerability was found and fixed within a week suggests the system's attack surface is limited and the monitoring is effective.

## What "No Universal Jailbreak" Actually Means

This distinction is the most commonly misinterpreted result in the paper.

"No universal jailbreak was found" is a precise technical claim. It does **not** mean "no jailbreaks exist." The distinction is crucial:

**Universal jailbreak:** A single attack that elicits detailed, comprehensive answers to *all 8 target queries* in the evaluation set, at a level of detail comparable to what an undefended model would produce. The 8 queries cover CBRN (chemical, biological, radiological, nuclear) topics — the highest-stakes misuse categories.

**Non-universal jailbreak:** An attack that works on a subset of queries, produces partial information, or succeeds only under specific conditions.

The paper explicitly documents vulnerabilities that do not meet the universal threshold. Non-universal jailbreaks, partial bypasses, and context-specific exploits were observed. The claim is specifically that no attacker found a single technique that unlocked detailed responses across all 8 queries.

For red teamers, this distinction has direct operational implications:
- If you can find a universal jailbreak, you win the game — but this is now an extremely high bar.
- If you find a non-universal jailbreak, you have a bounded but real exploit that could be dangerous for specific high-value targets.
- If you find a partial bypass — say, extracting fragments of information or getting the model to acknowledge facts without detailing procedures — you have a starting point for chaining exploits.

"No universal jailbreak" is not "no jailbreak exists." That interpretation is incorrect and dangerous.

## Attack Implications for Red Teamers

### Attack the Training Distribution

The linear probe is trained on known attack families. Its training data includes adversarial examples from synthetic data generation and human red-teaming. The fundamental weakness of any probe is that it can only detect patterns it has seen.

The most promising vector for attackers is to produce activation patterns that are **orthogonal** to the probe's training distribution. If you can generate harmful content through a technique that produces internal representations unlike any of the known attack families, the linear probe may not flag it. This is difficult — the probe was trained on an extensive corpus — but it is the most theoretically sound approach.

### Exploit the Tolerance Band

The 0.05% flag rate means the system is calibrated for extremely low false positives. This is a business requirement — users will not tolerate a system that frequently refuses legitimate requests. The calibration creates a tolerance band: content that is borderline harmful but below the flagging threshold will pass through.

Identifying where this tolerance band lies for specific content categories is a viable attack strategy. The system may, for example, be more permissive with academic-sounding queries that have plausible deniability, or with queries that mix harmful content with benign framing.

### Novel Obfuscation

Exchange classifiers are stronger than input-only or output-only classifiers, but they are still operating on semantic content processed through the model. Novel obfuscation strategies that do not resemble known attack patterns — novel encoding schemes, multi-modal exploits, or techniques that leverage the model's internal processing in unexpected ways — may evade detection because they fall outside the classifier's training distribution.

### Targeted Over Universal

"Universal" is the hardest bar. Targeted attacks on specific queries or domains are more likely to succeed. If you only need to extract information on a single topic, you can optimize for that domain rather than trying to generalize across all 8 CBRN categories.

The paper's results suggest that the system is hardest to break when it needs to be broken broadly, and easiest to break when the attacker only needs to win once on a specific target.

### The Bottleneck Is Stage 1

The cascade architecture means the first-stage linear probe is the bottleneck. If you can avoid triggering the probe, you never reach the second-stage ensemble, and your content passes through. The probe is the cheaper, less sophisticated component. It is the single point of failure in the system's defense chain.

See Figure 1 in the [Constitutional Classifiers paper](https://arxiv.org/abs/2601.04603) for the training pipeline diagram.

## Comparison to Other Defenses

CCv2 is not the only jailbreak defense in the literature, but it is the only one deployed in production at scale. Understanding how it compares to other approaches helps contextualize its strengths and limitations.

| Defense | Approach | Stage | Universal Jailbreaks Found | Production Scale |
|---------|----------|-------|---------------------------|-----------------|
| **CCv2** | Exchange classifiers + cascade | Post-hoc | 0 | Yes (Anthropic) |
| **SafeAgent** | Runtime governance | During execution | N/A | No |
| **TrajGuard** | Decoding-time trajectory monitoring | During generation | N/A | No |
| **AgentSentry** | Causal defense (intervenes on model internals) | During generation | N/A | No |
| **Simple Adaptive Attacks** | Adversarial attack framework (not a defense) | N/A | Found vulnerabilities in multiple systems | N/A |

### SafeAgent (arXiv:2604.17562)
SafeAgent is a runtime governance framework that monitors agentic tool calls and enforces safety policies during execution. It is complementary to CCv2 — SafeAgent handles the agent loop, while CCv2 handles the generation itself. SafeAgent has not been deployed at scale.

### TrajGuard (arXiv:2604.07727)
TrajGuard monitors the trajectory of a model's generation process at decoding time, intervening when the trajectory deviates into harmful territory. This is more granular than post-hoc classification but adds latency to every generation. Its effectiveness against adversarial attacks has not been tested at production scale.

### AgentSentry (arXiv:2602.22724)
AgentSentry takes a fundamentally different approach: it modifies the model's internals to make harmful outputs causally impossible rather than detecting them after the fact. This is elegant in theory but requires model-level access that most deployers do not have.

### Simple Adaptive Attacks (Andriushchenko et al., ICLR 2025)
This is not a defense but an attack framework — and a highly influential one. The authors demonstrated that many proposed defenses fail against adaptive attacks that are designed to circumvent the specific defense mechanism. CCv2's red team explicitly tested against adaptive attacks, which strengthens the credibility of their results.

### The Tradeoff: Generality vs. Specificity
CCv2's key advantage is generality — it works across domains, attack types, and content categories without per-domain tuning. Its limitation is that it is post-hoc: it detects harmful outputs after they are generated, rather than preventing them from being generated. SafeAgent, TrajGuard, and AgentSentry all operate at earlier stages but require more specific assumptions about the threat model.

## What This Means for the Field

CCv2 demonstrates that production-grade jailbreak defense with acceptable user friction and compute cost is achievable. The question shifts from "can it be done?" to "how do we make it better and cheaper?"

Three implications stand out:

**Synthetic data works.** The CCv2 classifiers are trained on synthetically generated adversarial examples combined with human red-teaming data. The success of this approach suggests that the bottleneck is no longer data — it is generating the *right* synthetic data that covers the distribution of real-world attacks.

**Cascade architectures are the right pattern.** The two-stage cascade — cheap probe screens everything, expensive classifier adjudicates — is likely to become the standard architecture for production safety systems. It balances cost, latency, and coverage in a way that monolithic approaches cannot.

**Activation-based screening is underutilized.** The linear probe approach — detecting harmful intent from internal representations rather than output text — is computationally efficient and harder to obfuscate than surface-level text classification. Expect this approach to be adopted more widely.

For red teamers, the implications are sobering. The attack families that CCv2 has been trained on — and that it now reliably detects — include most known jailbreak techniques. Evolving beyond these families requires fundamentally new attack strategies that produce novel activation patterns. The bar has been raised.

## References

1. Anthropic. "Constitutional Classifiers v2." arXiv:2601.04603, 2026. [https://arxiv.org/abs/2601.04603](https://arxiv.org/abs/2601.04603)
2. Sharma, M., et al. "Constitutional Classifiers: Defending Against Universal Jailbreaks." arXiv, 2025.
3. Anthropic. "Next-generation Constitutional Classifiers." Blog post, 2026. [https://www.anthropic.com/news/next-generation-constitutional-classifiers](https://www.anthropic.com/news/next-generation-constitutional-classifiers)
4. Anthropic. "Constitutional Classifiers." Blog post, 2025.
5. SafeAgent. arXiv:2604.17562, 2026.
6. TrajGuard. arXiv:2604.07727, 2026.
7. AgentSentry. arXiv:2602.22724, 2026.
8. Andriushchenko, M., et al. "Simple Adaptive Attacks." ICLR 2025.
9. OpenAI. "GPT-4 Technical Report." 2023.
