import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * Creates a validator decorator for minimum length validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param props - An object with the minimum length value.
 * @param props.value - The minimum length required.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with a minimum length of 5
 * class User {
 *   //@MinLength({ value: 5 })
 *   username: string;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class SecureUser {
 *   //@MinLength({
 *   //   value: 8,
 *   //   message: "Username must be at least 8 characters long",
 *   // })
 *   username: string;
 * }
 */
export default function MinLength<T extends $.Objects.Optional<string>>(
  props: Decorator.PartialProps<number>
) {
  const min = typeof props === "number" ? props : props.value;
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "MinLength",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "MinLength", min),
        locale
      ),
      valid: (value ?? "").length >= min,
    }),
  });
}
