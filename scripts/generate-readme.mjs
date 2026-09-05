// Renders the GitHub profile README blocks as SVG at build time.
//
// A README cannot run scripts, so every live element is an image served from
// this site. Each block ships four renders — dark/light x wide/narrow — plus a
// bounce page at /readme/go/<slug> that the <a> points at. The README in
// matheusht/matheusht is frozen; only the bytes behind these URLs change.
//
// Text is outlined to <path> by satori: the SVG loads inside an <img> through
// GitHub's camo proxy, where no webfont would ever be fetched.

import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { roles, SITE_URL } from "../src/data/experience.js";

const OUT = "dist/readme";
const GITHUB_USER = "matheusht";
const REDTHREAD = "https://github.com/matheusht/redthread";

const fonts = [
  { name: "Cabinet Grotesk", weight: 500, style: "normal", data: fs.readFileSync("scripts/fonts/CabinetGrotesk-Medium.ttf") },
  { name: "Cabinet Grotesk", weight: 700, style: "normal", data: fs.readFileSync("scripts/fonts/CabinetGrotesk-Bold.ttf") },
];

const THEMES = {
  dark: { bg: "#0d1117", border: "#30363d", fg: "#e6edf3", muted: "#8b949e", link: "#2f81f7", green: "#3fb950", chip: "#21262d" },
  light: { bg: "#ffffff", border: "#d0d7de", fg: "#1f2328", muted: "#59636e", link: "#0969da", green: "#1a7f37", chip: "#f6f8fa" },
};

const SIZES = { wide: 832, narrow: 400 };

// A sentinel fill satori will emit verbatim; swapped for class="dot" after
// render so the CSS below can animate it.
const DOT_SENTINEL = "#00ff01";

const KEYFRAMES = `@keyframes rmFadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}` +
  `@keyframes rmBreathe{0%,100%{opacity:.4;transform:scale(.85)}50%{opacity:1;transform:scale(1.12)}}` +
  `.rm{animation:rmFadeUp .5s cubic-bezier(.25,.46,.45,.94) both}` +
  `.dot{transform-box:fill-box;transform-origin:center;animation:rmBreathe 2.4s ease-in-out infinite}` +
  `@media (prefers-reduced-motion:reduce){.rm,.dot{animation:none}}`;

const div = (style, children) => ({ type: "div", props: { style, children } });
const text = (style, content) => div({ display: "flex", ...style }, content);

// Cut on a word boundary — satori wraps, but an over-long string still has to
// end somewhere, and mid-word ellipses read as a bug.
function clip(s, max) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:—-]+$/, "") + "…";
}

function card(t, w, children, gap = 8) {
  const pad = w === SIZES.narrow ? 16 : 22;
  return div(
    {
      display: "flex",
      flexDirection: "column",
      gap,
      width: w,
      padding: `${pad}px ${pad + 2}px`,
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      fontFamily: "Cabinet Grotesk",
    },
    children,
  );
}

function chipRow(t, w, label, meta) {
  const fs_ = w === SIZES.narrow ? 12 : 13;
  return div({ display: "flex", alignItems: "center", gap: 8 }, [
    text(
      {
        color: t.link,
        background: t.chip,
        border: `1px solid ${t.border}`,
        borderRadius: 999,
        padding: "2px 9px",
        fontSize: fs_,
        fontWeight: 500,
      },
      label,
    ),
    text({ color: t.muted, fontSize: fs_ }, meta),
  ]);
}

// --- block builders -------------------------------------------------------

function currentlyBlock(t, w) {
  const narrow = w === SIZES.narrow;
  const r = roles[0];
  return card(t, w, [
    div({ display: "flex", alignItems: "center", gap: 9 }, [
      div({ width: 9, height: 9, borderRadius: 5, background: DOT_SENTINEL }),
      text({ color: t.muted, fontSize: narrow ? 12 : 13, fontWeight: 500, letterSpacing: 0.6 }, "CURRENTLY"),
    ]),
    text({ color: t.fg, fontSize: narrow ? 18 : 24, fontWeight: 700 }, `${r.role} at ${r.company}`),
    text({ color: t.muted, fontSize: narrow ? 13 : 15 }, clip(r.date, narrow ? 40 : 90)),
  ]);
}

function postBlock(t, w, post) {
  const narrow = w === SIZES.narrow;
  return card(t, w, [
    chipRow(t, w, post.category, `${post.readTime} min read`),
    // Budgeted to wrap onto a second line rather than ellipsize a long title.
    text({ color: t.fg, fontSize: narrow ? 16 : 21, fontWeight: 700, lineHeight: 1.25 }, clip(post.title, narrow ? 80 : 150)),
    text({ color: t.muted, fontSize: narrow ? 12.5 : 14.5, lineHeight: 1.45 }, clip(post.description, narrow ? 95 : 165)),
  ]);
}

