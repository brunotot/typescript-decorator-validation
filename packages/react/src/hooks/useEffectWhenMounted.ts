import { useEffect, useState } from "react";

type UseEffectWhenMountedDeps = any[];

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
