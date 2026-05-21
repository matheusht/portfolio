---
title: "Adversarial Prediction Models for Learning-Augmented Algorithms"
description: "A position paper arguing that predictions used by learning-augmented algorithms should be treated as untrusted algorithmic inputs, not neutral estimates. Maps adversarial machine learning threat models into algorithm design and proposes benchmark dimensions for robust, security-aware online decision-making."
pubDate: 2026-05-14
category: Research
readTime: 20
tags: [AI security, learning-augmented algorithms, adversarial ML, online algorithms, robust recourse, prediction security]
---

Learning-augmented algorithms use predictions to improve online decisions while retaining worst-case guarantees when predictions fail. This field has developed a useful vocabulary: consistency for performance under accurate predictions, robustness for protection under inaccurate predictions, and smoothness for graceful degradation as prediction error grows. But the usual error model is incomplete for systems whose predictions are produced by machine-learning pipelines, retrieval layers, user-controlled context, telemetry, or model updates. In those systems, a prediction is not merely noisy. It is a channel that can be corrupted.

Adversarial machine learning supplies the missing threat vocabulary. Its taxonomies distinguish attacks by lifecycle stage, attacker goal, capability, and knowledge, including poisoning, evasion, and other manipulations of training or inference pipelines. When such a compromised or strategically influenced model feeds advice into an online algorithm, the result is an algorithmic problem: the downstream decision rule may pay extra cost, violate safety margins, trigger unnecessary recourse, or silently let advice replace policy.

This article argues for adversarial prediction models for learning-augmented algorithms. These models should specify who can influence predictions, at what lifecycle stage, with what knowledge, under what budget, and with what objective. The goal is not to reject learned advice. It is to design systems where good advice improves performance, bad advice has bounded marginal harm, and adversarial advice leaves evidence rather than silently becoming control.

## 1. From prediction error to prediction control

Learning-augmented algorithms emerged from a practical observation: classical worst-case algorithms are safe but often pessimistic. Online algorithms must make decisions before the future is known. A cache does not know the next request sequence. A scheduler does not know all future jobs. A ski-rental algorithm does not know the season length. If a predictor can estimate part of that future, the online algorithm may outperform a purely worst-case strategy while still retaining protection when the estimate fails.

The canonical promise is attractive: use predictions when they help, but do not collapse when they are wrong. Lykouris and Vassilvitskii's work on competitive caching with machine-learned advice is a foundational example because it studies how cache eviction can benefit from predictions while keeping competitive guarantees against a worst-case benchmark. Purohit, Svitkina, and Kumar similarly frame online algorithm design around machine-learned predictions, including classical online problems such as ski rental and scheduling.

That literature usually treats prediction quality through an error measure. The predictor may be perfect, moderately wrong, or very wrong. This is necessary, but it does not fully describe security-relevant systems. A prediction can be wrong because of ordinary noise. It can be wrong because the data distribution shifted. It can be wrong because the training set was poisoned, the context was contaminated, or an attacker shaped telemetry so that the model emits advice that is cheap for the attacker and expensive for the algorithm. The numerical error may look similar, but the causal story is different.

The security shift is to treat prediction as control surface. A learning-augmented algorithm does not only consume data; it gives prediction advice a specific operational role. Advice may decide when to buy, which item to evict, which job to schedule, which tool to call, or which recourse action to recommend. Once advice can change a downstream decision, it becomes part of the system's attack surface.

```
World stream or online request ──► Predictor
Training data / telemetry ──► Predictor
Adversary ── poison / steer / corrupt ──► Training data / telemetry
Adversary ── manipulate inference input ──► Predictor
Predictor ──► Prediction advice ──► Learning-augmented algorithm
Classical safe baseline ──► Learning-augmented algorithm
Learning-augmented algorithm ──► Decision and cost ──► Evidence: error, fallback, regret, recovery
```

This diagram does not imply that every predictor is compromised. It marks where trust assumptions enter. The online algorithm sees advice; security analysis asks where that advice came from, who could influence it, and how much harm it can cause.

## 2. The existing guarantee vocabulary is necessary but incomplete

The learning-augmented algorithms literature gives us three terms that should remain central: consistency, robustness, and smoothness. A consistent algorithm performs well when predictions are accurate. A robust algorithm retains a worst-case guarantee when predictions are inaccurate. A smooth algorithm degrades gradually as prediction error increases rather than falling off a cliff.

