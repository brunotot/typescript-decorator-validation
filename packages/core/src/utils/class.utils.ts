import { ConstructorType } from "../types/Class.type";

export function getClassFieldNames(constructor: ConstructorType): string[] {
  const instance = new constructor();
  return [
    ...getPropertyNames(instance),
    ...getPropertyNames(instance.__proto__),
  ];
}

function getPropertyNames(object: any): string[] {
  return Object.getOwnPropertyNames(object).filter(
    (property) => property !== "constructor"
  );
}
