import makeValidator from "../../src/decorators/decorator.facade";
import Validation from "../../src/types/namespace/validation.namespace";

export default function Rule<T>(
  props:
    | Validation.Evaluator<T>
    | {
        isValid: Validation.Evaluator<T>;
        groups?: Validation.GroupsParam;
      }
) {
  return makeValidator<T>({
    isValid: "isValid" in props ? props.isValid : props,
    groups: "isValid" in props ? props.groups : [],
  });
}
