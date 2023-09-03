import { useEffect, useState } from "react";
import ns from "./types";

export default function useEffectWhenMounted(
  fn: () => void,
  deps: ns.UseAfterMountDependencies = []
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
