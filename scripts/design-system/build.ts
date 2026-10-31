/* Builds the two code files of the NexaHubTech design system — the artifact at
   https://claude.ai/artifact/RVdi5QXit3xgADcgoWvfoA — from this repository, so the
   system's previews run the site's real CSS and components rather than copies.

     .design-system/bundle.css  src/styles.css compiled with its Tailwind utilities,
                                minus the token values the system's tokens.json owns
     .design-system/bundle.js   Logo, Eyebrow, ModeSwitch, Header, Footer, Preloader,
                                SessionLoop and ModeProvider as window.NexaHub

   Run with: bun run design-system. Then upload both files to the system as
   project/components/bundle.css and project/components/bundle.js (see README.md
   beside this file). */
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/* the bundler is Bun's own — the script runs under bun — and the project carries
   no Bun type definitions, so this is the slice of its API used here */
interface ResolveArgs {
	path: string;
	importer: string;
}
interface PluginBuilder {
	onResolve(
		options: { filter: RegExp },
		callback: (args: ResolveArgs) => { path: string } | undefined,
	): void;
}
declare const Bun: {
	build(options: {
		entrypoints: string[];
		format: "iife";
		minify: boolean;
		target: "browser";
		plugins: { name: string; setup(build: PluginBuilder): void }[];
		define: Record<string, string>;
	}): Promise<{
		success: boolean;
		logs: unknown[];
		outputs: { text(): Promise<string> }[];
	}>;
};

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");
const OUT = join(ROOT, ".design-system");
const SHIMS = join(HERE, "shims");

/* the system's uploaded copy of public/logo-main.svg. The site serves the mark from
   its own root, which does not exist on the artifact's origin. */
const LOGO_SRC = "/_blob/8e69d91d7c552e689a62fe0f4f0b9cc8";

const NAMESPACE = "NexaHub";
const CARDS = [
	"Logo",
	"Eyebrow",
	"ModeSwitch",
	"Header",
	"Footer",
	"Preloader",
	"SessionLoop",
];

mkdirSync(OUT, { recursive: true });
const sha = spawnSync("git", ["rev-parse", "--short", "HEAD"], {
	cwd: ROOT,
	encoding: "utf8",
}).stdout.trim();

/* ── bundle.css ─────────────────────────────────────────────────── */

/* Rewrites the body of the first block that opens with `opener` and declares
   `marker`, keeping only the declarations `keep` accepts. Throws rather than
   guessing if the block has moved or been renamed. */
function rewriteBlock(
	lines: string[],
	opener: string,
	marker: string,
	keep: (line: string) => boolean,
) {
	for (let i = 0; i < lines.length; i++) {
		if (lines[i] !== opener) continue;
		const end = lines.indexOf("}", i);
		const body = lines.slice(i + 1, end);
		if (!body.some((l) => l.trimStart().startsWith(marker))) continue;
		lines.splice(i + 1, end - i - 1, ...body.filter(keep));
		return;
	}
	throw new Error(`styles.css: no "${opener}" block declaring ${marker}`);
}

/* a declaration line, not a comment or a continuation */
const declares = (line: string, name: string) =>
	line.trimStart().startsWith(`${name}:`);

const lines = readFileSync(join(ROOT, "src/styles.css"), "utf8").split("\n");

/* the light and build token blocks: tokens.json declares these values (as the
   system's tokens.css), so a value changed on the system's page wins. What tokens
   cannot carry — the mark is an image, --spark an alias the system never uses as
   a token — stays. */
rewriteBlock(lines, ":root {", "--paper", (l) => declares(l, "--mark"));
rewriteBlock(
	lines,
	":root[data-mode='build'] {",
	"--paper",
	(l) => declares(l, "--mark") || declares(l, "--spark"),
);
/* the hot gradients stay — a gradient is not a colour token — but --stage is one */
rewriteBlock(lines, ":root {", "--hot", (l) => !declares(l, "--stage"));

/* the system's previews switch themes with data-theme on <html>, where the site
   uses data-mode; the shims set both */
let input = lines
	.join("\n")
	.replaceAll("[data-mode=", "[data-theme=")
	.replaceAll(":root[data-mode]", ":root[data-theme]");
if (input.includes("data-mode")) {
	throw new Error(
		"styles.css: a data-mode selector the rewrite does not cover",
	);
}
/* scan the site's source for utilities, exactly as the Vite plugin does */
input = input.replace(
	"@import 'tailwindcss';",
	"@import 'tailwindcss' source(none);\n@source '../src';",
);
writeFileSync(join(OUT, "input.css"), input);

const tw = spawnSync(
	join(ROOT, "node_modules/.bin/tailwindcss"),
	["-i", join(OUT, "input.css"), "-o", join(OUT, "compiled.css")],
	{ cwd: ROOT, stdio: "inherit" },
);
if (tw.status !== 0) throw new Error("tailwindcss failed");

const css = `/* NexaHubTech — the site stylesheet (src/styles.css @ ${sha}) compiled with Tailwind against src/, minus the colour, spacing, radius and shadow values that tokens.json supplies (tokens.css). :root[data-mode] is written [data-theme] here. */\n${readFileSync(join(OUT, "compiled.css"), "utf8")}`;
writeFileSync(join(OUT, "bundle.css"), css);

/* ── bundle.js ──────────────────────────────────────────────────── */

/* React comes from the preview frame's globals, and the router and the mode's
   storage are swapped for preview stand-ins (shims/). The components themselves
   are bundled untouched. */
const previewGlobals = {
	name: "preview-globals",
	setup(build: PluginBuilder) {
		build.onResolve({ filter: /^react(-dom)?$/ }, () => ({
			path: join(SHIMS, "react.js"),
		}));
		build.onResolve({ filter: /^react\/jsx(-dev)?-runtime$/ }, () => ({
			path: join(SHIMS, "jsx-runtime.js"),
		}));
		build.onResolve({ filter: /^@tanstack\/react-router$/ }, () => ({
			path: join(SHIMS, "router.js"),
		}));
		build.onResolve({ filter: /^REAL_MODE$/ }, () => ({
			path: join(ROOT, "src/lib/mode.ts"),
		}));
		build.onResolve({ filter: /\/lib\/mode$/ }, (args) =>
			args.importer.endsWith("components/mode.tsx")
				? { path: join(SHIMS, "mode-lib.js") }
				: undefined,
		);
	},
};

const result = await Bun.build({
	entrypoints: [join(HERE, "entry.ts")],
	format: "iife",
	minify: true,
	target: "browser",
	plugins: [previewGlobals],
	define: { "process.env.NODE_ENV": '"production"' },
});
if (!result.success) {
	console.error(result.logs);
	throw new Error("bundling failed");
}

let js = await result.outputs[0].text();
if (!js.includes('"/logo-main.svg"')) {
	throw new Error("bundle: the Logo no longer loads /logo-main.svg");
}
js = js.replace('"/logo-main.svg"', JSON.stringify(LOGO_SRC));
/* the system inlines the bundle into a <script>, which either of these would end
   or escape */
if (/<\/script|<!--/i.test(js)) {
	throw new Error("bundle: contains </script or <!--");
}

const header = {
	format: 4,
	namespace: NAMESPACE,
	components: CARDS.map((name) => ({ name })),
};
writeFileSync(
	join(OUT, "bundle.js"),
	`/* @ds-bundle: ${JSON.stringify(header)} */\n${js}`,
);

console.log(
	`design system @ ${sha}: bundle.css ${css.length} B, bundle.js ${js.length} B → .design-system/`,
);
