---
title: "TAP Algorithm"
type: concept
status: active
summary: "Tree of Attacks with Pruning (TAP) — a multi-branch horizontal search algorithm for adversarial jailbreak discovery."
source_of_truth:
  - "src/redthread/core/tap.py"
  - "docs/algorithms.md"
updated_by: "Antigravity"
updated_at: 2026-05-20
---

# TAP (Tree of Attacks with Pruning)

## Definition

TAP is a tree-based adversarial search algorithm designed to discover vulnerabilities in alignment-hardened, heavily defended large language models. It solves PAIR's "local optima trapping" by exploring multiple parallel persuasion branches and pruning unproductive nodes to conserve query budget.

```text
                  [Root Objective]
                  /       |      \
              Branch A Branch B Branch C
                 |        |        |
             (Off-Topic)  |      Score 2/10
               [Prune]    |        |
                          ▼        ▼
                      Score 6/10 Score 5/10
                      (Keep Top W Candidates)
```

## Why It Matters

- **High Success Rate:** Extremely effective against commercially aligned frontier models (e.g., GPT-4, Claude 3 Opus) due to broad horizontal coverage.
- **Query Optimization:** Eliminates unpromising paths before querying target models via semantic relevance filtering.
- **Exponential Avoidance:** Prevents exponential explosion of the tree search using strict width limits ($W$).

## How It Works

TAP operates on three fundamental parameters: Breadth ($B$), Width ($W$), and Max Depth ($D$).

1. **Horizontal Branching ($B$):** From the root or a parent node, the Attacker LLM generates $B$ distinct adversarial prompt candidates, using diverse social-engineering angles (authority, emergency, roleplay, hypothetical context).
2. **Pre-Query Pruning:** A separate Evaluator model audits the generated prompts *before* they are sent to the Target. If a prompt is incoherent or drifts completely off-topic from the core objective, it is immediately pruned.
3. **Execution & Evaluation:** Surviving prompts are executed against the Target LLM. The Evaluator scores the responses (1-10 scale).
4. **Post-Score Pruning:** The engine sorts all evaluated nodes by their scores and retains only the top $W$ (Width) nodes. All other branches are pruned.
5. **Iteration:** The $W$ surviving nodes become the parents for the next depth layer, repeating until a threshold score (e.g., 10/10) is achieved or Max Depth ($D$) is reached.

## Comparison to PAIR

| Characteristic | PAIR | TAP |
| :--- | :--- | :--- |
| **Search Structure** | Linear (single-path) | Tree (multi-branch) |
| **Pruning** | None | Pre-query and post-score |
| **API Cost** | Low | Medium-High |
| **Jailbreak Discovery Rate** | Moderate | Very High |

## Related Pages

- [[pair-algorithm]] — The foundational linear algorithm.
- [[g-eval-scoring]] — The math powering the scoring gradients.
