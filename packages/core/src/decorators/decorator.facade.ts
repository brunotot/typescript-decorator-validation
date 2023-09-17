import ValidationMetaService from "../reflection/service/impl/reflection.service.validation";
import { ValidationEvaluator } from "../types/validation/ValidationEvaluator.type";
import { makeDecorator } from "./decorator.factory";
import {
  Decorator,
  ValidationGroup,
  ValidationGroupProp,
} from "./decorator.types";

export type ValidatorBuilder<T> = {
  isValid: ValidationEvaluator<T>;
  groups?: ValidationGroupProp;
};

export function makeValidator<T>({
  groups,
  isValid,
}: ValidatorBuilder<T>): Decorator<T> {
  return makeDecorator<T>((key, processor) => {
    saveMetadata(processor, key, isValid, groups);
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
  meta: ValidationMetaService,
  key: string,
  isValid: ValidationEvaluator<any>,
  groups?: ValidationGroupProp
) {
  const fieldDescriptor = meta.descriptor<any, string>(key);
  const rootRules = fieldDescriptor.rules.root;
  rootRules.add({
    groups: getSanitizedGroups(groups),
    validate: isValid,
  });
}
