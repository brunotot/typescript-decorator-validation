import CacheMap from "../../models/cache.map";
import $ from "../../types/index";
import ns from "../../types/namespace/entity-processor.namespace";
import Validation from "../../types/namespace/validation.namespace";
import Class from "../../types/validation/class.type";
import DetailedErrors from "../../types/validation/detailed-errors.type";
import Errors from "../../types/validation/errors.type";
import Payload from "../../types/validation/payload.type";
import ValidationMetaService from "../service/impl/reflection.service.validation";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export default class EntityProcessor<TClass, TBody = TClass> {
  #meta: ValidationMetaService;
  #groups: Validation.Group[];
  #hostDefault: any;
  #cacheMap: ns.CacheMap<TClass, TBody>;

  constructor(clazz: Class<TClass>, config?: ns.Config<TBody>) {
    this.#groups = Array.from(new Set(config?.groups ?? []));
    this.#hostDefault = (config?.defaultValue ?? new clazz()) as TBody;
    this.#meta = ValidationMetaService.inject(clazz);
    this.#cacheMap = new CacheMap(
      (state) => this.validate.bind(this)(state) as ns.Result<TClass>
    );
  }

  public get hostDefault() {
    return this.#hostDefault;
  }

  public isValid(payload: Payload<TBody>): boolean {
    return this.#cacheMap.get("valid", payload);
  }

  public getDetailedErrors(payload: Payload<TBody>): DetailedErrors<TClass> {
    return this.#cacheMap.get("detailedErrors", payload);
  }

  public getErrors(payload: Payload<TBody>): Errors<TClass> {
    return this.#cacheMap.get("errors", payload);
  }

  public validate(payload?: Payload<TBody>): ns.Result<TClass> {
    const state = payload ?? new this.#meta.class();
    const errors: Errors<TClass> = {};
    const detailedErrors: DetailedErrors<TClass> = {};

    this.#meta.fields.forEach((field) => {
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

  // prettier-ignore
  validateField<K extends keyof TClass>(payload: any, fieldName: K): Validation.getStrategyResult<TClass[K]> {
    const descriptor = this.#meta.descriptor<any, any>(fieldName);
    const StrategyImpl: Validation.getStrategyClass<TClass[K]> = descriptor.StrategyImpl as any;
    const stratImpl = new (StrategyImpl as any)(descriptor, this.#hostDefault);
    const result = stratImpl.test(payload?.[fieldName], payload, this.#groups);
    return result;
  }
}
