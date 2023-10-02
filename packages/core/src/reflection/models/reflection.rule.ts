import Localization from "../../localization";
import Helper from "../../types/namespace/helper.namespace";
import Validation from "../../types/namespace/validation.namespace";

/**
 * A predicate function to filter validation metadata based on validation groups.
 *
 * @typeParam TFieldType - The type of the field.
 *
 * @param groups - The validation groups to filter by.
 *
 * @returns A predicate function that takes a `Validation.Metadata` and returns a boolean.
 */
function validationGroupPredicate<TFieldType>(groups: Validation.Group[]) {
  return (meta: Validation.Metadata<TFieldType>) =>
    groups.length
      ? meta.groups.some((o) => groups.includes(o))
      : !meta.groups.length;
}

namespace ReflectionRuleNamespace {
  /**
   * Manages a collection of validation rules for a specific field.
   *
   * @typeParam TFieldType - The type of the field.
   *
   * @remarks
   * This class is responsible for storing and applying validation rules to a specific field.
   * It allows you to validate the field against a payload and a set of validation groups.
   */
  export class ReflectionRule<TFieldType> {
    #contents: Validation.Metadata<TFieldType>[];

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
      payload: Helper.Payload<TBody>,
      groups: Validation.Group[],
      locale: Localization.Locale
    ): Validation.Result[] {
      return this.#contents
        .filter(validationGroupPredicate(groups))
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
    add(rule: Validation.Metadata<TFieldType>) {
      this.#contents.push(rule);
    }
  }
}

export default ReflectionRuleNamespace;
