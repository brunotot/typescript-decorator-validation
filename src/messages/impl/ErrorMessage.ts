import { MessageFn, t } from "../message.factory";

// prettier-ignore
type ErrorMessageGenerator = {
              Alpha: MessageFn;
       Alphanumeric: MessageFn;
      ArrayContains: MessageFn<[any]>;
         ArrayEmpty: MessageFn;
     ArraySizeExact: MessageFn<[number, number]>;
       ArraySizeMax: MessageFn<[number, number]>;
       ArraySizeMin: MessageFn<[number, number]>;
     ArraySizeRange: MessageFn<[number, number, number]>;
        ArrayUnique: MessageFn;
               Date: MessageFn<[string]>;
            Decimal: MessageFn<[number]>;
             Digits: MessageFn<[number, number]>;
              Email: MessageFn;
        ExactLength: MessageFn<[number]>;
              Falsy: MessageFn;
         FutureDate: MessageFn<[Date]>;
          IPAddress: MessageFn;
            Integer: MessageFn<[number]>;
      InvalidDigits: MessageFn<[number, number]>;
               JSON: MessageFn;
          MaxLength: MessageFn<[number]>;
          MinLength: MessageFn<[number]>;
           Negative: MessageFn<[number]>;
        NonNegative: MessageFn<[number]>;
        NonPositive: MessageFn<[number]>;
            Numeric: MessageFn;
     PasswordLength: MessageFn<[number]>;
  PasswordLowercase: MessageFn;
    PasswordNumbers: MessageFn;
   PasswordSpecials: MessageFn;
  PasswordUppercase: MessageFn;
           PastDate: MessageFn<[Date]>;
           Positive: MessageFn<[number]>;
        RangeLength: MessageFn<[number, number]>;
           Required: MessageFn;
               Time: MessageFn<[string, boolean]>;
          TodayDate: MessageFn<[Date]>;
             Truthy: MessageFn;
                URL: MessageFn;
           ValueMax: MessageFn<[number, number]>;
           ValueMin: MessageFn<[number, number]>;
         ValueRange: MessageFn<[number, number, number]>;
                XML: MessageFn;
          Uppercase: MessageFn;
          Lowercase: MessageFn;
};

// prettier-ignore
const ErrorMessage: ErrorMessageGenerator = {
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
  URL: () => t("URL"),
  ValueMax: (value: number, actual: number) => t("ValueMax", value, actual),
  ValueMin: (value: number, actual: number) => t("ValueMin", value, actual),
  ValueRange: (min: number, max: number, actual: number) => t("ValueRange", min, max, actual),
  XML: () => t("XML"),
  Uppercase: () => t("Uppercase"),
  Lowercase: () => t("Lowercase"),
};

export default ErrorMessage;