```
consistency:   low cost when advice is accurate
robustness:    bounded cost when advice is inaccurate
smoothness:    controlled degradation as advice error increases
```

The limitation is not that these concepts are wrong. The limitation is that prediction error is often compressed into a scalar or problem-specific loss. A scalar error can say how far a prediction is from the realized future. It usually does not say whether errors are random or targeted, whether they were introduced at training time or inference time, whether the attacker knows the fallback rule, or whether the attacker chooses errors that maximize competitive cost while staying below a detector threshold.

For security, the distinction matters. Two predictors can have the same average error and very different adversarial risk. One predictor may make independent mistakes. Another may make rare but strategically placed mistakes exactly when the online algorithm's reliance on advice is highest. A robustness proof against arbitrary predictions may cover the worst endpoint, but it may not tell us whether ordinary operating thresholds, trust calibration, recourse cost, or recovery behavior are safe under a realistic attacker.

```
Benign noise ──► Distribution shift ──► Systematic bias ──► Poisoned predictor ──► Context-corrupted inference ──► Adaptive adversarial advice

Typical question:  How large is the error?
Security question:  Who chose the error, with what knowledge, and why?
```

The adversarial-prediction agenda keeps the old question and adds the second one.

## 3. What adversarial machine learning adds

Adversarial machine learning is useful here because it decomposes corruption into mechanisms. NIST's adversarial machine-learning taxonomy organizes attacks by the lifecycle stage of the attack and by attacker goals, objectives, capabilities, and knowledge. That taxonomy is more precise than simply saying "bad prediction." A prediction may be bad because training data was poisoned, because an inference-time input was crafted to induce an error, because retrieved context was contaminated, or because a model update shifted behavior in a way the downstream algorithm did not anticipate.

```
AML object manipulated            learning-augmented effect
training data                     predictor learns biased advice
labels or feedback                advice quality degrades by source or region
retrieved context                 inference-time advice is steered
model update or distillation      future advice shifts without obvious provenance
deployment input                  advice fails on targeted online states
```

This mapping should be treated carefully. Adversarial machine learning does not automatically prove downstream algorithmic harm. A poisoned predictor might emit bad advice, but the learning-augmented algorithm might ignore it, cap it, or remain robust. The research opportunity is exactly at that boundary: measure when model-level corruption turns into decision-level cost.

## 4. Why ordinary prediction error is not enough

A prediction-error model usually defines a distance between advice and reality. In caching, this may involve predicted next access times. In ski rental, it may involve predicted duration. In robust recourse, it may involve predicted future model changes. Error is indispensable because performance guarantees need a mathematical handle.

But error alone hides four security variables:

First, it hides **origin**. A stale predictor, a biased telemetry stream, a poisoned training corpus, and a malicious inference context can all produce inaccurate advice. The downstream error may look the same while the mitigation differs. Drift monitoring may help with stale data, but it is not sufficient for adaptive manipulation.

Second, it hides **knowledge**. An attacker who knows the algorithm's trust threshold can craft advice that remains inside an acceptable error envelope while still increasing cost. This is different from random noise and closer to adversarial examples in spirit, though the downstream object is an online decision rather than a classifier label.

Third, it hides **objective**. Benign noise has no goal. Strategic advice has one. The adversary may seek higher cache misses, worse scheduling cost, unnecessary fallback activation, degraded recourse, or a tool-selection path that crosses a privilege boundary. The objective determines which prediction errors matter.

Fourth, it hides **adaptivity**. In repeated systems, an attacker may observe fallback behavior and adjust advice over time. A one-shot robustness bound remains useful, but system evaluation should also ask how quickly trust decays, how recovery works, and whether the algorithm logs enough evidence to explain why a bad decision happened.

## 5. Running examples: caching, ski rental, and robust recourse

**Caching** shows why the framing matters for infrastructure. Competitive caching with learned advice uses predictions about future requests to improve eviction decisions while retaining competitive analysis. In a benign model, inaccurate next-access predictions may come from imperfect forecasting. In an adversarial model, request streams, telemetry, or training data may be influenced so that the predictor recommends evictions that increase miss cost.

**Ski rental** is the minimal conceptual example. A prediction about season length can reduce cost when it is right, but a manipulated prediction can push the algorithm toward buying too late, buying too early, or switching thresholds in a way that maximizes regret. This problem is small enough to expose the principle: the target is not the predictor alone, but the coupling between prediction and action.

