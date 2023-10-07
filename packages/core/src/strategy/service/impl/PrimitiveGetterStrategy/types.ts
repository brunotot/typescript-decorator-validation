import API from "api";

import PrimitiveStrategyType from "../PrimitiveStrategy/types";

namespace PrimitiveGetterStrategyType {
  export const Name = `get (): ${PrimitiveStrategyType.Name}` as const;

  export type SimpleErrors = string[];

  export type DetailedErrors = API.Validation.Result[];

  // prettier-ignore
  export type matches<T, K extends keyof T> = 
    true extends API.Utilities.Booleans.isGetter<T, K>
      ? API.Utilities.Booleans.isAnyOf<T[K], API.Utilities.Types.Primitive>
      : false;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends API.Utilities.Booleans.isUndefined<R> 
      ? T[K] 
  : R;
}

export default PrimitiveGetterStrategyType;
