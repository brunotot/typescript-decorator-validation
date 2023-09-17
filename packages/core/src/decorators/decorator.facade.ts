import ValidationMetaService from "../reflection/service/impl/reflection.service.validation";
import Validation from "../types/namespace/validation.namespace";
import { makeDecorator } from "./decorator.factory";
import { Decorator } from "./decorator.types";

export function makeValidator<T>({
  groups,
  isValid,
}: Validation.Builder<T>): Decorator<T> {
  return makeDecorator<T>((key, processor) => {
    saveMetadata(processor, key, isValid, groups);
  });
}

function getSanitizedGroups(unsanitizedGroups?: Validation.SpreadableGroup) {
  return Array.isArray(unsanitizedGroups)
    ? unsanitizedGroups
    : unsanitizedGroups !== undefined
    ? [unsanitizedGroups]
    : ([] as Validation.Group[]);
}

function saveMetadata(
  meta: ValidationMetaService,
  key: string,
  isValid: Validation.Evaluator<any>,
  groups?: Validation.SpreadableGroup
) {
  const fieldDescriptor = meta.descriptor<any, string>(key);
  const rootRules = fieldDescriptor.rules.root;
  rootRules.add({
    groups: getSanitizedGroups(groups),
    validate: isValid,
  });
}
