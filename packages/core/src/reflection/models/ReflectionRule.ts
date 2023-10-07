import API from "api";

/**
 * A namespace containing all data and types for reflection (validation) rule.
 */
namespace ReflectionRule {
  /**
   * Manages a collection of validation rules for a specific field.
   *
   * @typeParam TFieldType - The type of the field.
   *
   * @remarks
   * This class is responsible for storing and applying validation rules to a specific field.
   * It allows you to validate the field against a payload and a set of validation groups.
   */
  export class Instance<TFieldType> {
    #contents: API.Validation.Metadata<TFieldType>[];

    /**
     * Gets the contents of the reflection rule.
     *
     * @returns An array of `Validation.Metadata` for the field.
     */
    get contents() {
      return this.#contents;
    }

    /**
     * Constructs a new `ReflectionRule` instance.
     */
    constructor() {
      this.#contents = [];
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
     * @returns An array of `Validation.Result` containing the validation results.
     */
    validate<TBody>(
      value: TFieldType,
      payload: API.Utilities.Objects.Payload<TBody>,
      groups: string[],
      locale: API.Localization.Resolver.LocaleResolver.Locale
    ): API.Validation.Result[] {
      return API.Decorator.groupedValidators(this.#contents, groups)
        .map(({ validate }) => validate(value, payload, locale))
        .filter(({ valid }) => !valid);
    }

    /**
     * Removes and returns the last validation rule from the collection.
     *
     * @returns The last `Validation.Metadata` that was removed.
     */
    pop() {
      return this.#contents.pop()!;
    }

    /**
     * Adds a new validation rule to the collection.
     *
     * @param rule - The `Validation.Metadata` to add.
     */
    add(rule: API.Validation.Metadata<TFieldType>) {
      this.#contents.push(rule);
    }
  }
}

export default ReflectionRule;
