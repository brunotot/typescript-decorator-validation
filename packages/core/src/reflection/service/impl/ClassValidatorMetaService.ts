import type API from "../../../../index";
import { type EventEmitter } from "../../../utilities/misc/EventEmitter";
import { ValidationMetadata } from "../../models/ValidationMetadata";
import { AbstractMetaService } from "../AbstractMetaService";

/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation (at class level). It provides methods to add validators and read them.
 */
export class ClassValidatorMetaService<
  TStrategy extends API.Reflection.MetaStrategy
> extends AbstractMetaService<ValidationMetadata<any>> {
  /**
   * Static method to create a new instance of ClassValidatorMetaService.
   * @param strategy - The strategy to inject.
   * @returns A new instance of ClassValidatorMetaService.
   */
  public static inject<T extends API.Reflection.MetaStrategy>(
    strategy: T,
    eventEmitter: EventEmitter
  ): ClassValidatorMetaService<API.Utilities.Types.UnwrapMetaStrategy<T>> {
    return new ClassValidatorMetaService<API.Utilities.Types.UnwrapMetaStrategy<T>>(
      strategy,
      eventEmitter
    );
  }

  eventEmitter!: EventEmitter;

  private constructor(strategy: API.Reflection.MetaStrategy, eventEmitter: EventEmitter) {
    super(ClassValidatorMetaService.name, strategy, () => new ValidationMetadata());
    this.eventEmitter = eventEmitter;
  }

  /**
   * Adds a class-level validator to the provided class.
   * @param isValid - The validation function.
   * @param groups - Optional validation groups.
   */
  addValidator(
    isValid: API.Validation.ValidationEvaluator<API.Utilities.Types.UnwrapClass<TStrategy>>,
    groups: string[]
  ): void {
    this.data.add({
      validate: isValid,
      groups,
    });
  }
}
