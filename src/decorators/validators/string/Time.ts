import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

export type TimeProps = {
  locale?: string;
  hour12?: boolean;
  message?: string;
};

const DEFAULT_LOCALE = "en-US";
const DEFAULT_HOUR12 = true;
const DEFAULT_MESSAGE = ErrorMessage.Time(DEFAULT_LOCALE, DEFAULT_HOUR12);

function isValidTime(str: string, locale: string, hour12: boolean): boolean {
  let options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12,
  };
  let date = new Date(str);
  let formatter = new Intl.DateTimeFormat(locale, options);
  try {
    let formatted = formatter.format(date);
    return formatted === str;
  } catch (ignored) {
    return false;
  }
}

const DEFAULTS = {
  locale: DEFAULT_LOCALE,
  hour12: DEFAULT_HOUR12,
  message: DEFAULT_MESSAGE,
};

export default function Time(
  cfg: BasicValidatorProviderType<string, TimeProps> = DEFAULTS
) {
  const props =
    typeof cfg === "string" ? { ...DEFAULTS, message: DEFAULT_MESSAGE } : cfg;
  const { locale = DEFAULT_LOCALE, hour12 = DEFAULT_HOUR12 } = props;

  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Time",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Time(locale, hour12)
      ),
      valid: isValidTime(value, locale, hour12),
    }),
  });
}
