/* Preview stand-ins for @tanstack/react-router: a card has no router. Links are
   plain anchors that do not navigate, and the current path is "/". */
const R = window.React;
const PATH = "/";

export function Link({
	to,
	className,
	activeProps,
	onClick,
	children,
	...rest
}) {
	const active = to === PATH && activeProps?.className;
	return R.createElement(
		"a",
		{
			...rest,
			href: to,
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
