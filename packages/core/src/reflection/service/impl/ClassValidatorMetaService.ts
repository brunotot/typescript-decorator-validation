import API from "api";
import { AbstractMetaService } from "../AbstractMetaService";

/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 *
 * @remarks
 * This class is responsible for managing metadata related to validation (at class level).
 * It provides methods to add validators and read them.
 */
export class ClassValidatorMetaService<
  TStrategy extends API.Reflection.MetaStrategy
> extends AbstractMetaService<API.Reflection.Rule.Instance<any>> {
  /**
   * Static method to create a new instance of ClassValidatorMetaService.
   *
   * @param strategy - The strategy to inject.
   * @returns A new instance of ClassValidatorMetaService.
   */
  public static inject<T extends API.Reflection.MetaStrategy>(
    strategy: T
  ): ClassValidatorMetaService<API.Utilities.Types.UnwrapMetaStrategy<T>> {
    return new ClassValidatorMetaService<
      API.Utilities.Types.UnwrapMetaStrategy<T>
    >(strategy);
  }

  private constructor(strategy: API.Reflection.MetaStrategy) {
    super(
      ClassValidatorMetaService.name,
      strategy,
      () => new API.Reflection.Rule.Instance()
    );
  }

  /**
   * Adds a class-level validator to the provided class.
   *
   * @param isValid - The validation function.
   * @param groups - Optional validation groups.
   */
  addValidator(
    isValid: API.Validation.Evaluator<
      API.Utilities.Types.UnwrapClass<TStrategy>
    >,
    groups?: string | string[]
  ): void {
    this.data.add({
      validate: isValid,
      groups: API.Decorator.groups(groups),
    });
  }
}
