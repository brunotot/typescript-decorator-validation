import { type Locale } from "@localization";
import { type EventEmitter, type Objects } from "@utilities";
import { Events } from "@validation/models/Events";
import type { ValidationMetadataEntry, ValidationResult } from "@validation/types";

/**
 * Manages a collection of validation rules for a specific field.
 *
 * @typeParam TFieldType - The type of the field.
 *
 * @remarks
 * This class is responsible for storing and applying validation rules to a specific field.
 * It allows you to validate the field against a payload and a set of validation groups.
 */
export class ValidationMetadata<TFieldType> {
  readonly #contents: Array<ValidationMetadataEntry<TFieldType, any>>;

  /**
   * Gets the contents of the reflection rule.
   *
   * @returns An array of `Validation.Metadata` for the field.
   */
  get contents(): Array<ValidationMetadataEntry<TFieldType, any>> {
    return this.#contents;
  }

  /**
   * Constructs a new `ReflectionRule` instance.
   */
  constructor(contents: Array<ValidationMetadataEntry<TFieldType, any>> = []) {
    this.#contents = contents;
  }

  /**
   * Validates a field against a payload and a set of validation groups.
   *
   * @typeParam TBody - The type of the payload.
   *
   * @param value - The value of the field to validate.
   * @param payload - The payload to validate against.
   * @param groups - The validation groups to consider.
   *
   * @returns An array of `ValidationResult` containing the validation results.
   */
  validate<TBody>(
    value: TFieldType,
    payload: Objects.Payload<TBody>,
    groups: string[],
    locale: Locale,
    args?: Record<string, any>,
    emitter?: EventEmitter,
    field?: string
  ): ValidationResult[] {
    function isPromise(value: any): value is Promise<any> {
      return Boolean(value && typeof value.then === "function");
    }

    const groupedValidators = this.#groupedValidators(this.#contents, groups);
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const results = groupedValidators.map(({ validate }) =>
      validate(value, payload, locale, args ?? {})
    );
    // eslint-disable-next-line @typescript-eslint/array-type
    const asyncResults = results.filter(v => isPromise(v)) as Promise<ValidationResult>[];
    this.#handleAsyncResults(asyncResults, emitter, field);
    const syncResults = results.filter(v => !isPromise(v)) as ValidationResult[];
    return syncResults.filter(({ valid }) => !valid);
  }

  #handleAsyncResults(
    asyncResults: Array<Promise<ValidationResult>>,
    emitter?: EventEmitter,
    field?: string
  ): void {
    if (!emitter) return;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all(asyncResults).then(results => {
      results.forEach(value => {
        emitter.emit(Events.ASYNC_VALIDATION_COMPLETE, {
          key: field,
          value,
        });
      });
    });
  }

  /**
   * Removes and returns the last validation rule from the collection.
   * @returns The last `Validation.Metadata` that was removed.
   */
  pop(): ValidationMetadataEntry<TFieldType, any> {
    return this.#contents.pop()!;
  }

  /**
   * Adds a new validation rule to the collection.
   * @param rule - The `Validation.Metadata` to add.
   */
  add(rule: ValidationMetadataEntry<TFieldType, any>): void {
    this.#contents.push(rule);
  }

  /**
   * Filters validators based on the provided validation groups.
   * @typeParam TFieldType - The type of the field being validated.
   * @param data - The array of metadata for each validator.
   * @param groups - The validation groups to filter by.
   * @returns An array of filtered validators.
   */
  #groupedValidators<TFieldType>(
    data: Array<ValidationMetadataEntry<TFieldType, any>>,
    groups: string[]
  ): Array<ValidationMetadataEntry<TFieldType, any>> {
    return data.filter((entry: ValidationMetadataEntry<TFieldType, any>) => {
      return groups.length > 0
        ? entry.meta.groups?.some((o: any) => groups.includes(o))
        : entry.meta.groups?.length === 0;
    });
  }
}
