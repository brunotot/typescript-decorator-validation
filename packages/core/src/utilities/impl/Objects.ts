export namespace Objects {
  /**
   * A type that represents an optional value.
   *
   * @typeParam T - The type of the optional value.
   */
  export type Optional<T = undefined> = T extends undefined ? any : T | undefined | null;

  /**
   * A predicate function for filtering arrays.
   *
   * @typeParam T - The type of the array elements.
   */
  export type ArrayPredicate<T> = ((value: T, index: number, array: T[]) => boolean) & {};

  /**
   * Filters out getters, functions and read-only properties from a type
   */
  // prettier-ignore
  export type Payload<T> = any/* Types.Prettify<Purify<{
    [K in keyof T]: true extends Booleans.isAnyOf<true, [
      Booleans.isGetter<T, K>,
      Booleans.isFunction<T[K]>,
    ]>
      ? never
      : true extends Booleans.isArray<T[K]>
        ? true extends Booleans.isPrimitive<Arrays.getArrayType<T[K]>>
          ? T[K]
          : Arrays.setArrayDepth<Payload<Arrays.getArrayType<T[K]>>, Arrays.getArrayDepth<T[K]>>
        : true extends Booleans.isPrimitive<T[K]>
          ? T[K]
          : Payload<T[K]>
  }>> */;

  /**
   * A conditional type that checks if types `X` and `Y` are equal. It returns type `A` if they are equal, and type `B` if they are not.
   *
   * @typeParam X - The first type.
   * @typeParam Y - The second type.
   * @typeParam A - The type to return if `X` and `Y` are equal.
   * @typeParam B - The type to return if `X` and `Y` are not equal.
   */
  export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
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
      [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude] ? never : Prop;
    }>
  >;

  /**
   * A type that removes properties with values of type `never` from `T`.
   *
   * @typeParam T - The type to purify.
   */
  export type Purify<T> = Exclude<T, never>;

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
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
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
   * Debounces a function.
   * @param fn - The function to debounce.
   * @param delay - The delay time in milliseconds.
   * @returns A debounced function.
   */
  export function debounce(fn: Function, delay: number): Function {
    let timeoutID: any = null;
    return (...args: any[]) => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => fn(...args), delay);
    };
  }

  export type FieldType = "date" | "array" | "string" | "number" | "boolean" | "object";

  export function assertType(type: FieldType, value: any): void | never {
    if (value == null) return;

    if (type === "date") {
      if (value instanceof Date) return;
      throwTypeMismatchError(type, value);
    }

    if (type === "array") {
      if (Array.isArray(value)) return;
      throwTypeMismatchError(type, value);
    }

    if (typeof value === type) return;
    throwTypeMismatchError(type, value);
  }

  function throwTypeMismatchError(type: FieldType, value: any): never {
    throw new Error(`Type '${type}' is not assignable to type ${JSON.stringify(value)}`);
  }
}
