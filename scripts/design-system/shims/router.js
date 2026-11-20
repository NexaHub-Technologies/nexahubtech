/* Preview stand-ins for @tanstack/react-router: a card has no router. Links are
   plain anchors that do not navigate, and the current path is PREVIEW_PATH — a
   page neither arm owns (build.ts checks), so a card's mode follows its theme. */
const R = window.React;
const PATH = PREVIEW_PATH;

/* the address a real Link would point at: "/courses/$slug" with params, then
   ?search and #hash */
function hrefFor(to, params, search, hash) {
	let href = String(to).replace(/\$(\w+)/g, (_, k) =>
		encodeURIComponent(params?.[k] ?? `$${k}`),
	);
	if (search && Object.keys(search).length) {
		href += `?${new URLSearchParams(search)}`;
	}
	if (hash) href += `#${hash}`;
	return href;
}

export function Link({
	to,
	params,
	search,
	hash,
	className,
	activeProps,
	onClick,
	children,
	/* router-only options: an <a> has no such attributes */
	activeOptions,
	inactiveProps,
	preload,
	replace,
	resetScroll,
	...rest
}) {
	const active = to === PATH && activeProps?.className;
	return R.createElement(
		"a",
		{
			...rest,
			href: hrefFor(to, params, search, hash),
			className: active || className,
			onClick: (e) => {
				e.preventDefault();
				onClick?.(e);
			},
		},
		children,
	);
}

export function useRouterState({ select } = {}) {
	const state = { location: { pathname: PATH } };
	return select ? select(state) : state;
}

export function useRouter() {
	return { navigate() {} };
}
