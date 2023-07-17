import MetadataProcessor from "../../processor/MetadataProcessor";
import { makeDecorator } from "../decorator.factory";
import { Decorator } from "../types/Decorator.type";
import {
  ValidationGroupParamType,
  ValidatorBuilder,
} from "../../model/utility/type.utility";
import {
  ValidationFn,
  ValidationGroupType,
} from "../../processor/EntityProcessor";

export function makeValidator<T>(builder: ValidatorBuilder<T>): Decorator<T> {
  return makeDecorator<T>((key, processor) => {
    saveMetadata(processor, key, builder.groups!, builder.isValid);
  });
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
