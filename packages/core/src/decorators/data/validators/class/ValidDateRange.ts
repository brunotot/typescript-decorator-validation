import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { type ClassDecorator, createClassValidator } from "@decorators/factory/forClass";
import { type DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects, type Types } from "@utilities";

/** Internal validation function for {@link ValidDateRange} validator. */
function isValidDateRangeValid(value: any, startDateField: string, endDateField: string): boolean {
  Objects.assertType("object", value);
  return value[startDateField].getTime() < value[endDateField].getTime();
}

/**
 * Checks if {@link Date} `startDateField` is before {@link Date} `endDateField` of a class.
 *
 * @key {@link DecoratorKeys.VALID_DATE_RANGE}
 * @typeParam T - Class type on which the decorator is put.
 * @param startDateField - Field name for the start {@link Date} property.
 * @param endDateField - Field name for the end {@link Date} property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns An instance of the class decorator.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * \@ValidDateRange("start", "end")
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * \@ValidDateRange("start", "end", { message: "Dates are not in a valid range" })
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * \@ValidDateRange("start", "end", { groups: ["UPDATE"] })
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * \@ValidDateRange("start", "end", { message: "Dates are not in a valid range", groups: ["UPDATE"] })
 * class DateForm {
 *   start: Date;
 *   end: Date;
 * }
 * ```
 */
export function ValidDateRange<T extends Types.Class>(
  startDateField: string,
  endDateField: string,
  options?: DecoratorOptions
): ClassDecorator<T> {
  return createClassValidator<T>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.VALID_DATE_RANGE),
      valid: isValidDateRangeValid(value, startDateField, endDateField),
      message: buildMessageProp(
        options,
        locale,
        translate(
          locale,
          DecoratorKeys.VALID_DATE_RANGE,
          convertCamelCaseToText(endDateField, false),
          convertCamelCaseToText(startDateField)
        )
      ),
    }),
    buildGroupsProp(options)
  );
}

function convertCamelCaseToText(camelCase: string, capitalizeFirstLetter: boolean = true): string {
  if (camelCase === camelCase.toUpperCase()) {
    return camelCase;
  }

  const result = camelCase.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/ (\w)/g, str => str.toLowerCase());

  return capitalizeFirstLetter ? result.replace(/^./, str => str.toUpperCase()) : result;
}
