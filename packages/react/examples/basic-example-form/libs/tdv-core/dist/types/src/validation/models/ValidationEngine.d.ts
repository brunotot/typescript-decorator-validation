import API from "../../../index";
/**
 * A class responsible for processing and validating class instances through its decorated validators.
 *
 * @typeParam TClass - The type of the class being processed.
 * @typeParam TBody - The type of the payload body. Defaults to `TClass`.
 *
 * @remarks
 * This class uses a `CacheMap` to store validation results for better performance.
 * It also leverages `FieldValidatorMetaService` to retrieve metadata about the class being processed.
 */
export declare class ValidationEngine<TClass> {
    #private;
    locale: API.Localization.LocaleResolver.Locale;
    /**
     * Constructs a new `ValidationEngine` instance.
     *
     * @param clazz - The class type to be processed.
     * @param config - Optional configuration settings.
     */
    constructor(clazz: API.Utilities.Types.Class<TClass>, config?: API.Validation.Config<TClass>);
    registerAsync(handler: (props: API.Validation.AsyncEventResponseProps<TClass>) => void): void;
    unregisterAsync(): void;
    /**
     * Gets the default host value.
     */
    get hostDefault(): any;
    /**
     * Checks if the given payload is valid.
     *
     * @param payload - The payload to validate.
     *
     * @returns `true` if valid, `false` otherwise.
     */
    isValid(payload: API.Utilities.Objects.Payload<TClass>): boolean;
    /**
     * Retrieves detailed error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing detailed error messages.
     */
    getDetailedErrors(payload?: API.Utilities.Objects.Payload<TClass>): API.Strategy.Factory.Impl.DetailedErrors<TClass>;
    /**
     * Retrieves error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing error messages.
     */
    getErrors(payload?: API.Utilities.Objects.Payload<TClass>): API.Strategy.Factory.Impl.Errors<TClass>;
    /**
     * Validates the given payload and updates the cache.
     *
     * @param payload - The payload to validate. If not provided, a new instance of the class will be used.
     *
     * @returns An object containing the validation result, which includes:
     * - `valid`: A boolean indicating the overall validity of the payload.
     * - `detailedErrors`: An object containing detailed error messages for each field.
     * - `errors`: An object containing simplified error messages for each field.
     *
     * @remarks
     * This function performs the following steps:
     * 1. Initializes an empty `Errors` and `DetailedErrors` object.
     * 2. Iterates through each field defined in the metadata of the class.
     * 3. Calls `validateField` for each field to get the validation result.
     * 4. Updates the `Errors` and `DetailedErrors` objects with the validation result.
     * 5. Determines the overall validity of the payload.
     * 6. Updates the cache with the new validation result.
     *
     * The actual field validation is delegated to the `ValidationStrategy` implementations, which are determined by the metadata service.
     *
     * @example
     * ```typescript
     * const engine = new ValidationEngine(MyClass);
     * const result = engine.validate(myPayload);
     * console.log(result.valid);  // Output: true or false
     * ```
     */
    validate(payload?: API.Utilities.Objects.Payload<TClass>): API.Validation.Response<TClass>;
    /**
     * Validates a single field within the entity.
     *
     * @typeParam K - The key type of the field.
     *
     * @param payload - The payload containing the field value.
     * @param fieldName - The name of the field to validate.
     *
     * @returns An array containing the detailed error message and the error message.
     */
    validateField<K extends keyof TClass>(payload: any, fieldName: K): API.Strategy.Factory.getStrategyResult<TClass, K>;
}
//# sourceMappingURL=ValidationEngine.d.ts.map