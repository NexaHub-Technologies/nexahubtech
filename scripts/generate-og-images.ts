/* Renders one Open Graph image per route, so a shared course or service link
   previews with its own title instead of the site-wide card.

   Requires `rsvg-convert` (librsvg) and `magick` (ImageMagick) on PATH. The two
   brand faces are downloaded once into .cache/og-fonts, which is gitignored.

   Run with: bun run generate-og-images */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";
import { COURSES } from "../src/lib/courses";
import { coursePage, PAGES, type Page, servicePage } from "../src/lib/pages";
import { SERVICES } from "../src/lib/services";

const CACHE = ".cache/og-fonts";
const OUT = "public/og";
const TMP = ".cache/og-tmp";

const FONT_CSS =
	"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Hanken+Grotesk:wght@500;600&display=swap";

async function ensureFonts() {
	if (existsSync(`${CACHE}/fonts.conf`)) return;
	mkdirSync(`${CACHE}/cache`, { recursive: true });
	const css = await fetch(FONT_CSS, {
		headers: { "User-Agent": "Mozilla/5.0" },
	}).then((r) => r.text());
	const urls = [...css.matchAll(/https:\/\/fonts\.gstatic\.com[^)]*/g)].map(
		(m) => m[0],
	);
	await Promise.all(
		urls.map(async (u, i) => {
			const ab = await fetch(u).then((r) => r.arrayBuffer());
			writeFileSync(`${CACHE}/f${i}.ttf`, new Uint8Array(ab));
		}),
	);
	writeFileSync(
		`${CACHE}/fonts.conf`,
		`<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig>
<dir>${process.cwd()}/${CACHE}</dir><cachedir>${process.cwd()}/${CACHE}/cache</cachedir>
<include ignore_missing="yes">/etc/fonts/fonts.conf</include></fontconfig>`,
	);
}

const esc = (s: string) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Up to two headline lines, broken where the two halves come out most even —
   a greedy wrap strands a single word on the second line ("…your CBT / exam").
   Type shrinks for long lines, and again when an accent line makes it three. */
function layout(text: string, hasAccent: boolean) {
	const words = text.split(" ");
	let lines = [text];
	if (text.length > 22) {
		let best = Number.POSITIVE_INFINITY;
		for (let i = 1; i < words.length; i++) {
			const pair = [words.slice(0, i).join(" "), words.slice(i).join(" ")];
			const longest = Math.max(...pair.map((l) => l.length));
			if (longest < best) {
				best = longest;
				lines = pair;
			}
		}
	}
	const longest = Math.max(...lines.map((l) => l.length));
	if (longest > 24)
		throw new Error(`"${text}" is too long for a two-line card headline`);
	let size = longest > 20 ? 68 : longest > 15 ? 82 : 92;
	if (lines.length + (hasAccent ? 1 : 0) > 2) size = Math.min(size, 74);
	return { lines, size };
}

const logo = (() => {
	const s = readFileSync("public/logo-main.svg", "utf8");
	return s
		.slice(s.indexOf(">", s.indexOf("<svg")) + 1, s.lastIndexOf("</svg>"))
		.replace(/fill:#311049/g, "fill:#ffffff")
		.trim();
})();

function svg(eyebrow: string, headline: string, accent: string, sub: string) {
	const { lines, size } = layout(headline, Boolean(accent));
	/* centre the headline, accent and subline in the space under the eyebrow,
	   so a three-line card neither climbs into the eyebrow nor runs off the end */
	const lineCount = lines.length + (accent ? 1 : 0);
	const blockHeight = lineCount * (size + 14) + 150;
	const free = Math.max(0, 600 - 222 - blockHeight);
	const top = Math.round(222 + size * 0.8 + free / 2);
	const body = lines
		.map(
			(l, i) =>
				`<text x="80" y="${top + i * (size + 14)}" font-family="Bricolage Grotesque" font-weight="800" font-size="${size}" fill="#ffffff">${esc(l)}</text>`,
		)
		.join("\n  ");
	/* only reserve the accent line's height when there is one, or short titles
	   push the subline off the bottom of the card */
	const lastBaseline = top + (lines.length - 1) * (size + 14);
	const blockEnd = accent ? lastBaseline + size + 14 : lastBaseline;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3d1c56"/><stop offset="55%" stop-color="#2c1440"/><stop offset="100%" stop-color="#1c0b28"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.55">
      <stop offset="0%" stop-color="#f06ba8" stop-opacity="0.30"/><stop offset="100%" stop-color="#f06ba8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.08" cy="0.92" r="0.5">
      <stop offset="0%" stop-color="#6a2cad" stop-opacity="0.38"/><stop offset="100%" stop-color="#6a2cad" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g transform="translate(80,74) scale(0.0501)">${logo}</g>
  <text x="150" y="112" font-family="Bricolage Grotesque" font-weight="700" font-size="34" fill="#ffffff">NexaHubTech</text>
  <text x="80" y="186" font-family="Hanken Grotesk" font-weight="600" font-size="26" fill="#f9a8cd" letter-spacing="3">${esc(eyebrow.toUpperCase())}</text>
  ${body}
  ${accent ? `<text x="80" y="${blockEnd}" font-family="Bricolage Grotesque" font-weight="800" font-size="${size}" fill="#f9a8cd">${esc(accent)}</text>` : ""}
  <rect x="80" y="${blockEnd + 46}" width="86" height="4" rx="2" fill="#f06ba8"/>
  <text x="80" y="${blockEnd + 104}" font-family="Hanken Grotesk" font-weight="500" font-size="27" fill="#cfbcdd">${esc(sub)}</text>
</svg>`;
}

/* every page's card, from the same registry the page heads read — so the image
   a link previews with always says what the page says */
const pages: Page[] = [
	...Object.values(PAGES),
	...COURSES.map(coursePage),
	...SERVICES.map(servicePage),
];
const jobs = pages.map((p) => ({
	name: basename(p.image, ".jpg"),
	...p.card,
	accent: p.card.accent ?? "",
}));

await ensureFonts();
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });
const env = { ...process.env, FONTCONFIG_FILE: `${process.cwd()}/${CACHE}/fonts.conf` };

for (const j of jobs) {
	const file = `${TMP}/${j.name}.svg`;
	writeFileSync(file, svg(j.eyebrow, j.headline, j.accent, j.sub));
	const raw = `${TMP}/${j.name}.png`;
	execFileSync("rsvg-convert", ["-w", "1200", "-h", "630", file, "-o", raw], { env });
	execFileSync("magick", [raw, "-strip", "-quality", "88", `${OUT}/${j.name}.jpg`], { env });
}
console.log(`generated ${jobs.length} OG images into ${OUT}/`);
