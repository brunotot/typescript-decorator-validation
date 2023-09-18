import ValidationMetaService from "../reflection/service/impl/reflection.service.validation";
import Decorator from "../types/namespace/decorator.namespace";

function isDecoratorsStage2(context: Decorator.Context) {
  return typeof context === "string";
}

function makeDecoratorUsingStage2Strategy<T>(
  target: any,
  context: Decorator.Context,
  decoratorSupplier: Decorator.Supplier<T>
) {
  const name = context as unknown as string;
  const clazz = target.constructor;
  const processor = ValidationMetaService.inject(clazz);
  decoratorSupplier(name, processor, {
    name: name,
    metadata: {},
  } as any);
}

export function makeDecorator<T>(
  decoratorSupplier: Decorator.Supplier<T>
): Decorator.Type<T> {
  return function (target, context) {
    // Hardcoded check for old TS decorators (stage 2 proposal)
    if (isDecoratorsStage2(context)) {
      return makeDecoratorUsingStage2Strategy(
        target,
        context,
        decoratorSupplier
      );
    }

    // Regular stage 3 syntax
    const name = context.name;
    if (!context.metadata) {
      (context as any).metadata = {};
    }
    const meta = ValidationMetaService.inject(context);
    decoratorSupplier(name, meta, context);
  };
}
