import Decorator from "..";
import ValidationConfigurer from "../../reflection/service/impl/reflection.service.validation";

namespace DecoratorService {
  /**
   * Creates a new decorator using the provided supplier function.
   *
   * @typeParam T - The type of the value being validated.
   *
   * @param supplier - A function that defines the behavior of the decorator. It takes the property name, an instance of `ValidationConfigurer`, and the decorator context.
   *
   * @returns A decorator function that can be applied to class properties.
   *
   * @remarks
   * This function serves as a factory for creating new decorators. It uses dependency injection to get an instance of `ValidationConfigurer`.
   *
   * The function handles both TypeScript's Stage 2 decorators and the current decorators. It determines the stage based on the type of the `context` parameter.
   *
   * The `supplier` function is responsible for adding any necessary metadata or validation logic via the `ValidationConfigurer`.
   *
   * @example
   * ```typescript
   * const MyDecorator = makeDecorator<number>((key, metaService, context) => {
   *   metaService.addValidator(key, (value) => value > 0);
   * });
   *
   * class MyClass {
   *   //@MyDecorator
   *   public myValue: number;
   * }
   * ```
   */
  export function create<T>(
    supplier: Decorator.Supplier<T>
  ): Decorator.Instance<T> {
    return function (target, context) {
      const isStage2 = typeof context === "string";
      const nameEval = isStage2 ? context : context.name;
      const strategyEval = isStage2 ? target.constructor : context;
      const contextEval = isStage2 ? { name: context, metadata: {} } : context;
      const metaService = ValidationConfigurer.inject(strategyEval);
      supplier(nameEval, metaService, contextEval as any);
    };
  }
}

export default DecoratorService;
