import ObjectArrayStrat from "../../reflection/strategy/impl/object-array.strategy";
import ObjectStrat from "../../reflection/strategy/impl/object.strategy";
import PrimitiveArrayStrat from "../../reflection/strategy/impl/primitive-array.strategy";
import PrimitiveStrat from "../../reflection/strategy/impl/primitive.strategy";
import $ from "../../types/index";

namespace Validation {
  export type Group = string | number | symbol;

  export type Groups = Validation.Group[];

  export type GroupsParam = Validation.Group | Validation.Groups;

  export type Evaluator<T> = (value: T, context?: any) => Validation.Result;

  export type Metadata<T> = {
    groups: Validation.Group[];
    validate: Validation.Evaluator<T>;
  };

  export type Result = {
    key: string;
    message: string;
    valid: boolean;
  };

  // prettier-ignore
  export type getStrategyClass<Field> =
    true extends $.Condition.isPrimitiveArray<Field>
      ?PrimitiveArrayStrat<Field>
  
    :true extends $.Condition.isObjectArray<Field>
      ?ObjectArrayStrat<Field>
  
    :true extends $.Condition.isPrimitive<Field>
      ?PrimitiveStrat<Field>
  
    :true extends $.Condition.isObject<Field>
      ?ObjectStrat<Field>
  
  :never;

  export type getStrategyResult<Field> = ReturnType<
    getStrategyClass<Field>["test"]
  >;

  export type Builder<T> = {
    isValid: Validation.Evaluator<T>;
    groups?: Validation.GroupsParam;
  };

  export function isValid(validations: Result | Result[]): boolean {
    return Array.isArray(validations)
      ? !validations.some(({ valid }) => !valid)
      : validations.valid;
  }

  export function buildSimpleErrors(validations: Validation.Result[] = []) {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations)
      ? nonNullableValidations.map((e) => e.message)
      : [];
  }
}

export default Validation;
