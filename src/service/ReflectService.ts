import MetadataKey from "../model/enum/MetadataKey";
import "reflect-metadata";
import { ValidationFnMetadata } from "../handler/ValidationHandler";
import { Class } from "../model/type/Class.type";
import { FieldDecoratorType } from "./DecoratorService";

type ConstructorType = { new (): any };

class ReflectService {
  buildDecoratorFn(key: MetadataKey, value: any) {
    return (target: any, property: string) => {
      this.setMetadata(key, value, target.constructor, property);
    };
  }

  applyForeachValidator<T>(
    target: any,
    property: string,
    decoratorFn: FieldDecoratorType<any, T>,
    ctx: ClassFieldDecoratorContext<any, T>
  ) {
    const execFn = decoratorFn(undefined, ctx);
    execFn.call(target, undefined!);
    const isValidList = this.getMetadata<ValidationFnMetadata<T>>(
      MetadataKey.VALIDATOR_FIELD,
      target.constructor,
      property
    );
    const metadata = isValidList.pop()!;
    this.deleteMetadata(
      MetadataKey.VALIDATOR_FIELD,
      target.constructor,
      property,
      metadata,
      (e) => e.validate
    );
    this.setMetadata(
      MetadataKey.VALIDATOR_EACH_IN_ARRAY,
      metadata,
      target.constructor,
      property
    );
  }

  getClassFieldNames(constructor: ConstructorType): string[] {
    return this.getPropertyNames(new constructor());
  }

  getClassGetterNames(constructor: ConstructorType): string[] {
    return this.getPropertyNames(new constructor().__proto__);
  }

  hasMetadata(key: MetadataKey, clazz: Object, property: string) {
    return Reflect.hasMetadata(key, clazz, property);
  }

  getMetadata<T>(key: MetadataKey, clazz: Object, property: string): T[] {
    return Reflect.getMetadata(key, clazz, property) ?? [];
  }

  deleteMetadata<T>(
    key: MetadataKey,
    clazz: Object,
    property: string,
    value: T,
    equalityFn?: (value: T) => any
  ) {
    if (!this.hasMetadata(key, clazz, property)) {
      return;
    }
    const equalityFnNonNull = equalityFn ?? ((o: any) => o);
    let current = this.getMetadata<T>(key, clazz, property).filter(
      (arg) => equalityFnNonNull(arg) !== equalityFnNonNull(value)
    );
    Reflect.defineMetadata(key, current, clazz, property);
  }

  setMetadata<T>(
    key: MetadataKey,
    value: T,
    clazz: Object,
    property: string,
    equalityFn?: (value: T) => any
  ): void {
    if (this.hasMetadata(key, clazz, property)) {
      const equalityFnNonNull = equalityFn ?? ((o: any) => o);
      const current = this.getMetadata<T>(key, clazz, property);
      const exists = current.some(
        (arg) => equalityFnNonNull(arg) === equalityFnNonNull(value)
      );
      if (!exists) {
        current.push(value);
        Reflect.defineMetadata(key, current, clazz, property);
      }
      return;
    }
    Reflect.defineMetadata(key, [value], clazz, property);
  }

  private getPropertyNames(object: any): string[] {
    return Object.getOwnPropertyNames(object).filter(
      (property) => property !== "constructor"
    );
  }
}

export default new ReflectService();
