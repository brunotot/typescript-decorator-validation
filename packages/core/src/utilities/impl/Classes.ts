import { type Types } from "@utilities/impl/Types";

export namespace Classes {
  /**
   * Retrieves the names of all fields in a class.
   *
   * @param constructor - The class constructor.
   * @returns An array of field names.
   */
  export function getClassFieldNames<TClass>(constructor: Types.Class<TClass>): Array<keyof TClass> {
    function getPropertyNames(classInstance: any): string[] {
      return Object.getOwnPropertyNames(classInstance ?? {}).filter(property => property !== "constructor");
    }
    const instance: any = new constructor();
    const prototype = instance.__proto__;
    const instanceProps = getPropertyNames(instance);
    const prototypeProps = getPropertyNames(prototype);
    const uniquePropsSet = new Set([...instanceProps, ...prototypeProps]);
    const uniquePropsArray = [...uniquePropsSet];
    return uniquePropsArray as Array<keyof TClass>;
  }

  /**
   * Retrieves the property descriptor for a specific field in a class.
   *
   * @param constructor - The class constructor.
   * @param name - The name of the field.
   * @returns The property descriptor for the field.
   */
  export function getClassFieldDescriptor<TClass>(
    constructor: Types.Class<TClass>,
    name: keyof TClass
  ): PropertyDescriptor | undefined {
    const instance: any = new constructor();
    const prototype = instance.__proto__;
    return Object.getOwnPropertyDescriptor(prototype, name);
  }

  /**
   * Retrieves or initializes metadata for a given strategy.
   *
   * @param strategy - The strategy to get metadata for.
   * @returns The metadata object.
   */
  export function getMetadata(strategy: any /* MetaStrategy */): DecoratorMetadataObject {
    if (isClass(strategy)) {
      (Symbol as any).metadata ??= Symbol("Symbol.metadata");
      // @ts-expect-error
      strategy[Symbol.metadata] ??= {};
      // @ts-expect-error
      return strategy[Symbol.metadata]!;
    }
    if (strategy && !strategy.metadata) {
      strategy.metadata = {};
    }
    return strategy?.metadata ?? {};
  }

  /**
   * Checks if a given strategy is a class.
   *
   * @param strategy - The strategy to check.
   * @returns True if the strategy is a class, false otherwise.
   */
  export function isClass(strategy: any /* MetaStrategy */): strategy is Types.Class<any> {
    return typeof strategy === "function";
  }
}
