/* react and react-dom come from the preview frame's globals (React 18 UMD) */
const R = window.React;
export default R;
export const {
	useState,
	useEffect,
	useRef,
	useCallback,
	useContext,
	useMemo,
	useSyncExternalStore,
	createContext,
	createElement,
	Fragment,
} = R;
