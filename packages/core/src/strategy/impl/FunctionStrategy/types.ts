import Validation from "../../../engine";
import Arrays from "../../../utilities/impl/Arrays";
import Booleans from "../../../utilities/impl/Booleans";

namespace FunctionStrategyType {
  export const Name = "function" as const;

  export type SimpleErrors = string | null;

  export type DetailedErrors = Validation.Result | null;

  // prettier-ignore
  export type matches<T, K extends keyof T> = Booleans.isFunction<T[K]>

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Booleans.isUndefined<R> 
      ? T[K] 
  : Arrays.getArrayType<R> | null;
}

export default FunctionStrategyType;
