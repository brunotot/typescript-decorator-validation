import { EventEmitter } from "events";
import Localization from "../localization";
import FieldValidatorMetaService from "../reflection/service/impl/FieldValidatorMetaService";
import Objects from "../utilities/impl/Objects";
import Types from "../utilities/impl/Types";
import StrategyFactory from "./../strategy/factory";
import CacheMap from "./models/cache.map";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

/**
 * A collection of types and functions related to validation.
 */
namespace Validation {
  /**
   * Represents a function that evaluates a value and returns a validation result.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Evaluator<T> = ((
    value: T,
    context: any,
    locale: Localization.Locale
  ) => Result) & {};

  /**
   * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Metadata<T> = {
    groups: string[];
    validate: Evaluator<T>;
  };

  /**
   * Represents the result of a validation, including the key, message, and whether it's valid.
   */
  export type Result = {
    key: string;
    message: string;
    valid: boolean;
  };
  export type AsyncEventResponseProps<TClass> = {
    errors: StrategyFactory.Impl.Errors<TClass>;
    detailedErrors: StrategyFactory.Impl.DetailedErrors<TClass>;
  };

  export type AsyncEventHandlerProps<TClass> = {
    key: keyof TClass;
    value: Validation.Result;
  };

  export type AsyncEventHandler<TClass> = (
    data: AsyncEventHandlerProps<TClass>
  ) => void;

  /**
   * Configuration options for entity processing.
   *
   * @typeParam TClass - The type of the default value.
   */
  export type Config<TClass> = {
    defaultValue?: Objects.Payload<TClass>;
    groups?: string[];
    locale?: Localization.Locale;
    asyncDelay?: number;
  };

  /**
   * The result of entity validation.
   *
   * @typeParam T - The type of the entity being validated.
   */
  export type Response<T> = {
    valid: boolean;
    detailedErrors: StrategyFactory.Impl.DetailedErrors<T>;
    errors: StrategyFactory.Impl.Errors<T>;
  };

  /**
   * A map for storing entity validation results.
   *
   * @typeParam TClass - The type of the class being cached.
   * @typeParam TClass - The type of the payload.
   */
  export type CacheMap<TClass> = CacheMap.CacheMap<
    Response<TClass>,
    Objects.Payload<TClass>
  >;

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
  export class Engine<TClass> {
    #eventListener!: AsyncEventHandler<TClass>;
    #eventEmitter: EventEmitter;
    #fieldValidatorMetaService: FieldValidatorMetaService;
    #groups: string[];
    #hostDefault: Objects.Payload<TClass>;
    #cacheMap: CacheMap<TClass>;
    #hostClass: Types.Class<TClass>;
    locale: Localization.Locale;
    #asyncDelay: number;
    #debounceMap: {
      [key in keyof TClass]: ReturnType<typeof Objects.debounce>;
    } = {} as any;

    /**
     * Constructs a new `ValidationEngine` instance.
     *
     * @param clazz - The class type to be processed.
     * @param config - Optional configuration settings.
     */
    constructor(clazz: Types.Class<TClass>, config?: Config<TClass>) {
      this.#asyncDelay = config?.asyncDelay ?? 300;
      this.#eventEmitter = new EventEmitter();
      this.#hostClass = clazz;
      this.locale = config?.locale ?? Localization.getLocale();
      this.#groups = Array.from(new Set(config?.groups ?? []));
      this.#hostDefault =
        config?.defaultValue ??
        (Objects.toClass(clazz) as Objects.Payload<TClass>);
      this.#fieldValidatorMetaService = FieldValidatorMetaService.inject(clazz);
      this.#cacheMap = new CacheMap.CacheMap(
        (state) => this.validate.bind(this)(state) as Response<TClass>
      );
    }

    public registerAsync(
      handler: (props: AsyncEventResponseProps<TClass>) => void
    ): void {
      this.unregisterAsync();
      this.#eventListener = ({
        key,
        value,
      }: AsyncEventHandlerProps<TClass>) => {
        const { valid } = value;
        const currentError: any = this.#cacheMap.get("errors");
        const currentDetailedError: any = this.#cacheMap.get("detailedErrors");

        if (valid) {
          currentDetailedError[key] = null;
          currentError[key] = null;
        } else {
          currentDetailedError[key] = value;
          currentError[key] = value.message;
        }

        const patched = this.#cacheMap.patch({
          valid,
          detailedErrors: currentDetailedError,
          errors: currentError,
        });

        handler({
          errors: patched.errors,
          detailedErrors: patched.detailedErrors,
        });
      };
      this.#eventEmitter.on("asyncValidationComplete", this.#eventListener);
    }

    public unregisterAsync(): void {
      if (!!this.#eventListener) {
        this.#eventEmitter.off("asyncValidationComplete", this.#eventListener);
      }
    }

    /**
     * Gets the default host value.
     */
    public get hostDefault(): any {
      return this.#hostDefault;
    }

    /**
     * Checks if the given payload is valid.
     *
     * @param payload - The payload to validate.
     *
     * @returns `true` if valid, `false` otherwise.
     */
    public isValid(payload: Objects.Payload<TClass>): boolean {
      return this.#cacheMap.get("valid", payload);
    }

    /**
     * Retrieves detailed error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing detailed error messages.
     */
    public getDetailedErrors(
      payload: Objects.Payload<TClass>
    ): StrategyFactory.Impl.DetailedErrors<TClass> {
      return this.#cacheMap.get("detailedErrors", payload);
    }

    /**
     * Retrieves error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing error messages.
     */
    public getErrors(
      payload: Objects.Payload<TClass>
    ): StrategyFactory.Impl.Errors<TClass> {
      return this.#cacheMap.get("errors", payload);
    }

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
    public validate(payload?: Objects.Payload<TClass>): Response<TClass> {
      const state: Objects.Payload<TClass> = Objects.toClass(
        this.#hostClass,
        payload
      ) as any;

      const errors: any = {};
      const detailedErrors: any = {};

      this.#fieldValidatorMetaService.getFields().forEach((field) => {
        const validation = this.validateField(state, field as keyof TClass);
        // @ts-expect-error
        detailedErrors[field] = validation[0];
        // @ts-expect-error
        errors[field] = validation[1];
      });

      return this.#cacheMap.patch(
        {
          valid: !Objects.hasErrors(errors),
          detailedErrors,
          errors,
        },
        state
      );
    }

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
    validateField<K extends keyof TClass>(
      payload: any,
      fieldName: K
    ): StrategyFactory.getStrategyResult<TClass, K> {
      const descriptor =
        this.#fieldValidatorMetaService.getUntypedDescriptor(fieldName);
      const stratImpl = new descriptor.StrategyImpl(
        descriptor,
        this.#hostDefault,
        this.#groups,
        this.locale,
        this.#eventEmitter
      );

      if (descriptor.strategy === "function") {
        if (!this.#debounceMap[fieldName]) {
          this.#debounceMap[fieldName] = Objects.debounce(
            (value: any, context: any) => {
              stratImpl.test(value, context);
            },
            this.#asyncDelay
          );
        }

        this.#debounceMap[fieldName](payload[fieldName], payload);

        return [
          (this.#cacheMap.get("detailedErrors") as any)?.[fieldName],
          (this.#cacheMap.get("errors") as any)?.[fieldName],
        ] as StrategyFactory.getStrategyResult<TClass, K>;
      }

      // @ts-expect-error
      return stratImpl.test(payload[fieldName], payload);
    }
  }
}

export default Validation;
