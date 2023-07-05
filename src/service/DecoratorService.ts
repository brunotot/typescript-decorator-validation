import { Context } from "../model/type/Context.type";
import { KeyOf } from "../model/utility/type.utility";
import MetadataService, { createMetaIfEmpty } from "./MetadataService";

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

export function applyForeachValidator<T>(
  target: any,
  property: string,
  decoratorFn: FieldDecoratorType<any, T>,
  ctx: ClassFieldDecoratorContext<any, T>
) {
  const execFn = decoratorFn(undefined, ctx);
  execFn.call(target, undefined!);
  const service = new MetadataService(target.constructor);
  const prop = service.get(property);
  const nodeList = prop.node;
  const metadata = nodeList.pop()!;
  prop.appendChild(metadata);
}

export function buildFieldDecorator<T>(
  handler: FieldDecoratorHandlerType<T>
): FieldDecoratorType<any, T> {
  return function (_, context) {
    const ctx = context as unknown as Context;
    createMetaIfEmpty(ctx);
    let hasExecuted = false;
    const propertyName = ctx.name as string;
    return function (this: any, propertyValue: T) {
      if (!hasExecuted) {
        handler(this, propertyName, propertyValue, context);
        hasExecuted = true;
      }
      return propertyValue;
    };
  };
}
