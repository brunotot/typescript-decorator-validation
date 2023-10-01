import Condition from "../../../../types/namespace/condition.namespace";
import Types from "../../../../types/namespace/types.namespace";
import Validation from "../../../../types/namespace/validation.namespace";

namespace PrimitiveStrategyType {
  export type SimpleErrors = string[];

  export type DetailedErrors = Validation.Result[];

  // prettier-ignore
  export type matches<T, K extends keyof T> = Condition.isAnyOf<T[K], Types.Primitive>;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Condition.isUndefined<R> 
      ? T[K] 
  : R;
}

export default PrimitiveStrategyType;
