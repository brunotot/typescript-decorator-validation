import t from "../message.factory";

/**
 * Collection of error messages for various validation scenarios.
 *
 * @remarks
 * Each key corresponds to a specific validation rule, and the value is a function that returns a localized error message.
 * The functions may take parameters to include dynamic values in the messages.
 *
 * @example
 * ```typescript
 * const message = errorMessages.Email();  // Might return: "Invalid email address."
 * ```
 */
// prettier-ignore
const errorMessages = {
              Alpha: () => t("Alpha"),
       Alphanumeric: () => t("Alphanumeric"),
      ArrayContains: (o: any) => t("ArrayContains", JSON.stringify(o, null, 2)),
         ArrayEmpty: () => t("ArrayEmpty"),
     ArraySizeExact: (exact: number, actual: number) => t("ArraySizeExact", exact, actual),
       ArraySizeMax: (max: number, actual: number) => t("ArraySizeMax", max, actual),
       ArraySizeMin: (min: number, actual: number) => t("ArraySizeMin", min, actual),
     ArraySizeRange: (min: number, max: number, actual: number) => t("ArraySizeRange", min, max, actual),
        ArrayUnique: () => t("ArrayUnique"),
               Date: (format: string) => t("Date", format),
            Decimal: (actual: number) => t("Decimal", actual),
             Digits: (maxInteger: number, maxFraction: number) => t("Digits", maxInteger, maxFraction),
              Email: () => t("Email"),
        ExactLength: (exact: number) => t("ExactLength", exact),
              Falsy: () => t("Falsy"),
         FutureDate: (date: Date) => t("FutureDate", date?.toDateString()),
          IPAddress: () => t("IPAddress"),
            Integer: (actual: number) => t("Integer", actual),
      InvalidDigits: (maxInteger: number, maxFraction: number) => t("InvalidDigits", maxInteger, maxFraction),
               JSON: () => t("JSON"),
          Lowercase: () => t("Lowercase"),
          MaxLength: (max: number) => t("MaxLength", max),
          MinLength: (min: number) => t("MinLength", min),
           Negative: (actual: number) => t("Negative", actual),
        NonNegative: (actual: number) => t("NonNegative", actual),
        NonPositive: (actual: number) => t("NonPositive", actual),
            Numeric: () => t("Numeric"),
     PasswordLength: (length: number) => t("PasswordLength", length),
  PasswordLowercase: () => t("PasswordLowercase"),
    PasswordNumbers: () => t("PasswordNumbers"),
   PasswordSpecials: () => t("PasswordSpecials"),
  PasswordUppercase: () => t("PasswordUppercase"),
           PastDate: (date: Date) => t("PastDate", date?.toDateString()),
           Positive: (actual: number) => t("Positive", actual),
        RangeLength: (min: number, max: number) => t("RangeLength", min, max),
           Required: () => t('Required'),
               Time: (locale: string, hour12: boolean) => t("Time", locale, hour12 ? "12-hour" : "24:hour"),
          TodayDate: (date: Date) => t("TodayDate", date?.toDateString()),
             Truthy: () => t("Truthy"),
          Uppercase: () => t("Uppercase"),
                URL: () => t("URL"),
           ValueMax: (value: number, actual: number) => t("ValueMax", value, actual),
           ValueMin: (value: number, actual: number) => t("ValueMin", value, actual),
         ValueRange: (min: number, max: number, actual: number) => t("ValueRange", min, max, actual),
                XML: () => t("XML"),
} as const;

export default errorMessages;
