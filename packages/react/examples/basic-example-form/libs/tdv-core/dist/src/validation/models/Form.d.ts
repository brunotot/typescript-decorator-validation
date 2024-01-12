import { Locale } from "../../localization";
import { DetailedErrorsResponse, SimpleErrorsResponse } from "../../strategy";
import { Objects, Types } from "../../utilities";
import type { AsyncEventResponseProps, FormConfig, FormValidateResponse, ValidationResult } from "../types";
/**
 * Checks if an error object has errors.
 * @typeParam T - The type of the errors.
 */
export declare function hasErrors<T>(data: SimpleErrorsResponse<T>): boolean;
/**
 * Transforms a plain object into an instance of the given class.
 * @param clazz - The class to transform the object into.
 * @param object - The object to transform.
 * @typeParam TClass - The type of the class.
 * @returns An instance of TClass.
 */
export declare function toClass<const TClass extends Types.Class<any>>(clazz: TClass, object?: Objects.Payload<Types.UnwrapClass<TClass>>): Types.UnwrapClass<TClass>;
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
export declare class Form<TClass> {
    #private;
    __id: string;
    locale: Locale;
    get async(): {
        register: (handler: (props: AsyncEventResponseProps<TClass>) => void) => void;
        unregister: () => void;
        delay: number;
    };
    /**
     * Gets the default host value.
     */
    get defaultValue(): any;
    /**
     * Constructs a new `ValidationEngine` instance.
     *
     * @param clazz - The class type to be processed.
     * @param config - Optional configuration settings.
     */
    constructor(clazz: Types.Class<TClass>, config?: FormConfig<TClass>);
    /**
     * Checks if the given payload is valid.
     *
     * @param payload - The payload to validate.
     *
     * @returns `true` if valid, `false` otherwise.
     */
    isValid(payload: Objects.Payload<TClass>): boolean;
    /**
     * Retrieves detailed error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing detailed error messages.
     */
    getDetailedErrors(payload?: Objects.Payload<TClass>): DetailedErrorsResponse<TClass>;
    /**
     * Retrieves error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing error messages.
     */
    getErrors(payload?: Objects.Payload<TClass>): SimpleErrorsResponse<TClass>;
    getGlobalErrors(payload?: Objects.Payload<TClass>): ValidationResult[];
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
    validate(payload?: Objects.Payload<TClass>, args?: Record<string, any>): FormValidateResponse<TClass>;
    /**
     * Registers an event listener for the specified event.
     * @param event - The name of the event to listen for.
     * @param handler - The event handler function.
     */
    listen(event: string, handler: (this: Form<TClass>) => void): void;
    /**
     * Emits an event with optional data.
     * @param event - The name of the event to emit.
     * @param data - Optional data to pass along with the event.
     */
    emit(event: string, data?: any): void;
}
//# sourceMappingURL=Form.d.ts.map