import API from "api";

namespace ClassDecorator {
  export type Type = API.Utilities.Types.Class<any>;

  export type ReturnDef<T extends Type> =
    | API.Utilities.Types.Class<T>
    | undefined
    | void;

  export type Supplier<T extends Type> = (
    meta: API.Reflection.Services.ClassValidatorMetaService.default<
      API.Utilities.Types.Class<T>
    >,
    baseClass: API.Utilities.Types.Class<T>,
    context: Context<T>
  ) => ReturnDef<T>;

  export type Context<T extends Type> = ClassDecoratorContext<T>;

  export type Instance<T extends Type> = (
    baseClass: API.Utilities.Types.Class<T>,
    context: Context<T>
  ) => ReturnDef<T>;

  export function build<T extends Type>(
    supplier: Supplier<API.Utilities.Types.UnwrapClass<T>>
  ): Instance<any> {
    return function (baseClass, context) {
      return supplier(
        API.Reflection.Services.ClassValidatorMetaService.default.inject(
          context
        ),
        baseClass,
        context
      );
    };
  }
}

export default ClassDecorator;
