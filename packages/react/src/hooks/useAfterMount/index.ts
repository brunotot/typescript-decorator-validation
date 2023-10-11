import { useEffect, useState } from "react";
import type ns from "./types";

export default function useEffectWhenMounted(
  fn: () => void,
  deps: ns.UseAfterMountDependencies = []
): void {
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
