import { Class } from "../types/Class.type";

export function getClassFieldNames<TClass>(
  constructor: Class<TClass>
): (keyof TClass)[] {
  const instance: any = new constructor();
  const prototype = instance.__proto__;
  const instanceProps = getPropertyNames(instance);
  const prototypeProps = getPropertyNames(prototype);
  const uniquePropsSet = new Set([...instanceProps, ...prototypeProps]);
  const uniquePropsArray = [...uniquePropsSet];
  return uniquePropsArray as (keyof TClass)[];
}

function getPropertyNames(classInstance: any): string[] {
  return Object.getOwnPropertyNames(classInstance ?? {}).filter(
    (property) => property !== "constructor"
  );
}
