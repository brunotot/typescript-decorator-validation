import Decorator from "../types/namespace/decorator.namespace";
import Validation from "../types/namespace/validation.namespace";
import makeDecorator from "./decorator.factory";

export default function makeValidator<T>({
  groups,
  isValid,
}: Validation.Builder<T>): Decorator.Type<T> {
  return makeDecorator<T>((key, validationMetaService) =>
    validationMetaService.addValidator(key, isValid, groups)
  );
}
