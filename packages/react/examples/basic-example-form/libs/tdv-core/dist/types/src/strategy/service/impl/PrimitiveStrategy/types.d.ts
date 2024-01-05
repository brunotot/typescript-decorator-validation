import type API from "../../../../../index";
/**
 * Namespace for Primitive Strategy Types.
 */
declare namespace PrimitiveStrategyType {
    /**
     * Constant name identifier for this strategy.
     */
    const Name: "primitive";
    /**
     * Represents the simplified error structure for validating primitive types.
     */
    type SimpleErrors = string[];
    /**
     * Represents the detailed error structure for validating primitive types.
     */
    type DetailedErrors = API.Validation.ValidationResult[];
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = API.Utilities.Booleans.isAnyOf<T[K], API.Utilities.Types.PrimitiveType>;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = true extends API.Utilities.Booleans.isUndefined<R> ? T[K] : R;
}
export default PrimitiveStrategyType;
//# sourceMappingURL=types.d.ts.map