export type FieldDecoratorType<PARENT, FIELD_TYPE> = (
  target: undefined,
  context: ClassFieldDecoratorContext<PARENT, FIELD_TYPE>
) => (this: PARENT, value: FIELD_TYPE) => FIELD_TYPE;

export type FieldDecoratorHandlerType<T> = (
  propertyParent: any,
  propertyName: string,
  propertyValue: T,
  ctx: ClassFieldDecoratorContext<any, T>
) => void;

export function buildFieldDecorator<T>(
  handler: FieldDecoratorHandlerType<T>
): FieldDecoratorType<any, T> {
  return function (_: undefined, ctx: ClassFieldDecoratorContext<any, T>) {
    let hasExecuted = false;
    const propertyName = ctx.name as string;
    return function (this: any, propertyValue: T) {
      if (!hasExecuted) {
        handler(this, propertyName, propertyValue, ctx);
        hasExecuted = true;
      }
      return propertyValue;
    };
  };
}
