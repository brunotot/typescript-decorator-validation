import API from "../../index";
import { ValidationMetadata } from "../../reflection/models/ValidationMetadata";
import { EventEmitter } from "../../utilities/misc/EventEmitter";
import { Cache } from "./Cache";
import { Events } from "./Events";

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
export class Form<TClass> {
  __id: string;
  locale: API.Localization.Locale;
  #eventListener?: API.Validation.AsyncEventHandler<TClass>;
  #eventEmitter: EventEmitter;
  #fieldValidatorMetaService: API.Reflection.FieldValidatorMetaService;
  // @ts-expect-error
  #classValidatorMetaService: API.Reflection.ClassValidatorMetaService<TClass>;
  #groups: string[];
  #defaultValue: API.Utilities.Objects.Payload<TClass>;
  #cache: Cache<API.Validation.FormValidateResponse<TClass>>;
  #hostClass: API.Utilities.Types.Class<TClass>;
  #asyncDelay: number;
  #debounceMap: {
    [key in keyof TClass]: ReturnType<typeof API.Utilities.Objects.debounce>;
  } = {} as any;

  public get async() {
    return {
      register: this.#registerAsync.bind(this),
      unregister: this.#unregisterAsync.bind(this),
      delay: this.#asyncDelay,
    };
  }

  /**
   * Gets the default host value.
   */
  public get defaultValue(): any {
    return this.#defaultValue;
  }

  /**
   * Constructs a new `ValidationEngine` instance.
   *
   * @param clazz - The class type to be processed.
   * @param config - Optional configuration settings.
   */
  constructor(
    clazz: API.Utilities.Types.Class<TClass>,
    config?: API.Validation.FormConfig<TClass>
  ) {
    this.#asyncDelay = config?.asyncDelay ?? 500;
    this.__id = Math.random().toString(36).substring(2, 8);
    this.#eventEmitter = new EventEmitter(this.__id);
    this.#hostClass = clazz;
    this.locale = config?.locale ?? API.Localization.getLocale();
    this.#groups = Array.from(new Set(config?.groups ?? []));
    this.#defaultValue =
      config?.defaultValue ??
      (API.Utilities.Objects.toClass(clazz) as API.Utilities.Objects.Payload<TClass>);
    this.#fieldValidatorMetaService = API.Reflection.FieldValidatorMetaService.inject(
      clazz,
      this.#eventEmitter
    );
    this.#classValidatorMetaService = API.Reflection.ClassValidatorMetaService.inject(
      clazz,
      this.#eventEmitter
    );
    this.#cache = new Cache(state => this.validate.bind(this)(state));
  }

  /**
   * Checks if the given payload is valid.
   *
   * @param payload - The payload to validate.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  public isValid(payload: API.Utilities.Objects.Payload<TClass>): boolean {
    return this.#cache.get("valid", payload);
  }

  /**
   * Retrieves detailed error messages for the given payload.
   *
   * @param payload - The payload to validate.
   *
   * @returns An object containing detailed error messages.
   */
  public getDetailedErrors(
    payload?: API.Utilities.Objects.Payload<TClass>
  ): API.Strategy.Impl.DetailedErrors<TClass> {
    return this.#cache.get("detailedErrors", payload);
  }

  /**
   * Retrieves error messages for the given payload.
   *
   * @param payload - The payload to validate.
   *
   * @returns An object containing error messages.
   */
  public getErrors(
    payload?: API.Utilities.Objects.Payload<TClass>
  ): API.Strategy.Impl.Errors<TClass> {
    return this.#cache.get("errors", payload);
  }

  public getGlobalErrors(
    payload?: API.Utilities.Objects.Payload<TClass>
  ): API.Validation.ValidationResult[] {
    return this.#cache.get("globalErrors", payload);
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
  public validate(
    payload?: API.Utilities.Objects.Payload<TClass>,
    args: API.Decorator.DecoratorArgs = {}
  ): API.Validation.FormValidateResponse<TClass> {
    const state: API.Utilities.Objects.Payload<TClass> = API.Utilities.Objects.toClass(
      this.#hostClass,
      payload
    ) as any;

    const errors: any = {};
    const detailedErrors: any = {};

    const classValidators = this.#classValidatorMetaService.data.contents;
    const classReflectionRule = new ValidationMetadata(classValidators);
    const classValidationErrors = classReflectionRule.validate(
      state,
      state,
      this.#groups,
      this.locale,
      args,
      this.#eventEmitter
    );

    this.#fieldValidatorMetaService.getFields().forEach(field => {
      const validation: any = this.#validateField(field as keyof TClass, state as any, args);
      detailedErrors[field] = validation[0];
      errors[field] = validation[1];
    });

    return this.#cache.patch(
      {
        valid: !API.Utilities.Objects.hasErrors(errors),
        detailedErrors,
        errors,
        globalErrors: classValidationErrors,
      },
      state
    );
  }

  /**
   * Registers an event listener for the specified event.
   * @param event - The name of the event to listen for.
   * @param handler - The event handler function.
   */
  public listen(event: string, handler: (this: Form<TClass>) => void) {
    this.#eventEmitter.on(event, handler);
  }

  /**
   * Emits an event with optional data.
   * @param event - The name of the event to emit.
   * @param data - Optional data to pass along with the event.
   */
  public emit(event: string, data?: any) {
    this.#eventEmitter.emit(event, data);
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
  #validateField<K extends keyof TClass>(
    fieldName: K,
    // @ts-expect-error
    payload: API.Utilities.Objects.Payload<TClass>[K],
    args: API.Decorator.DecoratorArgs = {}
  ): API.Strategy.getStrategyResult<TClass, K> {
    const descriptor = this.#fieldValidatorMetaService.getUntypedDescriptor(
      fieldName,
      this.#eventEmitter
    );
    const stratImpl = new descriptor.StrategyImpl(
      descriptor,
      this.#defaultValue,
      this.#groups,
      this.locale,
      this.#eventEmitter
    );

    if (descriptor.strategy === "function") {
      if (!this.#debounceMap[fieldName]) {
        this.#debounceMap[fieldName] = API.Utilities.Objects.debounce(
          (value: any, context: any) => {
            stratImpl.test(value, context, args);
          },
          this.#asyncDelay
        );
      }

      // @ts-expect-error
      this.#debounceMap[fieldName](payload[fieldName], payload, args);

      return [
        (this.#cache.get("detailedErrors") as any)?.[fieldName],
        (this.#cache.get("errors") as any)?.[fieldName],
      ] as API.Strategy.getStrategyResult<TClass, K>;
    }

    // @ts-expect-error We expect error here due to the nature of arbitrary types depending on the different types of fields (primitive, object, primitive array, object array and so on...)
    return stratImpl.test(payload[fieldName], payload, args);
  }

  #registerAsync(handler: (props: API.Validation.AsyncEventResponseProps<TClass>) => void): void {
    this.#unregisterAsync();
    this.#eventListener = ({ key, value }: API.Validation.AsyncEventHandlerProps<TClass>) => {
      const { valid } = value;
      const currentErrors: any = this.#cache.get("errors");
      const currentDetailedErrors: any = this.#cache.get("detailedErrors");
      let currentGlobalErrors: any = this.#cache.get("globalErrors");

      if (key) {
        let simpleResults = currentErrors[key] as string[];
        let detailedResults = currentDetailedErrors[key] as API.Validation.ValidationResult[];

        if (valid) {
          detailedResults = detailedResults.filter(r => r.key !== value.key);
          simpleResults = simpleResults.filter(r => r !== value.message);
        } else {
          const existing = detailedResults.find(r => r.key === value.key);
          if (!existing) {
            detailedResults = [...detailedResults, value];
            simpleResults = [...simpleResults, value.message];
          }
        }

        currentErrors[key] = simpleResults;
        currentDetailedErrors[key] = detailedResults;
      } else {
        if (valid) {
          currentGlobalErrors = currentGlobalErrors.filter((r: any) => r.key !== value.key);
        } else {
          const existing = currentGlobalErrors.find((r: any) => r.key === value.key);
          if (!existing) {
            currentGlobalErrors = [...currentGlobalErrors, value];
          }
        }
      }

      const patched = this.#cache.patch({
        valid,
        detailedErrors: { ...currentDetailedErrors },
        errors: { ...currentErrors },
        globalErrors: [...currentGlobalErrors] as any,
      });

      handler({
        errors: patched.errors,
        detailedErrors: patched.detailedErrors,
        globalErrors: patched.globalErrors,
      });
    };
    this.#eventEmitter.on(Events.ASYNC_VALIDATION_COMPLETE, this.#eventListener);
  }

  #unregisterAsync(): void {
    if (this.#eventListener != null) {
      this.#eventEmitter.off(Events.ASYNC_VALIDATION_COMPLETE, this.#eventListener);
    }
  }
}
