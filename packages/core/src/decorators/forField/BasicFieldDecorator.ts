import API from "../../../index";

export type Scope = unknown;

export type Instance<T extends Scope> = ((target: any, context: Context<T>) => void) & {};

export type Supplier<T extends Scope = Scope> = ((
  meta: API.Reflection.Services.FieldValidatorMetaService,
  name: string,
  context: Context<T>
) => void) & {};

export type Context<T extends Scope> = Readonly<{
  kind: "getter" | "method" | "field";
  static: boolean;
  private: boolean;
  name: string;
  metadata: globalThis.DecoratorMetadata;
  access: {
    get: (object: any) => T;
  };
}>;

/**
 * Creates a new field decorator function using the provided supplier.
 * @typeParam T - The type of the field being decorated.
 * @param supplier - A callback that defines the basic field decorator behavior.
 * @returns A basic field decorator factory.
 */
export function build<T extends Scope>(supplier: Supplier<T>): Instance<T> {
  return function (target, context) {
    const isStage2 = typeof context === "string";
    const nameEval = isStage2 ? context : context.name;
    const strategyEval = isStage2 ? target.constructor : context;
    const contextEval = isStage2 ? { name: context, metadata: {} } : context;
    const metaService = API.Reflection.Services.FieldValidatorMetaService.inject(strategyEval);
    supplier(metaService, String(nameEval), contextEval as any);
  };
}
