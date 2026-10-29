import { useEffect, useRef, useState } from "react";

/* how long the arc takes to travel from one part to the next */
const STEP_MS = 4500;

/* where part i of n sits on the ring, clockwise from the top, as a percentage
   of the diagram. The ring is r=150 in a 400 viewBox, so 37.5%. */
function position(i: number, n: number) {
	const a = -Math.PI / 2 + (i / n) * 2 * Math.PI;
	return { x: 50 + 37.5 * Math.cos(a), y: 50 + 37.5 * Math.sin(a) };
}

/* A session drawn as the loop it is: the parts sit on a ring and an arc
   travels round them, starting again from the top once it gets back there.

   The arc's own CSS animation is the clock — when it ends, the next part
   becomes active — so pausing is just pausing the animation. It pauses while
   the diagram is off screen, hovered or focused, and under reduced motion it
   does not run at all (styles.css), leaving the parts to be clicked. */
export function SessionLoop({ parts }: { parts: { t: string; d: string }[] }) {
	const [active, setActive] = useState(0);
	const [held, setHeld] = useState(false);
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLFieldSetElement>(null);
	const n = parts.length;

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<fieldset
			ref={ref}
			aria-label="The parts of a session"
			className="session-loop"
			onPointerEnter={() => setHeld(true)}
			onPointerLeave={() => setHeld(false)}
			onFocus={() => setHeld(true)}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
			}}
		>
			<div className="session-loop-ring">
				<svg viewBox="0 0 400 400" aria-hidden="true">
					<circle className="session-loop-track" cx="200" cy="200" r="150" />
					{/* keyed on the active part, so choosing one restarts the sweep
					    from there */}
					<circle
						key={active}
						className="session-loop-arc"
						cx="200"
						cy="200"
						r="150"
						pathLength={n}
						transform="rotate(-90 200 200)"
						style={
							{
								"--from": active,
								"--to": active + 1,
								animationDuration: `${STEP_MS}ms`,
								animationPlayState: inView && !held ? "running" : "paused",
							} as React.CSSProperties
						}
						onAnimationEnd={() => setActive((a) => (a + 1) % n)}
					/>
				</svg>

				{parts.map((p, i) => {
					const { x, y } = position(i, n);
					return (
						<button
							key={p.t}
							type="button"
							className="session-loop-node"
							data-active={i === active}
							data-side={y < 50 ? "above" : "below"}
							style={{ left: `${x}%`, top: `${y}%` }}
							aria-pressed={i === active}
							onClick={() => setActive(i)}
						>
							<span className="session-loop-dot" />
							<span className="session-loop-label">{p.t}</span>
						</button>
					);
				})}

				{/* every part is rendered into the same cell and only the active one
				    shown, so the box is always as tall as the longest and nothing
				    jumps as the loop moves on */}
				<div className="session-loop-centre">
					{parts.map((p, i) => (
						<div key={p.t} hidden={i !== active}>
							<span className="text-[0.78rem] text-mute font-semibold uppercase tracking-wider">
								Part {i + 1} of {n}
							</span>
							<p className="display text-[1.3rem] sm:text-[1.5rem] mt-1">
								{p.t}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="session-loop-detail">
				{parts.map((p, i) => (
					<p
						key={p.t}
						className="lead text-[0.98rem]"
						data-active={i === active}
					>
						{p.d}
					</p>
				))}
			</div>
		</fieldset>
	);
}
