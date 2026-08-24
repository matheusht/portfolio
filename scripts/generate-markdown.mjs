import fs from "node:fs";
import path from "node:path";
import { SITE_URL, roles } from "../src/data/experience.js";

const DIST = "dist";
const BLOG_SRC = "src/content/blog";

function readPosts() {
  return fs
    .readdirSync(BLOG_SRC)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_SRC, file), "utf8");
      const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      if (!match) throw new Error(`No frontmatter in ${file}`);
      const [, fm, body] = match;
      const field = (key) => {
        const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
        return m ? m[1].replace(/^["']|["']$/g, "") : "";
      };
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: field("title"),
        description: field("description"),
        category: field("category"),
        pubDate: field("pubDate"),
        body: body.trim(),
      };
    });
}

function write(rel, content) {
  const target = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content.trimStart() + "\n");
}

const posts = readPosts().sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
const latest = posts.slice(0, 3);
const url = (...p) => [SITE_URL, ...p].join("/");

write(
  "index.md",
  `# Matheus Theodoro

> AI security engineer. Founder of Avenza Security. I build and break AI systems so companies can ship them with evidence, not hope.

I red team LLMs and agentic systems, then turn confirmed failures into engineering controls. My work combines offensive security with production engineering: adversarial campaigns, judge-based scoring, and defense validation for real deployments.

## Writing

${latest.map((p) => `- [${p.title}](${url("blog", p.slug + ".md")}): ${p.description}`).join("\n")}

All writing: ${url("blog/index.md")}

## Experience

- **Founder & AI Security Engineer, Avenza Security** (2024 — Present): practical AI security practice for companies shipping LLM applications and agents.
- **Software Engineer II, Avenza Cloud** (2022 — 2026): secure cloud infrastructure and backend systems at scale.

Full history: ${url("experience.md")}

## Connect

- Email: dev.matheustheodoro@gmail.com
- GitHub: https://github.com/matheusht
- LinkedIn: https://linkedin.com/in/matheusht
`
);

for (const p of posts) {
  write(
    `blog/${p.slug}.md`,
    `# ${p.title}

> ${p.description}

${p.category} · ${p.pubDate}

${p.body}
`
  );
}

write(
  "blog/index.md",
  `# Blog — Matheus Theodoro

> Writing on AI security, red teaming, agentic systems, and building with LLMs.

${posts.map((p) => `- [${p.title}](${url("blog", p.slug + ".md")}): ${p.description}`).join("\n")}
`
);

write(
  "experience.md",
  `# Experience — Matheus Theodoro

> AI Security Engineer at Avenza Security. Experience across AI security, cloud engineering, and DevSecOps.

${roles
  .map(
    (r) => `## ${r.role} — ${r.company}

${r.date}

${r.description}
${
  r.achievements.length
    ? "\n" + r.achievements.map((a) => `- ${a}`).join("\n") + "\n"
    : ""
}${r.link ? `\nLink: ${r.link}\n` : ""}`
  )
  .join("\n")}

## Notable Projects

### RedThread / OSlit

CLI-first autonomous AI red-teaming and defense-evidence engine for LLM and agentic systems. Runs PAIR, TAP, Crescendo, and GS-MCTS campaigns; scores traces against OWASP LLM and MITRE ATLAS categories; converts confirmed failures into replay-validated guardrails.

GitHub: https://github.com/matheusht/redthread

### WindWhisper

NASA Space Apps 2025 global nominee and local 1st place. AI-powered wind prediction combining computer vision, backend data pipelines, and real-time inference.
`
);

console.log("markdown twins generated");
