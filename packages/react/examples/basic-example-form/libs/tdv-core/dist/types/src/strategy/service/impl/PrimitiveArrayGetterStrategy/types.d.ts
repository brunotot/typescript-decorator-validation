import type API from "../../../../../index";
/**
 * Namespace for PrimitiveArrayGetter Strategy Types.
 */
declare namespace PrimitiveArrayGetterStrategyType {
    /**
     * Constant name identifier for this strategy.
     */
    const Name: "get (): primitive[]";
    /**
     * Represents the simplified error structure for validating arrays of primitive types.
     *
     * - `node`: An array of string messages that represent validation errors at the array level.
     * - `children`: A two-dimensional array of string messages that represent validation errors for each element in the array.
     */
    type SimpleErrors = {
        node: string[];
        children: string[][];
    };
    /**
     * Represents the detailed error structure for validating arrays of primitive types.
     *
     * - `node`: An array of `ValidationResult` objects that represent detailed validation errors at the array level.
     * - `children`: A two-dimensional array of `ValidationResult` objects that represent detailed validation errors for each element in the array.
     */
    type DetailedErrors = {
        node: API.Validation.ValidationResult[];
        children: API.Validation.ValidationResult[][];
    };
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = true extends API.Utilities.Booleans.isGetter<T, K> ? API.Utilities.Arrays.getArrayType<T[K]> extends never ? false : API.Utilities.Booleans.isAnyOf<API.Utilities.Arrays.getArrayType<T[K]>, API.Utilities.Types.PrimitiveType> : false;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = true extends API.Utilities.Booleans.isUndefined<R> ? T[K] : {
        node: R;
        children: R[];
    };
}
export default PrimitiveArrayGetterStrategyType;
//# sourceMappingURL=types.d.ts.map