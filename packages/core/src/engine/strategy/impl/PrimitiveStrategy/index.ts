import Localization from "../../../../localization";
import ReflectionDescriptor from "../../../../reflection/models/reflection.descriptor";
import Validation from "../../../../types/namespace/validation.namespace";
import ValidationStrategy from "../../strategy";
import ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
 *
 * @typeParam F - The type of the field being validated.
 *
 * @extends ValidationStrategy<F, Validation.Result[], string[]>
 */
export default class PrimitiveStrat<F> extends ValidationStrategy<
  F,
  ns.DetailedErrors,
  ns.SimpleErrors
> {
  /**
   * Initializes the `PrimitiveStrat` class by calling the superclass constructor with the provided descriptor and default value.
   *
   * @param descriptor - The reflection descriptor for the field.
   * @param defaultValue - The default value for the parent object.
   */
  constructor(
    descriptor: ReflectionDescriptor.ReflectionDescriptor<F, any>,
    defaultValue: F
  ) {
    super(descriptor, defaultValue);
  }

  /**
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
   *
   * @param value - The value to be validated.
   * @param context - The context in which the validation is taking place.
   * @param groups - Optional validation groups to consider during validation.
   *
   * @returns A tuple containing an array of detailed validation results (`Validation.Result[]`) and an array of simplified error messages (`string[]`).
   */
  test(
    value: any,
    context: any,
    groups: Validation.Group[] = [],
    locale: Localization.Locale
  ): [ns.DetailedErrors, ns.SimpleErrors] {
    const rootResult = this.fieldDescriptor!.rules.root.validate(
      value,
      context,
      groups,
      locale
    );

    return [rootResult, Validation.buildSimpleErrors(rootResult)];
  }
}
