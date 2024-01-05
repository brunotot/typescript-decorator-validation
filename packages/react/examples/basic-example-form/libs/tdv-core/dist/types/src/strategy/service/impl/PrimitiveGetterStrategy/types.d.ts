import type API from "../../../../../index";
/**
 * Namespace for PrimitiveGetter Strategy Types.
 */
declare namespace PrimitiveGetterStrategyType {
    /**
     * Constant name identifier for this strategy.
     */
    const Name: "get (): primitive";
    /**
     * Represents the simplified error structure for validating getter methods that return primitive types.
     */
    type SimpleErrors = string[];
    /**
     * Represents the detailed error structure for validating getter methods that return primitive types.
     */
    type DetailedErrors = API.Validation.ValidationResult[];
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = true extends API.Utilities.Booleans.isGetter<T, K> ? API.Utilities.Booleans.isAnyOf<T[K], API.Utilities.Types.PrimitiveType> : false;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = true extends API.Utilities.Booleans.isUndefined<R> ? T[K] : R;
}
export default PrimitiveGetterStrategyType;
//# sourceMappingURL=types.d.ts.map