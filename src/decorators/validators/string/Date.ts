import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/const/ErrorMessage";

const DATE_KEY = "Date";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";

function isValidDate(
  str: string,
  format: string = DEFAULT_DATE_FORMAT
): boolean {
  const dateFormat = format
    .replace(/YYYY/g, "yyyy")
    .replace(/DD/g, "dd")
    .replace(/MM/g, "mm");
  const dateRegex = new RegExp(`^${dateFormat}$`, "i");
  if (!dateRegex.test(str)) {
    return false;
  }

  const year = parseInt(str.substr(format.indexOf("YYYY"), 4));
  const month = parseInt(str.substr(format.indexOf("MM"), 2)) - 1;
  const day = parseInt(str.substr(format.indexOf("DD"), 2));

  if (year < 1 || month < 0 || month > 11 || day < 1) {
    return false;
  }

  if (month === 1 && day === 29) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }

  const maxDay = new window.Date(year, month + 1, 0).getDate();
  if (day > maxDay) {
    return false;
  }

  return true;
}

export type DateProps =
  | string
  | {
      format?: string;
      message?: string;
    };

export default function Date(props?: DateProps) {
  const format = props
    ? typeof props === "string"
      ? props
      : props.format
    : props;
  const formatSanitized = format ?? DEFAULT_DATE_FORMAT;
  const defaultMessage = ErrorMessage.Date(formatSanitized);
  const message = props
    ? typeof props === "string"
      ? DEFAULT_DATE_FORMAT
      : props.message ?? defaultMessage
    : defaultMessage;

  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    isValid: (value) => ({
      key: DATE_KEY,
      message,
      valid: isValidDate(value, formatSanitized),
    }),
  });
}
