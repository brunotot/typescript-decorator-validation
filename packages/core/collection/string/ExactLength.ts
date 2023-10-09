import API from "api";

/**
 * Checks if the decorated string contains an exact number of characters.
 *
 * @key ExactLength
 * @typeParam T - The type of the decorated property (nullable string) - optional if used in decorator context.
 * @param props - The exact length number or an object with the exact length number and optional arguments.
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Address {
 *   _@ExactLength(2)
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Address {
 *   _@ExactLength({ value: 2, message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Address {
 *   _@ExactLength({ value: 2, groups: ["UPDATE"] })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Address {
 *   _@ExactLength({ value: 2, groups: ["UPDATE"], message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 */
export function ExactLength<T extends API.Utilities.Objects.Optional<string>>(
  props: API.Decorator.Props.MultiArgsMessageOptional<number>
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  const exact = API.Decorator.args(props);
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "ExactLength",
      valid: (value ?? "").length === exact,
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "ExactLength",
          exact
        ),
        locale
      ),
    }),
  });
}
