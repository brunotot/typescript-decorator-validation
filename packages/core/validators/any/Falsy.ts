import Decorator from "../../src/decorators";
import ParamsExtractorService from "../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * Creates a validator decorator for falsy value validation.
 *
 * @typeparam T - The type of the decorated property (optional).
 * @param props - (Optional) An object with an optional custom error message.
 * @param props.message - (Optional) A custom error message to display when validation fails. If not provided, a default error message is used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage to validate if a value is falsy
 * class User {
 *   //@Falsy()
 *   isActive: boolean;
 * }
 *
 * @example
 * // Example 2: Custom error message
 * class AppConfig {
 *   //@Falsy({ message: "App is not disabled" })
 *   isDisabled: boolean;
 * }
 */
export default function Falsy<T extends $.Objects.Optional>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (value, _, locale) => ({
      key: "Falsy",
      message: ParamsExtractorService.message(
        props,
        TranslationService.translate(locale, "Falsy"),
        locale
      ),
      valid: !value,
    }),
  });
}
