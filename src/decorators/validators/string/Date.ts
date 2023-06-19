import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

const DATE_KEY = "Date";
const DEFAULT_DATE_FORMAT = "en-US";

function isValidDate(dateString: string, format: string): boolean {
  // TODO: Finish Date
  return true;
}

export type DateProps = {
  format?: string;
};

export default function ValidDate(
  props?: BasicValidatorProviderType<string, DateProps>
) {
  const format = props
    ? typeof props === "string"
      ? DEFAULT_DATE_FORMAT
      : props.format
    : DEFAULT_DATE_FORMAT;
  const formatSanitized = format ?? DEFAULT_DATE_FORMAT;

  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: DATE_KEY,
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Date(formatSanitized)
      ),
      valid: isValidDate(value, formatSanitized),
    }),
  });
}
