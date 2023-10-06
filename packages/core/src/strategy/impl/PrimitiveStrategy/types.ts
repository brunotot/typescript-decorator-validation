import API from "api";

namespace PrimitiveStrategyType {
  export const Name = "primitive" as const;

  export type SimpleErrors = string[];

  export type DetailedErrors = API.Validation.Result[];

  // prettier-ignore
  export type matches<T, K extends keyof T> = API.Utilities.Booleans.isAnyOf<T[K], API.Utilities.Types.Primitive>;

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends API.Utilities.Booleans.isUndefined<R> 
      ? T[K] 
  : R;
}

export default PrimitiveStrategyType;
