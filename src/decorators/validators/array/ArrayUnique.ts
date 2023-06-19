import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import InferredType from "../../../model/enum/InferredType";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
  hash,
  HashFunctionType,
  isArrayUnique,
} from "../../../model/utility/object.utility";
import {
  BasicValidatorProviderType,
  BasicValidatorProviderTypeMandatoryMessage,
} from "../../../model/utility/type.utility";

export type ArrayUniqueType<T> = {
  hash?: HashFunctionType<T>;
};

const DEFAULTS: BasicValidatorProviderTypeMandatoryMessage<
  ArrayUniqueType<any>
> = {
  hash,
  groups: [],
  message: ErrorMessage.ArrayUnique(),
};

export default function ArrayUnique<T>(
  props: BasicValidatorProviderType<string, ArrayUniqueType<T>> = DEFAULTS
) {
  const hashFn = typeof props === "string" ? hash : props.hash ?? hash;

  return ValidatorService.buildFieldValidatorDecorator<any[]>({
    expectedType: InferredType.ARRAY,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayUnique",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArrayUnique()
      ),
      valid: isArrayUnique(
        array,
        (obj1, obj2) => hashFn(obj1) === hashFn(obj2)
      ),
    }),
  });
}
