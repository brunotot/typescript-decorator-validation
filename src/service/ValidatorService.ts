import { ValidationGroupParamType } from "../model/utility/type.utility";
import { Decorator, buildDecorator } from "./DecoratorService";
import MetadataProcessor from "../processor/MetadataProcessor";
import {
  ValidationFn,
  ValidationGroupType,
} from "../handler/ValidationHandler";

export type ValidatorBuilder<T> = {
  isValid: ValidationFn<T>;
  groups?: ValidationGroupParamType;
};

export type Nullable<GUARD = undefined> = GUARD extends undefined
  ? any
  : GUARD | undefined | null;

class ValidatorService {
  validatorDecoratorFactory<T>(builder: ValidatorBuilder<T>): Decorator<T> {
    return buildDecorator<T>((key, processor) => {
      saveMetadata(processor, key, builder.groups!, builder.isValid);
    });
  }
}

function getSanitizedGroups(unsanitizedGroups?: ValidationGroupParamType) {
  return Array.isArray(unsanitizedGroups)
    ? unsanitizedGroups
    : unsanitizedGroups !== undefined
    ? [unsanitizedGroups]
    : ([] as ValidationGroupType[]);
}

function saveMetadata(
  processor: MetadataProcessor,
  key: string,
  groups: ValidationGroupParamType,
  isValid: ValidationFn<any>
) {
  const validate = processor.getValidationProcessor(key);
  validate.appendNode({
    groups: getSanitizedGroups(groups),
    validate: isValid,
  });
}

export default new ValidatorService();
