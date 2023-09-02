import { ConstructorType } from "../types/Class.type";

export function getClassFieldNames<T>(
  constructor: ConstructorType<T>
): string[] {
  const instance = new constructor();
  return [
    ...getPropertyNames(instance),
    ...getPropertyNames((instance as any).__proto__),
  ];
}

function getPropertyNames(object: any): string[] {
  return Object.getOwnPropertyNames(object).filter(
    (property) => property !== "constructor"
  );
}
