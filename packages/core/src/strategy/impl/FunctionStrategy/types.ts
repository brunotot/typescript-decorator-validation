import API from "api";

namespace FunctionStrategyType {
  export const Name = "function" as const;

  export type SimpleErrors = string | null;

  export type DetailedErrors = API.Validation.Result | null;

  // prettier-ignore
  export type matches<T, K extends keyof T> = API.Utilities.Booleans.isFunction<T[K]>

  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends API.Utilities.Booleans.isUndefined<R> 
      ? T[K] 
  : API.Utilities.Arrays.getArrayType<R> | null;
}

export default FunctionStrategyType;
