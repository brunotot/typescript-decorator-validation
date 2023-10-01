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
    defaultValue: F
  ) {
    super(descriptor, defaultValue);
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
  test(
    value: any[],
    context: any,
    groups: Validation.Group[] = [],
    locale: Localization.Locale
  ): [ns.DetailedErrors, ns.SimpleErrors] {
    const valueArray = value ?? [];
    const rootRules = super.fieldDescriptor!.rules.root;
    const foreachRules = super.fieldDescriptor!.rules.foreach;
    const rootResult = rootRules.validate(
      valueArray as any,
      context,
      groups,
      locale
    );

    const primitiveArrayDetailedErrors = {
      node: rootResult,
      children: valueArray.map((v) =>
        foreachRules.validate(v, context, groups, locale)
      ),
    };

    const primitiveArraySimpleErrors = {
      node: Validation.buildSimpleErrors(rootResult),
      children: primitiveArrayDetailedErrors.children.map((v) =>
        v.map((r) => r.message)
      ),
    };

    return [primitiveArrayDetailedErrors, primitiveArraySimpleErrors];
  }
}
