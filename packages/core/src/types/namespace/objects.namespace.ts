import StrategyFactory from "../../engine/strategy/factory";
import HelperNamespace from "./helper.namespace";

/**
 * A collection of utility functions and types related to objects and data.
 */
namespace Objects {
  /**
   * Function that checks if two values of type `T` are equal.
   *
   * @typeParam T - The type to compare.
   */
  export type Equals<T> = ((a: T, b: T) => boolean) & {};

  /**
   * A type that represents an optional value.
   *
   * @typeParam T - The type of the optional value.
   */
  export type Optional<T = undefined> = T extends undefined
    ? any
    : T | undefined | null;

  /**
   * A function that hashes a value of type `T` and returns a number.
   *
   * @typeParam T - The type to hash.
   */
  export type Hash<T> = ((value: T) => number) & {};

  /**
   * A predicate function for filtering arrays.
   *
   * @typeParam T - The type of the array elements.
   */
  export type ArrayPredicate<T> = ((
    value: T,
    index: number,
    array: T[]
  ) => boolean) & {};

  /**
   * A type that extracts input properties from an object type `T`.
   *
   * @typeParam T - The object type.
   */
  export type Inputs<T> = {
    [P in keyof T]-?: HelperNamespace.IfEquals<
      { [Q in P]: T[P] },
      { -readonly [Q in P]: T[P] },
      P
    >;
  }[keyof T];

  /**
   * Removes duplicate elements from an array while preserving order.
   *
   * @typeParam T - The type of the elements in the array.
   */
  export function unique<T>(data: T[]): T[] {
    return [...new Set(data)];
  }

  /**
   * Checks if an error object has errors.
   *
   * @typeParam T - The type of the errors.
   */
  export function hasErrors<T>(data: StrategyFactory.Impl.Errors<T>): boolean {
    const data0: any = data;
    if (Array.isArray(data0)) {
      return data0.some((item) => hasErrors(item));
    } else if (typeof data0 === "object" && data0 !== null) {
      return Object.values(data0).some((value: any) => hasErrors(value));
    } else if (typeof data0 === "string") {
      return true;
    }
    return false;
  }

  /**
   * Checks if a value is not `null`, `undefined`, `false`, an empty array, an empty string, or an invalid Date.
   *
   * @typeParam T - The type of the value.
   */
  export function hasValue<T>(
    obj: T | undefined
  ): obj is NonNullable<typeof obj> {
    return !(
      obj === undefined ||
      obj === null ||
      obj === false ||
      (Array.isArray(obj) && obj.length === 0) ||
      (typeof obj === "string" && obj.trim().length === 0) ||
      (obj instanceof Date && obj.toString() === "Invalid Date")
    );
  }

  /**
   * Recursively checks if two values are deep equal.
   */
  export function deepEquals(val1: any, val2: any): boolean {
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
  }

  /**
   * Hashes a value of any type and returns a number.
   */
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
      return (val ?? "")
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
}

export default Objects;
