import MetadataKey from "../model/enum/MetadataKey";
import { ValidationGroupParamType } from "../model/utility/type.utility";
import { Decorator, buildDecorator } from "./DecoratorService";
import MetadataService from "./MetadataService";
import {
  ValidationFn,
  ValidationGroupType,
} from "../handler/ValidationHandler";
import MetadataProcessor from "../processor/MetadataProcessor";
import ValidationProcessor from "../processor/ValidationProcessor";

export type ValidatorBuilder<T> = {
  isValid: ValidationFn<T>;
  groups?: ValidationGroupParamType;
};

export type Nullable<GUARD = undefined> = GUARD extends undefined
  ? any
  : GUARD | undefined | null;

type SaveMetadataProps = {
  key: string;
  processor: MetadataProcessor;
  groups?: ValidationGroupParamType;
  isValid: ValidationFn<any>;
};

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
  const validate = processor.getOrDefault(key, () => new ValidationProcessor());
  processor.set(key, validate);
  validate.appendChild({
    groups: getSanitizedGroups(groups),
    validate: isValid,
  });
}

export default new ValidatorService();
