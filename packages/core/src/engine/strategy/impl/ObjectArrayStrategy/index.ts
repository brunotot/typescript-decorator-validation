import ValidationEngine from "../../..";
import Localization from "../../../../localization";
import ReflectionDescriptor from "../../../../reflection/models/reflection.descriptor";
import ClassValidatorMetaService from "../../../../reflection/service/impl/ClassValidatorMetaService";
import Validation from "../../../../types/namespace/validation.namespace";
import ValidationStrategy from "../../strategy";
import ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
 *
 * @extends ValidationStrategy<F, ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>>
 */
export default class ObjectArrayStrategy<F> extends ValidationStrategy<
  F,
  ns.DetailedErrors<F>,
  ns.SimpleErrors<F>
> {
  /**
   * Initializes the `ObjectArrayStrategy` class by calling the superclass constructor with the provided descriptor and default value.
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
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of object types.
   *
   * @param value - The array of object values to be validated.
   * @param context - The context in which the validation is taking place.
   * @param groups - Optional validation groups to consider during validation.
   *
   * @returns A tuple containing `ObjectArrayDetailedErrors<F>` and `ObjectArraySimpleErrors<F>`.
   *
   * @remarks
   * The method validates both the array as a whole (`field`) and each individual object (`children`)
   * using the appropriate validation rules.
   */
  test(
    value: any[],
    context: any,
    groups: Validation.Group[] = [],
    locale: Localization.Locale
  ): [ns.DetailedErrors<F>, ns.SimpleErrors<F>] {
    const _value = value ?? [];
    const fieldClass = super.descriptor.thisClass!;
    const rootResult = super.fieldDescriptor!.rules.root.validate(
      _value,
      context,
      groups,
      locale
    );

    const classDecService = ClassValidatorMetaService.inject(fieldClass);

    const objectArrayDetailedErrors = {
      host: _value.map((v) =>
        classDecService.data.validate(v, context, groups, locale)
      ),
      node: rootResult,
      children: _value.map((v) =>
        new ValidationEngine<F>(
          fieldClass,
          super.getValidationEngineConfig(groups)
        ).getDetailedErrors(v)
      ),
    };

    const objectArraySimpleErrors = {
      host: objectArrayDetailedErrors.host.map(Validation.buildSimpleErrors),
      node: Validation.buildSimpleErrors(rootResult),
      children: _value.map((v) =>
        new ValidationEngine<F>(
          fieldClass,
          super.getValidationEngineConfig(groups)
        ).getErrors(v)
      ),
    };

    return [objectArrayDetailedErrors, objectArraySimpleErrors];
  }
}
