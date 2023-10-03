import EventEmitter from "events";
import Localization from "../../../../localization";
import ReflectionDescriptor from "../../../../reflection/models/reflection.descriptor";
import Validation from "../../../../types/namespace/validation.namespace";
import ValidationStrategy from "../../strategy";
import ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of primitive types like numbers, strings, etc.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an array of primitives.
 *
 * @extends ValidationStrategy<F, PrimitiveArrayDetailedErrors, PrimitiveArraySimpleErrors>
 */
export default class PrimitiveArrayStrat<F> extends ValidationStrategy<
  F,
  ns.DetailedErrors,
  ns.SimpleErrors
> {
  /**
   * Initializes the `PrimitiveArrayStrat` class by calling the superclass constructor with the provided descriptor and default value.
   *
   * @param descriptor - The reflection descriptor for the field.
   * @param defaultValue - The default value for the parent object.
   */
  constructor(
    descriptor: ReflectionDescriptor.ReflectionDescriptor<F, any>,
    defaultValue: F,
    groups: Validation.Groups,
    locale: Localization.Locale,
    eventEmitter: EventEmitter,
    asyncDelay: number
  ) {
    super(descriptor, defaultValue, groups, locale, eventEmitter, asyncDelay);
  }

  /**
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of primitive types.
   *
   * @param value - The array of values to be validated.
   * @param context - The context in which the validation is taking place.
   * @param groups - Optional validation groups to consider during validation.
   *
   * @returns A tuple containing `PrimitiveArrayDetailedErrors` and `PrimitiveArraySimpleErrors`.
   *
   * @remarks
   * The method validates both the array as a whole (`node`) and each individual element (`children`)
   * using the appropriate validation rules.
   */
  test(value: any[], context: any): [ns.DetailedErrors, ns.SimpleErrors] {
    const valueArray = value ?? [];
    const rootResult = this.getRootErrors(valueArray, context);

    const details = {
      node: rootResult,
      children: valueArray.map((v) => this.getArrayItemErrors(v, context)),
    };

    const simple = {
      node: this.getErrorMessages(rootResult),
      children: details.children.map((v) => this.getErrorMessages(v)),
    };

    return [details, simple];
  }
}
