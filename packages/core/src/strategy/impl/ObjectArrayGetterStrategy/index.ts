import API from "api";

import EventEmitter from "events";
import AbstractValidationStrat from "../../strategy";
import ObjectStrat from "../ObjectStrategy";
import ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
 *
 * @extends AbstractValidationStrat<F, ObjectArrayGetterDetailedErrors<F>, ObjectArrayGetterSimpleErrors<F>>
 */
export default class ObjectArrayGetterStrat<F> extends AbstractValidationStrat<
  F,
  ns.DetailedErrors<F>,
  ns.SimpleErrors<F>
> {
  /**
   * Initializes the `ObjectArrayGetterStrategy` class by calling the superclass constructor with the provided descriptor and default value.
   *
   * @param descriptor - The reflection descriptor for the field.
   * @param defaultValue - The default value for the parent object.
   */
  constructor(
    descriptor: API.Reflection.Descriptor.Instance<F, any>,
    defaultValue: F,
    groups: string[],
    locale: API.Localization.Resolver.LocaleResolver.Locale,
    eventEmitter: EventEmitter,
    asyncDelay: number
  ) {
    super(descriptor, defaultValue, groups, locale, eventEmitter, asyncDelay);
  }

  /**
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of object types.
   *
   * @param value - The array of object values to be validated.
   * @param context - The context in which the validation is taking place.
   * @param groups - Optional validation groups to consider during validation.
   *
   * @returns A tuple containing `ObjectArrayGetterDetailedErrors<F>` and `ObjectArrayGetterSimpleErrors<F>`.
   *
   * @remarks
   * The method validates both the array as a whole (`field`) and each individual object (`data`)
   * using the appropriate validation rules.
   */
  test(value: any[], context: any): [ns.DetailedErrors<F>, ns.SimpleErrors<F>] {
    const _value = value ?? [];
    const rootResult = this.getRootErrors(value, context);

    const getData = (element: any) => {
      const [errors, detailedErrors] = new ObjectStrat(
        this.fieldDescriptor,
        this.defaultValue,
        this.groups,
        this.locale,
        this.eventEmitter,
        this.engineCfg.asyncDelay!
      ).test(element, context);
      return {
        detailedErrors,
        errors,
      };
    };

    const getErrors = (element: any) => getData(element).errors;
    const getDetailedErrors = (element: any) => getData(element).detailedErrors;

    const details = {
      root: rootResult,
      data: _value.map(getDetailedErrors),
    };

    const simple = {
      root: this.getErrorMessages(rootResult),
      data: _value.map(getErrors),
    };

    return [details as any, simple as any];
  }
}
