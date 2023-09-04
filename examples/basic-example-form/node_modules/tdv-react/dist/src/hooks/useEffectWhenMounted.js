"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useEffectWhenMounted(fn, deps) {
    const [mounted, setMounted] = (0, react_1.useState)(deps.length === 0);
    (0, react_1.useEffect)(() => {
        setMounted(true);
    }, []);
    (0, react_1.useEffect)(() => {
        if (mounted) {
            fn();
        }
    }, deps);
}
exports.default = useEffectWhenMounted;
