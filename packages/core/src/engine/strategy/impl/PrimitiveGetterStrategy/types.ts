import Condition from "../../../../types/namespace/condition.namespace";
import Types from "../../../../types/namespace/types.namespace";
import Validation from "../../../../types/namespace/validation.namespace";
import PrimitiveStrategyType from "../PrimitiveStrategy/types";

namespace PrimitiveGetterStrategyType {
  export const Name = `get (): ${PrimitiveStrategyType.Name}` as const;

  export type SimpleErrors = string[];

  export type DetailedErrors = Validation.Result[];

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends Condition.isGetter<T, K>
      ? Condition.isAnyOf<T[K], Types.Primitive>
      : false;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Condition.isUndefined<R> 
      ? T[K] 
  : R;
}

export default PrimitiveGetterStrategyType;
