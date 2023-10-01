import ClassValidatorMetaService from "../../reflection/service/impl/ClassValidatorMetaService";
import Types from "../../types/namespace/types.namespace";

namespace ClassDecorator {
  export type Type = Types.Class<any>;

  export type ReturnDef<T extends Type> = Types.Class<T> | undefined | void;

  export type Supplier<T extends Type> = (
    meta: ClassValidatorMetaService<Types.Class<T>>,
    baseClass: Types.Class<T>,
    context: Context<T>
  ) => ReturnDef<T>;

  export type Context<T extends Type> = ClassDecoratorContext<T>;

  export type Instance<T extends Type> = (
    baseClass: Types.Class<T>,
    context: Context<T>
  ) => ReturnDef<T>;

  export function build<T extends Type>(
    supplier: Supplier<Types.UnwrapClass<T>>
  ): Instance<any> {
    return function (baseClass, context) {
      return supplier(
        ClassValidatorMetaService.inject(context),
        baseClass,
        context
      );
    };
  }
}

export default ClassDecorator;
