/* the automatic JSX runtime, over the frame's React.createElement */
const R = window.React;

function jsx(type, props, key) {
	const { children, ...rest } = props || {};
	if (key !== undefined) rest.key = key;
	if (children === undefined) return R.createElement(type, rest);
	return Array.isArray(children)
		? R.createElement(type, rest, ...children)
		: R.createElement(type, rest, children);
}

export { jsx, jsx as jsxs, jsx as jsxDEV };
export const Fragment = R.Fragment;
