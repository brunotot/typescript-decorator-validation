import { ValidationGroupType } from "../../handler/ValidationHandler";
import { Class } from "../type/class.type";
import { BasicValidatorProviderType } from "./type.utility";

export type EqualsType<T> = (obj1: T, obj2: T) => boolean;

export type HashFunctionType<T> = (obj: T) => number;

export type PredicateType<T> = (value: T, index: number, array: T[]) => boolean;

export function extractMessageFromValidatorProps<T extends object>(
  provider: BasicValidatorProviderType<any, T>,
  defaultMessage: string
) {
  if (!provider) {
    return defaultMessage;
  }
  const nullableMessage =
    typeof provider === "string" ? provider : provider.message;
  return !!nullableMessage?.length ? nullableMessage : defaultMessage;
}

export function extractGroupsFromValidatorProps<T extends object>(
  provider: BasicValidatorProviderType<any, T>
) {
  return typeof provider === "object"
    ? Array.isArray(provider.groups)
      ? provider.groups
      : provider.groups !== undefined && provider.groups !== null
      ? [provider.groups]
      : []
    : [];
}

export function isValidationGroupUnion(
  classGroups: ValidationGroupType[],
  validatorGroups: ValidationGroupType[]
) {
  return classGroups.length
    ? validatorGroups.some((o) => classGroups.includes(o))
    : !validatorGroups.length;
}

export function hasValue(obj: any): boolean {
  return !(
    obj === undefined ||
    obj === null ||
    obj === false ||
    (Array.isArray(obj) && obj.length === 0) ||
    (typeof obj === "string" && obj.trim().length === 0)
  );
}

export const deepEquals: EqualsType<any> = (val1: any, val2: any) => {
  if (val1 === val2) {
    return true;
  } else if (typeof val1 !== typeof val2) {
    return false;
  } else if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) {
      return false;
    }
    for (let i = 0; i < val1.length; i++) {
      if (!deepEquals(val1[i], val2[i])) {
        return false;
      }
    }
    return true;
  } else if (typeof val1 === "object" && val1 !== null && val2 !== null) {
    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (!deepEquals(val1[key], val2[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

export function hash(val: any): number {
  function stringHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash;
  }

  function numberHash(num: number): number {
    return num
      .toString()
      .split("")
      .reduce((hash, ch) => {
        hash = (hash << 5) - hash + ch.charCodeAt(0);
        return hash & hash;
      }, 0);
  }

  function booleanHash(bool: boolean): number {
    return bool ? 1 : 0;
  }

  function nullHash(): number {
    return 0;
  }

  function undefinedHash(): number {
    return 0;
  }

  function arrayHash(arr: any[]): number {
    return arr.reduce((hash, val) => {
      hash = (hash << 5) - hash + hash(val);
      return hash & hash;
    }, 0);
  }

  function objectHash(obj: any): number {
    return Object.keys(obj)
      .sort()
      .reduce((hashValue, key) => {
        hashValue = (hashValue << 5) - hashValue + hash(obj[key]);
        return hashValue & hashValue;
      }, 0);
  }

  function defaultHash(val: any): number {
    return val
      .toString()
      .split("")
      .reduce((hash: number, ch: string) => {
        hash = (hash << 5) - hash + ch.charCodeAt(0);
        return hash & hash;
      }, 0);
  }

  if (typeof val === "string") {
    return stringHash(val);
  } else if (typeof val === "number") {
    return numberHash(val);
  } else if (typeof val === "boolean") {
    return booleanHash(val);
  } else if (val === null) {
    return nullHash();
  } else if (val === undefined) {
    return undefinedHash();
  } else if (Array.isArray(val)) {
    return arrayHash(val);
  } else if (typeof val === "object") {
    return objectHash(val);
  } else {
    return defaultHash(val);
  }
}

export function isPrimitiveType(type: Class<any>) {
  return (
    type === Date || type === String || type === Number || type === Boolean
  );
}

export function isArrayUnique<T>(arr: T[], equals: EqualsType<T>): boolean {
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
