// Renders the GitHub profile README blocks as SVG at build time.
//
// A README cannot run scripts, so every live element is an image served from
// this site. Each block ships four renders — dark/light x wide/narrow — plus a
// bounce page at /readme/go/<slug> that the <a> points at. The README in
// matheusht/matheusht is frozen; only the bytes behind these URLs change.
//
// Text is outlined to <path> by satori: the SVG loads inside an <img> through
// GitHub's camo proxy, where no webfont would ever be fetched.
//
// Layout follows caio.theodoro.dev/readme: no card, no border, no background —
// content sits at x=0 on a transparent canvas and reads as plain typography in
// the README. Section labels appear only on the first block of a group.

import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { roles, SITE_URL } from "../src/data/experience.js";

const OUT = "dist/readme";
const GITHUB_USER = "matheusht";
const REDTHREAD = "https://github.com/matheusht/redthread";

// camo derives its URL from the source URL, not the bytes, and caches for an
// hour. Content changes flow through the same URLs, but a *design* change needs
// a new URL to show up immediately — bump this and re-paste the README.
const VERSION = 2;

const font = (file, weight) => ({
  name: "Plus Jakarta Sans",
  weight,
  style: "normal",
  data: fs.readFileSync(`scripts/fonts/${file}`),
});
const fonts = [
  font("PlusJakartaSans-Regular.ttf", 400),
  font("PlusJakartaSans-Medium.ttf", 500),
  font("PlusJakartaSans-Bold.ttf", 700),
];

const THEMES = {
  dark: { body: "#9198a1", bright: "#e6edf3", label: "#7d8590", green: "#3fb950" },
  light: { body: "#59636e", bright: "#1f2328", label: "#818b98", green: "#1a7f37" },
};

// Canvas is 832 wide; text is constrained to a 640 column, as Caio's is.
const SIZES = { wide: { w: 832, col: 640 }, narrow: { w: 400, col: 400 } };

const DOT_SENTINEL = "#00ff01";

// `forwards`, never `both`: with `both` the backwards fill pins opacity:0 before
// the animation starts, so any viewer whose browser does not run animations in
// an <img>-embedded SVG sees nothing at all. `forwards` degrades to visible.
const KEYFRAMES =
  `@keyframes rmFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}` +
  `@keyframes rmBreathe{0%,100%{opacity:.4;transform:scale(.85)}50%{opacity:1;transform:scale(1.12)}}` +
  `.rm{animation:rmFadeUp .55s cubic-bezier(.25,.46,.45,.94) forwards}` +
  `.dot{transform-box:fill-box;transform-origin:center;animation:rmBreathe 2.4s ease-in-out infinite}` +
  `@media (prefers-reduced-motion:reduce){.rm,.dot{animation:none}}`;

const div = (style, children) => ({ type: "div", props: { style, children } });
const span = (style, children) => ({ type: "span", props: { style, children } });

// satori trims trailing whitespace inside a flex item, so a run that must wrap
// mid-sentence is split into one span per word and columnGap supplies the
// spaces. A run that must keep a continuous underline stays a single span.
const words = (text, style) => text.split(/\s+/).filter(Boolean).map((w) => span(style, w));

function label(t, s, txt) {
  return div(
    {
      display: "flex",
      color: t.label,
      fontSize: s.w === 400 ? 10 : 11,
      fontWeight: 700,
      letterSpacing: 1.1,
      lineHeight: 1.3,
      marginBottom: 14,
    },
    txt,
  );
}

// One flowing paragraph inside a 640px column. satori has no real inline
// layout — a multi-child div must be flex — so styled runs are flex items on a
// wrapping line. A run that fits shares the line with the next; one that does
// not takes its own lines. columnGap supplies the inter-run space, since
// leading whitespace in a flex item is trimmed.
function para(t, s, children) {
  return div(
    {
      display: "flex",
      flexWrap: "wrap",
      columnGap: s.w === 400 ? 4 : 5,
      rowGap: 0,
      width: s.col,
      color: t.body,
      fontSize: s.w === 400 ? 15 : 17,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    children,
  );
}

function block(children, s) {
  return div(
    {
      display: "flex",
      flexDirection: "column",
      width: s.w,
      paddingBottom: 18,
      fontFamily: "Plus Jakarta Sans",
    },
    children,
  );
}

// --- block builders -------------------------------------------------------

function currentlyBlock(t, s) {
  const r = roles[0];
  return block(
    [
      div({ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }, [
        div({ width: 8, height: 8, borderRadius: 4, background: DOT_SENTINEL }),
        div(
          { display: "flex", color: t.label, fontSize: s.w === 400 ? 10 : 11, fontWeight: 700, letterSpacing: 1.1 },
          "CURRENTLY",
        ),
      ]),
      para(t, s, [
        span({ color: t.bright, fontWeight: 700 }, r.role),
        ...words(`at ${r.company} · ${r.date}. ${r.description}`, {}),
      ]),
    ],
    s,
  );
}

// Title only — no description. The label rides on the first post of the group.
function postBlock(t, s, post, first) {
  return block(
    [
      ...(first ? [label(t, s, "RECENT WRITING")] : []),
      para(t, s, [span({ color: t.bright, fontWeight: 700, textDecoration: "underline" }, post.title)]),
    ],
    s,
  );
}

function projectBlock(t, s) {
  return block(
    [
      label(t, s, "FLAGSHIP"),
      para(t, s, [
        span({ color: t.bright, fontWeight: 700, textDecoration: "underline" }, "RedThread"),
        ...words(
          "— Autonomous AI red-teaming engine orchestrating multi-agent workflows for continuous LLM security testing and self-healing defenses.",
          {},
        ),
      ]),
    ],
    s,
  );
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
        pubDate: new Date(field("pubDate")),
      };
    })
    .sort((a, b) => b.pubDate - a.pubDate);
}

