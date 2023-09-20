import ValidationMetaService from "../reflection/service/impl/reflection.service.validation";
import Decorator from "../types/namespace/decorator.namespace";
import Objects from "../types/namespace/objects.namespace";
import Validation from "../types/namespace/validation.namespace";
import { makeDecorator } from "./decorator.factory";

export function makeValidator<T>({
  groups,
  isValid,
}: Validation.Builder<T>): Decorator.Type<T> {
  return makeDecorator<T>((key, processor) => {
    saveMetadata(processor, key, isValid, groups);
  });
}

function sanitizeGroups(param?: Validation.GroupsParam): Validation.Groups {
  return Array.isArray(param)
    ? Objects.unique(param)
    : param !== undefined
    ? [param]
    : [];
}

function saveMetadata(
  meta: ValidationMetaService,
  key: string,
  isValid: Validation.Evaluator<any>,
  groups?: Validation.GroupsParam
) {
  const fieldDescriptor = meta.getUntypedDescriptor(key);
  const rootRules = fieldDescriptor.rules.root;
  rootRules.add({
    groups: sanitizeGroups(groups),
    validate: isValid,
  });
}
