import { DEFAULT_DECORATOR_META, type DecoratorMeta, type DecoratorValidateIf } from "@decorators";
import { AbstractMetaService, type MetaStrategy } from "@reflection/service/AbstractMetaService";
import { type EventEmitter, type Types } from "@utilities";
import { ValidationMetadata } from "@validation/models/ValidationMetadata";
import type { ValidationEvaluator } from "@validation/types";

/**
 * Unwraps a MetaStrategy type to its inferred class.
 * @typeParam TStrategy - The MetaStrategy type to unwrap.
 */
export type UnwrapMetaStrategy<TStrategy extends MetaStrategy> = TStrategy extends Types.Class<
  infer TInferredClass
>
  ? TInferredClass
  : any;

/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation (at class level). It provides methods to add validators and read them.
 */
export class ClassValidatorMetaService<TStrategy extends MetaStrategy> extends AbstractMetaService<
  ValidationMetadata<any>
> {
  eventEmitter!: EventEmitter;
  validateIf: DecoratorValidateIf<Types.UnwrapClass<Types.Class<any>>>;

  /**
   * Static method to create a new instance of ClassValidatorMetaService.
   * @param strategy - The strategy to inject.
   * @returns A new instance of ClassValidatorMetaService.
   */
  public static inject<T extends MetaStrategy>(
    strategy: T,
    eventEmitter: EventEmitter
  ): ClassValidatorMetaService<UnwrapMetaStrategy<T>> {
    return new ClassValidatorMetaService<UnwrapMetaStrategy<T>>(strategy, eventEmitter);
  }

  private constructor(strategy: MetaStrategy, eventEmitter: EventEmitter) {
    super(ClassValidatorMetaService.name, strategy, () => new ValidationMetadata());
    this.eventEmitter = eventEmitter;
    this.validateIf = () => true;
  }

  /**
   * Adds a class-level validator to the provided class.
   * @param validate - The validation function.
   * @param groups - Optional validation groups.
   */
  addValidator(
    validate: ValidationEvaluator<Types.UnwrapClass<TStrategy>>,
    meta: DecoratorMeta<any> = DEFAULT_DECORATOR_META
  ): void {
    this.data.add({ validate, meta });
  }
}
