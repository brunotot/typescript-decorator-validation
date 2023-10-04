import Reflection from "../..";
import Decorator from "../../../decorators";
import Types from "../../../utilities/impl/Types";
import AbstractMetaService from "../AbstractMetaService";
import Validation from "./../../../engine";

/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 *
 * @remarks
 * This class is responsible for managing metadata related to validation (at class level).
 * It provides methods to add validators and read them.
 */
export default class ClassValidatorMetaService<
  TStrategy extends Reflection.MetaStrategy
> extends AbstractMetaService<Reflection.Rule<any>> {
  /**
   * Static method to create a new instance of ClassValidatorMetaService.
   *
   * @param strategy - The strategy to inject.
   * @returns A new instance of ClassValidatorMetaService.
   */
  public static inject<T extends Reflection.MetaStrategy>(
    strategy: T
  ): ClassValidatorMetaService<Types.UnwrapMetaStrategy<T>> {
    return new ClassValidatorMetaService<Types.UnwrapMetaStrategy<T>>(strategy);
  }

  private constructor(strategy: Reflection.MetaStrategy) {
    super(
      ClassValidatorMetaService.name,
      strategy,
      () => new Reflection.Rule()
    );
  }

  /**
   * Adds a class-level validator to the provided class.
   *
   * @param isValid - The validation function.
   * @param groups - Optional validation groups.
   */
  addValidator(
    isValid: Validation.Evaluator<Types.UnwrapClass<TStrategy>>,
    groups?: string | string[]
  ) {
    this.data.add({
      validate: isValid,
      groups: Decorator.groups(groups),
    });
  }
}
