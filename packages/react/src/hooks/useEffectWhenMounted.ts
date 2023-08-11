import { useEffect, useState } from "react";

type UseEffectWhenMountedDeps = [any, ...any[]];

export default function useEffectWhenMounted(
  fn: () => void,
  deps: UseEffectWhenMountedDeps
) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fn();
    }
  }, deps);
}
