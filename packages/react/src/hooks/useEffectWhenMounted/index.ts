import { useEffect, useState } from "react";
import { UseEffectWhenMountedDeps } from "./types";

export default function useEffectWhenMounted(
  fn: () => void,
  deps: UseEffectWhenMountedDeps
) {
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
