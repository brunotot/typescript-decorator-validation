import Localization from "../localization";
import ValidationConfigurer from "../reflection/service/impl/reflection.service.validation";
import $ from "../types/index";
import ns from "../types/namespace/entity-processor.namespace";
import EvaluatedStrategyFactory from "../types/namespace/evaluated-strategy-factory.namespace";
import Types from "../types/namespace/types.namespace";
import Validation from "../types/namespace/validation.namespace";
import CacheMap from "./models/cache.map";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

/**
 * A class responsible for processing and validating class instances through its decorated validators.
 *
 * @typeParam TClass - The type of the class being processed.
 * @typeParam TBody - The type of the payload body. Defaults to `TClass`.
 *
 * @remarks
 * This class uses a `CacheMap` to store validation results for better performance.
 * It also leverages `ValidationConfigurer` to retrieve metadata about the class being processed.
 */
export default class EntityProcessor<TClass, TBody = TClass> {
  #meta: ValidationConfigurer;
  #groups: Validation.Group[];
  #hostDefault: any;
  #cacheMap: ns.CacheMap<TClass, TBody>;
  locale: Localization.Locale;

  /**
   * Constructs a new `EntityProcessor` instance.
   *
   * @param clazz - The class type to be processed.
   * @param config - Optional configuration settings.
   */
  constructor(clazz: Types.Class<TClass>, config?: ns.Config<TBody>) {
    this.locale = config?.locale ?? Localization.getLocale();
    this.#groups = Array.from(new Set(config?.groups ?? []));
    this.#hostDefault = (config?.defaultValue ?? new clazz()) as TBody;
    this.#meta = ValidationConfigurer.inject(clazz);
    this.#cacheMap = new CacheMap.CacheMap(
      (state) => this.validate.bind(this)(state) as ns.Result<TClass>
    );
  }

  /**
   * Gets the default host value.
   */
  public get hostDefault() {
    return this.#hostDefault;
  }

  /**
   * Checks if the given payload is valid.
   *
   * @param payload - The payload to validate.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  public isValid(payload: EvaluatedStrategyFactory.Payload<TBody>): boolean {
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
    payload: EvaluatedStrategyFactory.Payload<TBody>
  ): EvaluatedStrategyFactory.DetailedErrors<TClass> {
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
    payload: EvaluatedStrategyFactory.Payload<TBody>
  ): EvaluatedStrategyFactory.Errors<TClass> {
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
   * const processor = new EntityProcessor(MyClass);
   * const result = processor.validate(myPayload);
   * console.log(result.valid);  // Output: true or false
   * ```
   */
  public validate(
    payload?: EvaluatedStrategyFactory.Payload<TBody>
  ): ns.Result<TClass> {
    const state = payload ?? new this.#meta.class();
    const errors: EvaluatedStrategyFactory.Errors<TClass> = {};
    const detailedErrors: EvaluatedStrategyFactory.DetailedErrors<TClass> = {};

    this.#meta.getFields().forEach((field) => {
      const validation = this.validateField(payload, field as keyof TClass);
      (detailedErrors as any)[field] = validation[0];
      (errors as any)[field] = validation[1];
    });

    return this.#cacheMap.patch(
      {
        valid: !$.Objects.hasErrors(errors),
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
  // prettier-ignore
  validateField<K extends keyof TClass>(payload: any, fieldName: K): Validation.getStrategyResult<TClass[K]> {
    const descriptor = this.#meta.getUntypedDescriptor(fieldName);
    const StrategyImpl: Validation.getStrategyResult<TClass[K]> = descriptor.StrategyImpl as any;
    const stratImpl = new (StrategyImpl as any)(descriptor, this.#hostDefault);
    const result = stratImpl.test(payload?.[fieldName], payload, this.#groups, this.locale);
    return result;
  }
}
