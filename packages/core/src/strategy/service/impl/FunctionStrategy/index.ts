import API from "api";

import EventEmitter from "events";
import { AbstractValidationStrategyService } from "../../../service/AbstractValidationStrategyService";
import ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
 *
 * @typeParam F - The type of the field being validated.
 *
 * @extends AbstractValidationStrategyService<F, Validation.Result[], string[]>
 */
export class FunctionStrat<F> extends AbstractValidationStrategyService<
  F,
  ns.DetailedErrors,
  ns.SimpleErrors
> {
  private static EMPTY: [ns.DetailedErrors, ns.SimpleErrors] = [null, null];

  /**
   * Initializes the `FunctionStrat` class by calling the superclass constructor with the provided descriptor and default value.
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
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
   *
   * @param value - The value to be validated.
   * @param context - The context in which the validation is taking place.
   *
   * @returns A tuple containing an array of detailed validation results (`Validation.Result[]`) and an array of simplified error messages (`string[]`).
   */
  test(
    value: API.Utilities.Types.Function,
    _context: any
  ): [ns.DetailedErrors, ns.SimpleErrors] {
    const result: API.Validation.Result | Promise<API.Validation.Result> =
      value.bind(_context)();
    if (result instanceof Promise) {
      result.then((validationResult) => {
        this.eventEmitter.emit("asyncValidationComplete", {
          key: this.fieldName,
          value: validationResult,
        });
      });
      return FunctionStrat.EMPTY;
    }

    return !!result.valid ? FunctionStrat.EMPTY : [result, result.message];
  }
}