function projectBlock(t, w) {
  const narrow = w === SIZES.narrow;
  return card(t, w, [
    chipRow(t, w, "Flagship", "github.com/matheusht/redthread"),
    text({ color: t.fg, fontSize: narrow ? 16 : 21, fontWeight: 700 }, "RedThread"),
    text(
      { color: t.muted, fontSize: narrow ? 12.5 : 14.5, lineHeight: 1.45 },
      clip(
        "Autonomous AI red-teaming engine orchestrating multi-agent workflows for continuous LLM security testing and self-healing defenses.",
        narrow ? 95 : 165,
      ),
    ),
  ]);
}

// --- content --------------------------------------------------------------

function readPosts() {
  const dir = "src/content/blog";
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const fm = raw.split(/^---\s*$/m)[1] ?? "";
      const field = (k) => {
        const m = fm.match(new RegExp(`^${k}:\\s*(.*)$`, "m"));
        return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
      };
      return {
        slug: f.replace(/\.md$/, ""),
        title: field("title"),
        description: field("description"),
        category: field("category"),
        readTime: Number(field("readTime")) || 0,
        pubDate: new Date(field("pubDate")),
      };
    })
    .sort((a, b) => b.pubDate - a.pubDate);
}

// --- render ---------------------------------------------------------------

async function render(node, width) {
  const svg = await satori(node, { width, fonts });
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const open = svg.match(/^<svg[^>]*>/)[0];
  return (
    open +
    `<style>${KEYFRAMES}</style><g class="rm">` +
    inner.replaceAll(`fill="${DOT_SENTINEL}"`, `fill="${"THEME_GREEN"}" class="dot"`) +
    `</g></svg>`
  );
}

function bouncePage(target, title) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">` +
    `<meta http-equiv="refresh" content="0; url=${target}">` +
    `<link rel="canonical" href="${target}">` +
    `<meta name="robots" content="noindex">` +
    `<title>${title}</title></head>` +
    `<body><p>Redirecting to <a href="${target}">${target}</a>.</p></body></html>\n`;
}

const posts = readPosts().slice(0, 3);

const blocks = [
  { slug: "currently", build: currentlyBlock, target: `${SITE_URL}/experience`, alt: `Currently: ${roles[0].role} at ${roles[0].company}.` },
  ...posts.map((p, i) => ({
    slug: `post-${i + 1}`,
    build: (t, w) => postBlock(t, w, p),
    target: `${SITE_URL}/blog/${p.slug}`,
    alt: `Recent writing: ${p.title}`,
  })),
  { slug: "redthread", build: projectBlock, target: REDTHREAD, alt: "RedThread — autonomous AI red-teaming engine." },
];

fs.mkdirSync(OUT, { recursive: true });

for (const block of blocks) {
  for (const [themeName, t] of Object.entries(THEMES)) {
    for (const [sizeName, w] of Object.entries(SIZES)) {
      const suffix = sizeName === "narrow" ? "-narrow" : "";
      const svg = (await render(block.build(t, w), w)).replaceAll("THEME_GREEN", t.green);
      fs.writeFileSync(`${OUT}/${block.slug}-${themeName}${suffix}.svg`, svg);
    }
  }
  const goDir = `${OUT}/go/${block.slug}`;
  fs.mkdirSync(goDir, { recursive: true });
  fs.writeFileSync(`${goDir}/index.html`, bouncePage(block.target, block.alt));
}

// --- the README itself ----------------------------------------------------

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const markup = blocks
  .flatMap((b) =>
    ["dark", "light"].map(
      (theme) =>
        `<a href="${SITE_URL}/readme/go/${b.slug}#gh-${theme}-mode-only">` +
        `<picture>` +
        `<source media="(max-width: 600px)" srcset="${SITE_URL}/readme/${b.slug}-${theme}-narrow.svg">` +
        `<img alt="${esc(b.alt)}" src="${SITE_URL}/readme/${b.slug}-${theme}.svg">` +
        `</picture></a>`,
    ),
  )
  .join("\n");

const readme =
  `<!-- Rendered by the site at build time from src/content + src/data ` +
  `(https://github.com/${GITHUB_USER}/portfolio, scripts/generate-readme.mjs). Edit content there, not here.\n` +
  `     Each block is a dark and a light image. GitHub hides the link whose href ends in #gh-<other>-mode-only,\n` +
  `     so only the reader's theme shows. The <source> swaps in a 400px render on phones. -->\n` +
  `[matheus.theodoro.dev](${SITE_URL}) · [linkedin](https://linkedin.com/in/matheusht) · ` +
  `[email](mailto:dev.matheustheodoro@gmail.com)\n\n${markup}\n`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/profile-readme.md", readme);

console.log(`readme: ${blocks.length * 4} svg + ${blocks.length} bounce pages -> ${OUT}, markup -> docs/profile-readme.md`);
