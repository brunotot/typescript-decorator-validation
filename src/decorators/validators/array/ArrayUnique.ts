import ValidatorService, { Nullable } from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";

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

export default function ArrayUnique<K, T extends K[]>(
  props: BasicValidatorProviderType<string, ArrayUniqueType<K>> = DEFAULTS
) {
  const hashFn = typeof props === "string" ? hash : props.hash ?? hash;

  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (array) => ({
      key: "ArrayUnique",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ArrayUnique()
      ),
      valid: isArrayUnique(
        array ?? [],
        (obj1, obj2) => hashFn(obj1) === hashFn(obj2)
      ),
    }),
  });
}
