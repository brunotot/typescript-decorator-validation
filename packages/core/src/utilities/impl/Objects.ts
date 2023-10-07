import API from "api";

import Arrays from "./Arrays";
import Booleans from "./Booleans";
import Types from "./Types";

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
   * Filters out getters, functions and read-only properties from a type
   */
  // prettier-ignore
  export type Payload<T> = Types.Prettify<API.Utilities.Objects.Purify<{
    [K in keyof T]: true extends Booleans.isAnyOf<true, [
      Booleans.isGetter<T, K>,
      Booleans.isFunction<T[K]>,
    ]> 
      ? never     
      : true extends Booleans.isArray<T[K]>
        ? true extends Booleans.isPrimitive<Arrays.getArrayType<T[K]>>
          ? Arrays.setArrayDepth<Arrays.getArrayType<T[K]>, Arrays.getArrayDepth<T[K]>>
          : Arrays.setArrayDepth<Payload<Arrays.getArrayType<T[K]>>, Arrays.getArrayDepth<T[K]>>
        : true extends Booleans.isPrimitive<T[K]>
          ? T[K]
          : Payload<T[K]>
  }>>;

  /**
   * A conditional type that checks if types `X` and `Y` are equal. It returns type `A` if they are equal, and type `B` if they are not.
   *
   * @typeParam X - The first type.
   * @typeParam Y - The second type.
   * @typeParam A - The type to return if `X` and `Y` are equal.
   * @typeParam B - The type to return if `X` and `Y` are not equal.
   */
  export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B;

  /**
   * A type that excludes properties with values of type `TExclude` from `TParent`.
   *
   * @typeParam TParent - The parent type.
   * @typeParam TExclude - The type to exclude from `TParent`.
   */
  export type Exclude<TParent, TExclude> = Pick<
    TParent,
    Values<{
      [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude]
        ? never
        : Prop;
    }>
  >;

  /**
   * A type that removes properties with values of type `never` from `T`.
   *
   * @typeParam T - The type to purify.
   */
  export type Purify<T> = Objects.Exclude<T, never>;

  /**
   * A type that extracts the values from the properties of an object type `T`.
   *
   * @typeParam T - An object type.
   */
  export type Values<T> = T[keyof T];

  /**
   * A type that extracts input properties from an object type `T`.
   *
   * @typeParam T - The object type.
   */
  export type Inputs<T> = {
    [P in keyof T]-?: IfEquals<
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
  export function hasErrors<T>(
    data: API.Strategy.Factory.Impl.Errors<T>
  ): boolean {
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

  /**
   * Transforms a plain object into an instance of the given class.
   * @param clazz - The class to transform the object into.
   * @param object - The object to transform.
   * @typeParam TClass - The type of the class.
   * @returns An instance of TClass.
   */
  export function toClass<const TClass extends Types.Class<any>>(
    clazz: TClass,
    object?: Payload<Types.UnwrapClass<TClass>>
  ): Types.UnwrapClass<TClass> {
    function _toClass<const TConstructor extends Types.Class<any>>(
      clazz: TConstructor,
      object?: Payload<Types.UnwrapClass<TConstructor>> | Types.Array
    ): Types.UnwrapClass<TConstructor> {
      if (Array.isArray(object)) {
        return object.map((item) =>
          _toClass(clazz, item)
        ) as Types.UnwrapClass<TConstructor>;
      }

      const entries = Object.entries<any>(object ?? {});
      const meta =
        API.Reflection.Services.FieldValidatorMetaService.inject(clazz);
      const data: Record<string, any> = {};
      for (const [key, value] of entries) {
        const descriptor = meta.getUntypedDescriptor(key);
        const { thisClass } = descriptor;
        if (thisClass) {
          if (Array.isArray(value)) {
            data[key] = value.map((item) => _toClass(thisClass, item));
          } else {
            data[key] = toClass(thisClass, value);
          }
        } else {
          data[key] = value;
        }
      }

      const instance = new clazz();
      Object.entries(data).forEach(([k, v]) => (instance[k] = v));
      return instance;
    }
    return _toClass(clazz, object);
  }

  /**
   * Debounces a function.
   * @param fn - The function to debounce.
   * @param delay - The delay time in milliseconds.
   * @returns A debounced function.
   */
  export function debounce(fn: Function, delay: number) {
    let timeoutID: any = null;
    return (...args: any[]) => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => fn(...args), delay);
    };
  }
}

export default Objects;
