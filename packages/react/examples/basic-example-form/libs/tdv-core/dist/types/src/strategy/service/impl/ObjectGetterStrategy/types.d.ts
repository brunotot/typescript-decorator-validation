import type API from "../../../../../index";
import type * as StrategyFactory from "../../../models/StrategyFactory";
declare namespace ObjectGetterStrategyType {
    const Name: "(): composite";
    /**
     * Represents the simplified error structure for validating object types.
     *
     * @typeParam F - The type of the field being validated.
     *
     * - `root`: An array of string messages that represent validation errors at the object level.
     * - `data`: An `Errors<F>` object that represents validation errors for each property in the object.
     */
    type SimpleErrors<F> = {
        root: string[];
        data: StrategyFactory.Impl.Errors<F>;
    };
    /**
     * Represents the detailed error structure for validating object types.
     *
     * @typeParam F - The type of the field being validated.
     *
     * - `root`: An array of `ValidationResult` objects that represent detailed validation errors at the object level.
     * - `data`: A `DetailedErrors<F>` object that represents detailed validation errors for each property in the object.
     */
    type DetailedErrors<F> = {
        root: API.Validation.ValidationResult[];
        data: StrategyFactory.Impl.DetailedErrors<F>;
    };
    /**
     * Type guard to check if a certain field in a type matches this strategy.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     */
    type matches<T, K extends keyof T> = true extends API.Utilities.Booleans.isGetter<T, K> ? API.Utilities.Booleans.isObject<T[K]> : false;
    /**
     * Type for the handler function based on the field and result types.
     * @typeParam T - The type containing the field.
     * @typeParam K - The key of the field.
     * @typeParam R - The result type.
     */
    type handler<T, K extends keyof T, R> = true extends API.Utilities.Booleans.isUndefined<R> ? T[K] : {
        root: R;
        data: StrategyFactory.evaluate<T[K], R>;
    };
}
export default ObjectGetterStrategyType;
//# sourceMappingURL=types.d.ts.map