**Robust algorithmic recourse** makes the stakes human-facing. Algorithmic recourse studies how to give people actionable changes that can alter an unfavorable model outcome. Learning-augmented robust recourse introduces predictions about future model changes and asks how to reduce recourse cost when predictions are accurate while limiting cost when predictions are inaccurate. The adversarial extension asks what happens if predicted future model changes are strategically optimistic, poisoned, or selectively wrong for certain users.

## 6. A proposed adversarial-prediction model

An adversarial prediction model should sit between two extremes. At one extreme, prediction error is benign noise summarized by a scalar. At the other extreme, advice is fully arbitrary and controlled by an omniscient adversary. The first can be too optimistic for security; the second can be too blunt to guide design.

A compact model can be expressed as six fields:

```
Prediction source:   model, heuristic, retrieval system, telemetry, human labeler, ensemble
Attack timing:       training-time, update-time, retrieval-time, inference-time, feedback-time
Attacker knowledge:  black-box, gray-box, white-box, threshold-aware, policy-aware
Budget:              number of corrupted samples, context tokens, prediction edits, time window
Objective:           maximize cost, induce fallback, bias recourse, trigger unsafe route, hide evidence
Constraint:          bounded error, bounded detectability, source-limited access, non-adaptive/adaptive
```

```
Prediction source ──► Adversarial prediction model
Timing and lifecycle ──► Adversarial prediction model
Attacker knowledge ──► Adversarial prediction model
Budget and constraints ──► Adversarial prediction model
Objective ──► Adversarial prediction model
Adversarial prediction model ──► Advice workload ──► Learning-augmented algorithm
Learning-augmented algorithm ──► Metrics: consistency, robustness, smoothness, tail cost, recovery, evidence
```

This model also clarifies what should be compared. Algorithms should not only be ranked under perfect predictions and random errors. They should be tested under stale predictions, biased predictions, poisoned predictors, context-corrupted predictions, missing predictions, and adaptive advice.

## 7. Prediction firewalls as a design abstraction

A natural defense abstraction is a **prediction firewall**: a narrow boundary between predictor and decision rule that limits how much influence advice can exert. The firewall need not be a complex learned model. In fact, making it opaque may simply create a second attack surface. The useful starting point is a deterministic or auditable interface that caps reliance on advice, tracks provenance, measures recent error, activates fallback behavior, and emits evidence when advice is accepted, down-weighted, or rejected.

```
Untrusted predictor ──► Raw advice ──► Prediction firewall
Provenance, uncertainty, drift, past error ──► Prediction firewall
Prediction firewall ──► Guarded advice ──► Decision rule
Safe baseline policy ──► Decision rule
Decision rule ──► Action ──► Evidence log ──► Prediction firewall
```

The design target is simple: useful advice should improve normal-case performance; bad advice should have bounded marginal harm; adversarial advice should not silently seize control; and the system should preserve enough evidence to replay why a decision was made.

## 8. Benchmark requirements for future work

The field needs benchmarks where prediction failure is a first-class workload. A benchmark should define the base online problem, the prediction interface, the corruption model, the fallback policy, and the metrics.

```
Base problem:        caching, ski rental, scheduling, matching, recourse, routing
Prediction channel:  next access time, duration, job size, future model, risk score, context score
Advice regimes:      perfect, random noise, stale, biased, poisoned, context-corrupted, adaptive
Metrics:             consistency, robustness, smoothness, competitive cost, tail cost, recovery time
Evidence:            accepted advice, capped advice, rejected advice, fallback activation, post-error trust
```

The important comparison is not only whether the algorithm has a worst-case bound. It is whether the algorithm's practical trust machinery behaves well between perfect advice and arbitrary advice.

## 9. Research agenda

1. **Taxonomy.** A common language for adversarial prediction regimes: stale advice, source-biased advice, training-poisoned advice, retrieval-poisoned advice, inference-manipulated advice, and adaptive advice.

2. **Formal modeling.** For each online problem, define adversarial prediction classes that are more realistic than arbitrary advice but stronger than random error.

3. **Algorithm design.** Algorithms and wrappers that preserve consistency under good advice while adding security-aware robustness under targeted advice.

