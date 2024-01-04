import type API from "../../../../../index";
/**
 * Namespace for Function Strategy Types.
 */
declare namespace FunctionStrategyType {
    /**
     * Constant name identifier for this strategy.
     */
    const Name: "function";
    /**
     * Type definition for simple errors in this strategy.
     */
    type SimpleErrors = string | null;
    /**
     * Type definition for detailed errors in this strategy.
     */
    type DetailedErrors = API.Validation.ValidationResult | null;
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = API.Utilities.Booleans.isFunction<T[K]>;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = true extends API.Utilities.Booleans.isUndefined<R> ? T[K] : API.Utilities.Arrays.getArrayType<R> | null;
}
export default FunctionStrategyType;
//# sourceMappingURL=types.d.ts.map