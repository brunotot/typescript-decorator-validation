import { Locale, getLocale } from "./Locale";
import MessageFormatEn from "./impl/messages.en";
import MessageFormatHr from "./impl/messages.hr";

export function sprintf(str: string, ...args: any[]) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

export type MessageFormatType = {
  [key: string]: string;
};

type ErrorMessageValue = (...args: any) => string;

type ErrorMessageType = {
  [key: string]: ErrorMessageValue;
};

const LocaleMessageService = {
  [Locale.HR]: MessageFormatHr,
  [Locale.EN]: MessageFormatEn,
};

function t(key: string, ...args: any[]): string {
  const locale = getLocale();
  const service = LocaleMessageService[locale];
  return sprintf(service[key], ...args);
}

const ErrorMessage: ErrorMessageType = {
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
  NotEmpty: () => t("NotEmpty"),
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
