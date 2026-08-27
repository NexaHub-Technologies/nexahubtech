/* Renders one Open Graph image per route, so a shared course or service link
   previews with its own title instead of the site-wide card.

   Requires `rsvg-convert` (librsvg) and `magick` (ImageMagick) on PATH. The two
   brand faces are downloaded once into .cache/og-fonts, which is gitignored.

   Run with: bun run generate-og-images */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { COURSES } from "../src/lib/courses";
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

/* wrap to at most two lines, shrinking the type if the words are long */
function layout(text: string) {
	const words = text.split(" ");
	const lines: string[] = [];
	let line = "";
	const max = text.length > 26 ? 17 : 22;
	for (const w of words) {
		if ((line + " " + w).trim().length > max && line) {
			lines.push(line);
			line = w;
		} else line = (line + " " + w).trim();
	}
	if (line) lines.push(line);
	const two = lines.slice(0, 2);
	const longest = Math.max(...two.map((l) => l.length));
	const size = longest > 20 ? 68 : longest > 15 ? 82 : 92;
	return { lines: two, size };
}

const logo = (() => {
	const s = readFileSync("public/logo-main.svg", "utf8");
	return s
		.slice(s.indexOf(">", s.indexOf("<svg")) + 1, s.lastIndexOf("</svg>"))
		.replace(/fill:#311049/g, "fill:#ffffff")
		.trim();
})();

function svg(eyebrow: string, headline: string, accent: string, sub: string) {
	const { lines, size } = layout(headline);
	const top = lines.length > 1 ? 268 : 320;
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

interface Job {
	name: string;
	eyebrow: string;
	headline: string;
	accent: string;
	sub: string;
}

const jobs: Job[] = [
	{ name: "home", eyebrow: "A tech school + a software studio", headline: "Learn to build.", accent: "Build for real.", sub: "Kubwa, FCT-Abuja · nexahubtech.company" },
	{ name: "courses", eyebrow: "Our courses", headline: "Real skills,", accent: "taught properly.", sub: "Ten cohort-based tracks · hands-on" },
	{ name: "enrol", eyebrow: "Enrolment", headline: "Apply for", accent: "a place.", sub: "Pick a track · tell us about you" },
	{ name: "services", eyebrow: "Our services", headline: "Software, built", accent: "properly.", sub: "Custom software, web, mobile, cloud" },
	{ name: "work", eyebrow: "Our work", headline: "What we've", accent: "built.", sub: "Marketplaces · real-time video · platforms" },
	{ name: "teaching", eyebrow: "How we teach", headline: "Understand it", accent: "first.", sub: "The method behind every course" },
	{ name: "approach", eyebrow: "How we work", headline: "Eleven steps", accent: "before the code.", sub: "System design before implementation" },
	{ name: "about", eyebrow: "Who we are", headline: "Two arms,", accent: "one mission.", sub: "A tech school and a software studio" },
	{ name: "contact", eyebrow: "Two ways in", headline: "Let's talk.", accent: "", sub: "nexahubt@gmail.com · +234 913 451 3173" },
	...COURSES.map((c) => ({
		name: `course-${c.slug}`,
		eyebrow: "Course",
		headline: c.t,
		accent: "",
		sub: `${c.price} · ${c.duration}`,
	})),
	...SERVICES.map((s) => ({
		name: `service-${s.slug}`,
		eyebrow: "The studio",
		headline: s.t,
		accent: "",
		sub: `${s.items.length} services · NexaHubTech`,
	})),
];

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
