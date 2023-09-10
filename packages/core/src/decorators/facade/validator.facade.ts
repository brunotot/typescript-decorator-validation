import MetadataProcessor from "../../model/processor/MetadataProcessor";
import { ValidationEvaluator } from "../../types/ValidationEvaluator.type";
import { makeDecorator } from "../decorator.factory";
import { Decorator } from "../types/Decorator.type";
import {
  ValidationGroup,
  ValidationGroupProp,
} from "../types/DecoratorProps.type";

export type ValidatorBuilder<T> = {
  isValid: ValidationEvaluator<T>;
  groups?: ValidationGroupProp;
};

export function makeValidator<T>(builder: ValidatorBuilder<T>): Decorator<T> {
  return makeDecorator<T>((key, processor) => {
    saveMetadata(processor, key, builder.groups!, builder.isValid);
  });
}

function getSanitizedGroups(unsanitizedGroups?: ValidationGroupProp) {
  return Array.isArray(unsanitizedGroups)
    ? unsanitizedGroups
    : unsanitizedGroups !== undefined
    ? [unsanitizedGroups]
    : ([] as ValidationGroup[]);
}

function saveMetadata(
  processor: MetadataProcessor,
  key: string,
  groups: ValidationGroupProp,
  isValid: ValidationEvaluator<any>
) {
  const validate = processor.field(key);
  validate.rules.root.add({
    groups: getSanitizedGroups(groups),
    validate: isValid,
  });
}
