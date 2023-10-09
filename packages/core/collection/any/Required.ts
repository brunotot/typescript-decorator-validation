import API from "api";

/**
 * Creates a validator decorator which requires that a value must be present.
 *
 * @typeParam T - The type of the decorated property (any field type except class).
 * @param props - (Optional) An object with optional decorator-related props.
 * @returns A decorator function to use with class fields.
 *
 * @example
 * Example 1: Basic usage
 * ```ts
 * class Product {
 *   _@Required()
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   _@Required("Product name is mandatory")
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 3: Supplying a custom error message and groups
 * ```ts
 * class Product {
 *   _@Required({ message: "Product name is mandatory", groups: ["CREATE"] })
 *   name: string;
 * }
 * ```
 */
export function Required<T extends API.Utilities.Objects.Optional>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Required",
      valid: API.Utilities.Objects.hasValue(value),
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "Required"
        ),
        locale
      ),
    }),
  });
}
