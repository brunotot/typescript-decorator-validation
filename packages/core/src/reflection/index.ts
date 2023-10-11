import type API from "api";

import ReflectionStrategyNamespace from "../strategy/models/StrategyMapper";
import ReflectionDescriptor from "./models/ReflectionDescriptor";
import ReflectionRule from "./models/ReflectionRule";
import * as _AbstractMetaService from "./service/AbstractMetaService";
import * as _ClassValidatorMetaService from "./service/impl/ClassValidatorMetaService";
import * as _FieldValidatorMetaService from "./service/impl/FieldValidatorMetaService";

/**
 * A namespace which holds data related to reading and manipulating metadata through reflection
 */
namespace Reflection {
  export import Descriptor = ReflectionDescriptor;

  /**
   * Retrieves the names of all fields in a class.
   *
   * @param constructor - The class constructor.
   * @returns An array of field names.
   */
  export function getClassFieldNames<TClass>(
    constructor: API.Utilities.Types.Class<TClass>
  ): Array<keyof TClass> {
    function getPropertyNames(classInstance: any): string[] {
      return Object.getOwnPropertyNames(classInstance ?? {}).filter(
        (property) => property !== "constructor"
      );
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
    constructor: API.Utilities.Types.Class<TClass>,
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
  export function getMetadata(strategy: MetaStrategy): DecoratorMetadataObject {
    if (isClass(strategy)) {
      (Symbol as any).metadata ??= Symbol("Symbol.metadata");
      strategy[Symbol.metadata] ??= {};
      return strategy[Symbol.metadata]!;
    }
    if (strategy && !strategy.metadata) {
      (strategy as any).metadata = {};
    }
    return strategy?.metadata;
  }

  /**
   * Checks if a given strategy is a class.
   *
   * @param strategy - The strategy to check.
   * @returns True if the strategy is a class, false otherwise.
   */
  export function isClass(
    strategy: MetaStrategy
  ): strategy is API.Utilities.Types.Class<any> {
    return typeof strategy === "function";
  }

  /**
   * Type alias for strategies that can either be a decorator context or a class.
   */
  export type MetaStrategy =
    | API.Decorator.Context
    | API.Utilities.Types.Class<any>
    | DecoratorContext;

  export import Rule = ReflectionRule;

  export import Strategy = ReflectionStrategyNamespace;

  /**
   * Collection of service classes for managing validators on class or field level.
   */
  export namespace Services {
    export import AbstractMetaService = _AbstractMetaService.AbstractMetaService;
    export import ClassValidatorMetaService = _ClassValidatorMetaService.ClassValidatorMetaService;
    export import FieldValidatorMetaService = _FieldValidatorMetaService.FieldValidatorMetaService;
  }
}

export default Reflection;
