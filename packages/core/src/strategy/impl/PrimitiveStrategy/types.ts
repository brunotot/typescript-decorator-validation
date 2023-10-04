import Validation from "../../../engine";
import Booleans from "../../../utilities/impl/Booleans";
import Types from "../../../utilities/impl/Types";

namespace PrimitiveStrategyType {
  export const Name = "primitive" as const;

  export type SimpleErrors = string[];

  export type DetailedErrors = Validation.Result[];

  // prettier-ignore
  export type matches<T, K extends keyof T> = Booleans.isAnyOf<T[K], Types.Primitive>;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Booleans.isUndefined<R> 
      ? T[K] 
  : R;
}

export default PrimitiveStrategyType;
