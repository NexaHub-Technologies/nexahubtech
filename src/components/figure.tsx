/* Slots for evidence — photos, screenshots, logos, portraits.

   Every slot is a <Figure>. Give it a `src` and it shows the real image; leave
   `src` out and it draws a labelled placeholder of the same shape, so the page
   keeps its layout while the real material is being gathered. The label says
   what belongs there, so whoever fills the slot knows what to shoot or export.

   To fill a slot: put the file under public/images/ and set `src` in
   src/lib/evidence.ts (or on the <Figure> itself). Nothing else changes. */

export type FigureKind =
	| "photo"
	| "screenshot"
	| "phone"
	| "portrait"
	| "logo"
	| "graphic";

export interface FigureSpec {
	/* path under public/, e.g. "/images/centre/room.jpg". Absent = placeholder. */
	src?: string;
	/* what the image shows, for screen readers — and the placeholder's label */
	alt: string;
	kind: FigureKind;
	/* width / height, e.g. "4 / 3" */
	ratio?: string;
}

const DEFAULT_RATIO: Record<FigureKind, string> = {
	photo: "4 / 3",
	screenshot: "16 / 10",
	phone: "9 / 19",
	portrait: "4 / 5",
	logo: "3 / 1",
	graphic: "4 / 3",
};

const KIND_LABEL: Record<FigureKind, string> = {
	photo: "Photo",
	screenshot: "Screenshot",
	phone: "App screenshot",
	portrait: "Portrait",
	logo: "Logo",
	graphic: "Graphic",
};

export function Figure({
	src,
	alt,
	kind,
	ratio,
	className = "",
	caption,
}: FigureSpec & { className?: string; caption?: string }) {
	const r = ratio ?? DEFAULT_RATIO[kind];
	return (
		<figure className={`figure figure-${kind} ${className}`}>
			<div className="figure-frame" style={{ aspectRatio: r }}>
				{src ? (
					<img src={src} alt={alt} loading="lazy" className="figure-img" />
				) : (
					<Placeholder kind={kind} label={alt} />
				)}
			</div>
			{caption ? (
				<figcaption className="figure-caption">{caption}</figcaption>
			) : null}
		</figure>
	);
}

function Placeholder({ kind, label }: { kind: FigureKind; label: string }) {
	return (
		<div
			className="placeholder"
			role="img"
			aria-label={`Placeholder: ${label}`}
			data-kind={kind}
		>
			{kind === "screenshot" ? <ScreenSketch /> : null}
			{kind === "phone" ? <PhoneSketch /> : null}
			{kind === "portrait" ? <PortraitSketch /> : null}
			{kind === "photo" || kind === "graphic" ? <PhotoIcon /> : null}
			<span className="placeholder-label">
				<span className="placeholder-tag">{KIND_LABEL[kind]}</span>
				{kind === "logo" ? null : <span>{label}</span>}
			</span>
		</div>
	);
}

/* a browser window with the outline of a page in it */
function ScreenSketch() {
	return (
		<svg
			className="placeholder-sketch"
			viewBox="0 0 320 200"
			aria-hidden="true"
			preserveAspectRatio="xMidYMid meet"
		>
			<rect x="1" y="1" width="318" height="198" rx="10" className="ps-frame" />
			<line x1="1" y1="24" x2="319" y2="24" className="ps-line" />
			<circle cx="16" cy="12.5" r="3.5" className="ps-dot" />
			<circle cx="28" cy="12.5" r="3.5" className="ps-dot" />
			<circle cx="40" cy="12.5" r="3.5" className="ps-dot" />
			<rect x="20" y="40" width="70" height="140" rx="6" className="ps-block" />
			<rect
				x="104"
				y="40"
				width="196"
				height="16"
				rx="4"
				className="ps-block"
			/>
			<rect x="104" y="66" width="140" height="8" rx="4" className="ps-soft" />
			<rect x="104" y="92" width="92" height="64" rx="6" className="ps-soft" />
			<rect x="208" y="92" width="92" height="64" rx="6" className="ps-soft" />
			<rect x="104" y="166" width="196" height="8" rx="4" className="ps-soft" />
		</svg>
	);
}

/* a phone with the outline of an app screen in it */
function PhoneSketch() {
	return (
		<svg
			className="placeholder-sketch"
			viewBox="0 0 120 250"
			aria-hidden="true"
			preserveAspectRatio="xMidYMid meet"
		>
			<rect x="2" y="2" width="116" height="246" rx="18" className="ps-frame" />
			<rect x="44" y="10" width="32" height="6" rx="3" className="ps-dot" />
			<rect x="14" y="30" width="60" height="10" rx="4" className="ps-block" />
			<rect x="14" y="50" width="92" height="56" rx="8" className="ps-soft" />
			<rect x="14" y="116" width="92" height="14" rx="4" className="ps-soft" />
			<rect x="14" y="138" width="92" height="14" rx="4" className="ps-soft" />
			<rect x="14" y="160" width="92" height="14" rx="4" className="ps-soft" />
			<rect
				x="14"
				y="214"
				width="92"
				height="22"
				rx="11"
				className="ps-block"
			/>
		</svg>
	);
}

function PortraitSketch() {
	return (
		<svg
			className="placeholder-sketch is-portrait"
			viewBox="0 0 100 100"
			aria-hidden="true"
		>
			<circle cx="50" cy="38" r="17" className="ps-block" />
			<path d="M18 92c3-19 17-30 32-30s29 11 32 30" className="ps-block" />
		</svg>
	);
}

function PhotoIcon() {
	return (
		<svg
			className="placeholder-icon"
			viewBox="0 0 24 24"
			width="28"
			height="28"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			aria-hidden="true"
		>
			<rect x="3" y="5" width="18" height="14" rx="2.5" />
			<circle cx="9" cy="10.5" r="1.8" />
			<path d="m21 16-5.5-5.5L6 19" />
		</svg>
	);
}
