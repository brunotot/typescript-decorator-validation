import Validation from "../../../engine";
import Booleans from "../../../utilities/impl/Booleans";
import Types from "../../../utilities/impl/Types";
import PrimitiveStrategyType from "../PrimitiveStrategy/types";

namespace PrimitiveGetterStrategyType {
  export const Name = `get (): ${PrimitiveStrategyType.Name}` as const;

  export type SimpleErrors = string[];

  export type DetailedErrors = Validation.Result[];

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends Booleans.isGetter<T, K>
      ? Booleans.isAnyOf<T[K], Types.Primitive>
      : false;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Booleans.isUndefined<R> 
      ? T[K] 
  : R;
}

export default PrimitiveGetterStrategyType;
