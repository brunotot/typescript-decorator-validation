import API from "../../../index";

export type Scope = API.Utilities.Types.Class<any>;

export type Instance<T extends Scope> = ((
  baseClass: API.Utilities.Types.Class<T>,
  context: Context<T>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => API.Utilities.Types.Class<T> | undefined | void) & {};

export type Supplier<T extends Scope> = ((
  meta: API.Reflection.Services.ClassValidatorMetaService<API.Utilities.Types.Class<T>>,
  baseClass: API.Utilities.Types.Class<T>,
  context: Context<T>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => API.Utilities.Types.Class<T> | undefined | void) & {};

export type Context<T extends Scope> = ClassDecoratorContext<T>;

/**
 * Creates a new class decorator function using the provided supplier.
 *
 * @typeParam T - The type of the class being decorated.
 * @param supplier - A callback that defines the basic class decorator behavior and returns the modified class.
 * @returns A basic class decorator factory.
 */
export function build<T extends Scope>(
  supplier: Supplier<API.Utilities.Types.UnwrapClass<T>>
): Instance<any> {
  return function (baseClass, context) {
    return supplier(
      API.Reflection.Services.ClassValidatorMetaService.inject(context),
      baseClass,
      context
    );
  };
}
