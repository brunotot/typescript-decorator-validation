import { useEffect, useState } from "react";
export default function useEffectWhenMounted(fn, deps = []) {
    const [mounted, setMounted] = useState(deps.length === 0);
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (mounted) {
            fn();
        }
    }, deps);
}
