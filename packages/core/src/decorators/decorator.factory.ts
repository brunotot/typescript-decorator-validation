import ValidationMetaService from "../reflection/service/impl/reflection.service.validation";
import Decorator from "../types/namespace/decorator.namespace";

export default function makeDecorator<T>(
  supplier: Decorator.Supplier<T>
): Decorator.Type<T> {
  return function (target, context) {
    const isStage2 = typeof context === "string";
    const nameEval = isStage2 ? context : context.name;
    const strategyEval = isStage2 ? target.constructor : context;
    const contextEval = isStage2 ? { name: context, metadata: {} } : context;
    const metaService = ValidationMetaService.inject(strategyEval);
    supplier(nameEval, metaService, contextEval as any);
  };
}