// --- render ---------------------------------------------------------------

async function render(node, width) {
  const svg = await satori(node, { width, fonts });
  const open = svg.match(/^<svg[^>]*>/)[0];
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return (
    open +
    `<style>${KEYFRAMES}</style><g class="rm">` +
    inner.replaceAll(`fill="${DOT_SENTINEL}"`, `fill="THEME_GREEN" class="dot"`) +
    `</g></svg>`
  );
}

function bouncePage(target, title) {
  return (
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">` +
    `<meta http-equiv="refresh" content="0; url=${target}">` +
    `<link rel="canonical" href="${target}">` +
    `<meta name="robots" content="noindex">` +
    `<title>${title}</title></head>` +
    `<body><p>Redirecting to <a href="${target}">${target}</a>.</p></body></html>\n`
  );
}

const posts = readPosts().slice(0, 3);

const blocks = [
  {
    slug: "currently",
    build: currentlyBlock,
    target: `${SITE_URL}/experience`,
    alt: `Currently: ${roles[0].role} at ${roles[0].company}.`,
  },
  ...posts.map((p, i) => ({
    slug: `post-${i + 1}`,
    build: (t, s) => postBlock(t, s, p, i === 0),
    target: `${SITE_URL}/blog/${p.slug}`,
    alt: `Recent writing: ${p.title}`,
  })),
  {
    slug: "redthread",
    build: projectBlock,
    target: REDTHREAD,
    alt: "RedThread — autonomous AI red-teaming engine.",
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const b of blocks) {
  for (const [themeName, t] of Object.entries(THEMES)) {
    for (const [sizeName, s] of Object.entries(SIZES)) {
      const suffix = sizeName === "narrow" ? "-narrow" : "";
      const svg = (await render(b.build(t, s), s.w)).replaceAll("THEME_GREEN", t.green);
      fs.writeFileSync(`${OUT}/${b.slug}-${themeName}${suffix}.svg`, svg);
    }
  }
  const goDir = `${OUT}/go/${b.slug}`;
  fs.mkdirSync(goDir, { recursive: true });
  fs.writeFileSync(`${goDir}/index.html`, bouncePage(b.target, b.alt));
}

// --- the README itself ----------------------------------------------------

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const src = (f) => `${SITE_URL}/readme/${f}.svg?v=${VERSION}`;

const markup = blocks
  .flatMap((b) =>
    ["dark", "light"].map(
      (theme) =>
        `<a href="${SITE_URL}/readme/go/${b.slug}#gh-${theme}-mode-only">` +
        `<picture>` +
        `<source media="(max-width: 600px)" srcset="${esc(src(`${b.slug}-${theme}-narrow`))}">` +
        `<img alt="${esc(b.alt)}" src="${esc(src(`${b.slug}-${theme}`))}">` +
        `</picture></a>`,
    ),
  )
  .join("\n");

const readme =
  `<!-- Rendered by the site at build time from src/content + src/data ` +
  `(https://github.com/${GITHUB_USER}/portfolio, scripts/generate-readme.mjs). Edit content there, not here.\n` +
  `     Each block is a dark and a light image. GitHub hides the link whose href ends in #gh-<other>-mode-only,\n` +
  `     so only the reader's theme shows. The <source> swaps in a 400px render on phones.\n` +
  `     ?v=${VERSION} busts GitHub's camo cache; bump it in scripts/generate-readme.mjs when the design changes. -->\n` +
  `[matheus.theodoro.dev](${SITE_URL}) · [linkedin](https://linkedin.com/in/matheusht) · ` +
  `[email](mailto:dev.matheustheodoro@gmail.com)\n\n${markup}\n`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/profile-readme.md", readme);

console.log(`readme: ${blocks.length * 4} svg + ${blocks.length} bounce pages -> ${OUT}, markup -> docs/profile-readme.md`);