4. **Evaluation.** Benchmarks should include targeted error regimes and report evidence about fallback and recovery.

5. **Human-facing safety.** Robust recourse is a strong candidate because prediction failure can directly affect people.

## 10. Limitations

This article makes a literature-grounded argument, not an empirical claim. It does not prove that existing learning-augmented algorithms fail under adversarial prediction, and it does not introduce a new lower bound, benchmark suite, or case study. The strongest claim is narrower: learning-augmented algorithms already recognize that predictions can be wrong, while adversarial machine learning shows that prediction-producing systems can be strategically manipulated. Future work should make prediction-channel threat assumptions explicit.

## Conclusion

Learning-augmented algorithms are valuable because they refuse a false choice between learned prediction and worst-case safety. They show how algorithms can benefit from advice without fully surrendering to it. But as predictions increasingly come from machine-learning pipelines, retrieval systems, telemetry, and agentic context, the advice channel becomes a security boundary.

Adversarial prediction models are the missing bridge. They ask how prediction error is produced, not only how large it is. They make attacker capability, timing, knowledge, budget, and objective explicit. They preserve the core algorithmic goals while adding the security requirement that untrusted advice must not silently become control.

The practical goal is not prediction pessimism. It is disciplined trust. Good advice should help. Bad advice should hurt only within a bound. Adversarial advice should produce evidence, activate limits, and leave the system recoverable.

## References

- Algorithms with Predictions community bibliography. [https://algorithms-with-predictions.github.io/](https://algorithms-with-predictions.github.io/)
- Ziyad Benomar and Vianney Perchet, "On Tradeoffs in Learning-Augmented Algorithms," PMLR, 2025. [https://proceedings.mlr.press/v258/benomar25a.html](https://proceedings.mlr.press/v258/benomar25a.html)
- Harsh Chaudhari et al., "Cascading Adversarial Bias from Injection to Distillation in Language Models," arXiv, 2025. [https://arxiv.org/abs/2505.24842](https://arxiv.org/abs/2505.24842)
- Kshitij Kayastha, Vasilis Gkatzelis, and Shahin Jabbari, "Learning-Augmented Robust Algorithmic Recourse," arXiv, 2024. [https://arxiv.org/abs/2410.01580](https://arxiv.org/abs/2410.01580)
- Thodoris Lykouris and Sergei Vassilvitskii, "Competitive Caching with Machine Learned Advice," PMLR, 2018. [https://proceedings.mlr.press/v80/lykouris18a.html](https://proceedings.mlr.press/v80/lykouris18a.html)
- Michael Mitzenmacher and Sergei Vassilvitskii, "Algorithms with Predictions," arXiv, 2020. [https://arxiv.org/abs/2006.09123](https://arxiv.org/abs/2006.09123)
- NIST, "Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations," NIST AI 100-2e2025, 2025. [https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-attacks-and-mitigations](https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-attacks-and-mitigations)
- Manish Purohit, Zoya Svitkina, and Ravi Kumar, "Improving Online Algorithms via ML Predictions," NeurIPS, 2018. [https://proceedings.neurips.cc/paper/2018/hash/73a427badebe0e32caa2e1fc7530b7f3-Abstract.html](https://proceedings.neurips.cc/paper/2018/hash/73a427badebe0e32caa2e1fc7530b7f3-Abstract.html)
- Yuxuan Wei and Fred Zhang, "Optimal Robustness-Consistency Trade-offs for Learning-Augmented Online Algorithms," NeurIPS, 2020. [https://proceedings.neurips.cc/paper/2020/hash/5bd844f11fa520d54fa5edec06ea2507-Abstract.html](https://proceedings.neurips.cc/paper/2020/hash/5bd844f11fa520d54fa5edec06ea2507-Abstract.html)
- Pinlong Zhao et al., "Data Poisoning in Deep Learning: A Survey," arXiv, 2025. [https://arxiv.org/abs/2503.22759](https://arxiv.org/abs/2503.22759)
- "XOXO: Stealthy Cross-Origin Context Poisoning Attacks against AI Coding Assistants," arXiv, 2025. [https://arxiv.org/abs/2503.14281](https://arxiv.org/abs/2503.14281)
- Springer Nature, "Position Paper" submission guidelines. [https://link.springer.com/journal/43031/submission-guidelines/position-paper](https://link.springer.com/journal/43031/submission-guidelines/position-paper)
