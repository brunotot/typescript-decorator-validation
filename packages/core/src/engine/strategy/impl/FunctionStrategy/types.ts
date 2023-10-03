import Arrays from "../../../../types/namespace/arrays.namespace";
import Condition from "../../../../types/namespace/condition.namespace";
import Validation from "../../../../types/namespace/validation.namespace";

namespace FunctionStrategyType {
  export const Name = "function" as const;

  export type SimpleErrors = string | null;

  export type DetailedErrors = Validation.Result | null;

  // prettier-ignore
  export type matches<T, K extends keyof T> = Condition.isFunction<T[K]>

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Condition.isUndefined<R> 
      ? T[K] 
  : Arrays.getArrayType<R> | null;
}

export default FunctionStrategyType;
