import { MessageFn, t } from "../MessageService";

type ErrorMessageGenerator = {
  FutureDate: MessageFn<[Date]>;
  PastDate: MessageFn<[Date]>;
  ArrayEmpty: MessageFn;
  ArrayContains: MessageFn<[any]>;
  Decimal: MessageFn<[number]>;
  ArraySizeMin: MessageFn<[number, number]>;
  ArraySizeRange: MessageFn<[number, number, number]>;
  ArraySizeMax: MessageFn<[number, number]>;
  ArraySizeExact: MessageFn<[number, number]>;
  InvalidUsageOfDecoratorValid: MessageFn;
  IncompatibleTypes: MessageFn<[string, string, string[], string]>;
  MinLength: MessageFn<[number]>;
  MaxLength: MessageFn<[number]>;
  Required: MessageFn;
  Pattern: MessageFn<[string]>;
  Email: MessageFn;
  PasswordUppercaseViolation: MessageFn;
  PasswordLowercaseViolation: MessageFn;
  PasswordNumbersViolation: MessageFn;
  PasswordSpecialsViolation: MessageFn;
  PasswordLengthViolation: MessageFn<[number]>;
  URL: MessageFn;
  ValueMin: MessageFn<[number, number]>;
  ValueMax: MessageFn<[number, number]>;
  ValueRange: MessageFn<[number, number, number]>;
  Digits: MessageFn<[number, number]>;
  InvalidDigitsParams: MessageFn<[number, number]>;
  ExactLength: MessageFn<[number]>;
  RangeLength: MessageFn<[number, number]>;
  XML: MessageFn;
  JSON: MessageFn;
  IPAddress: MessageFn;
  CreditCardNumber: MessageFn;
  Date: MessageFn<[string]>;
  Time: MessageFn<[string, boolean]>;
  Numeric: MessageFn;
  Alpha: MessageFn;
  Integer: MessageFn<[number]>;
  Positive: MessageFn<[number]>;
  Negative: MessageFn<[number]>;
  NonNegative: MessageFn<[number]>;
  NonPositive: MessageFn<[number]>;
  Truthy: MessageFn;
  Falsy: MessageFn;
  ArrayUnique: MessageFn;
  TodayDate: MessageFn<[Date]>;
};

const ErrorMessage: ErrorMessageGenerator = {
  TodayDate: (date: Date) => t("TodayDate", date?.toDateString()),
  FutureDate: (date: Date) => t("FutureDate", date?.toDateString()),
  PastDate: (date: Date) => t("PastDate", date?.toDateString()),
  ArrayEmpty: () => t("ArrayEmpty"),
  ArrayContains: (o: any) => t("ArrayContains", JSON.stringify(o, null, 2)),
  Decimal: (actual: number) => t("Decimal", actual),
  ArraySizeMin: (min: number, actual: number) => t("ArraySizeMin", min, actual),
  ArraySizeRange: (min: number, max: number, actual: number) =>
    t("ArraySizeRange", min, max, actual),
  ArraySizeMax: (max: number, actual: number) => t("ArraySizeMax", max, actual),
  ArraySizeExact: (exact: number, actual: number) =>
    t("ArraySizeExact", exact, actual),
  InvalidUsageOfDecoratorValid: () => t("InvalidUsageOfDecoratorValid"),
  IncompatibleTypes: (
    className: string,
    property: string,
    expectedType: string[],
    actualType: string
  ) =>
    t(
      "IncompatibleTypes",
      property,
      className,
      expectedType.join(", "),
      actualType
    ),
  MinLength: (min: number) => t("MinLength", min),
  MaxLength: (max: number) => t("MaxLength", max),
  Required: () => t("Required"),
  Pattern: (regex: string) => t("Pattern", regex),
  Email: () => t("Email"),
  PasswordUppercaseViolation: () => t("PasswordUppercaseViolation"),
  PasswordLowercaseViolation: () => t("PasswordLowercaseViolation"),
  PasswordNumbersViolation: () => t("PasswordNumbersViolation"),
  PasswordSpecialsViolation: () => t("PasswordSpecialsViolation"),
  PasswordLengthViolation: (length: number) =>
    t("PasswordLengthViolation", length),
  URL: () => t("URL"),
  ValueMin: (value: number, actual: number) => t("ValueMin", value, actual),
  ValueMax: (value: number, actual: number) => t("ValueMax", value, actual),
  ValueRange: (min: number, max: number, actual: number) =>
    t("ValueRange", min, max, actual),
  Digits: (maxInteger: number, maxFraction: number) =>
    t("Digits", maxInteger, maxFraction),
  InvalidDigitsParams: (maxInteger: number, maxFraction: number) =>
    t("InvalidDigitsParams", maxInteger, maxFraction),
  ExactLength: (exact: number) => t("ExactLength", exact),
  RangeLength: (min: number, max: number) => t("RangeLength", min, max),
  XML: () => t("XML"),
  JSON: () => t("JSON"),
  IPAddress: () => t("IPAddress"),
  CreditCardNumber: () => t("CreditCardNumber"),
  Date: (format: string) => t("Date", format),
  Time: (locale: string, hour12: boolean) =>
    t("Time", locale, hour12 ? "12-hour" : "24:hour"),
  Numeric: () => t("Numeric"),
  Alpha: () => t("Alpha"),
  Integer: (actual: number) => t("Integer", actual),
  Positive: (actual: number) => t("Positive", actual),
  Negative: (actual: number) => t("Negative", actual),
  NonNegative: (actual: number) => t("NonNegative", actual),
  NonPositive: (actual: number) => t("NonPositive", actual),
  Truthy: () => t("Truthy"),
  Falsy: () => t("Falsy"),
  ArrayUnique: () => t("ArrayUnique"),
};

export default ErrorMessage;
