import { $ } from "../types/namespace/Utility.ns";

export function isArrayUnique<T>(arr: T[], equals: $.Equals<T>): boolean {
  const set = new Set<T>();
  for (const val of arr) {
    for (const el of set) {
      if (equals(val, el)) {
        return false;
      }
    }
    set.add(val);
  }
  return true;
}
