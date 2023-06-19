import MetadataKey from "../model/enum/MetadataKey";
import InferredType from "../model/enum/InferredType";
import "reflect-metadata";
import {
  ValidationFn,
  ValidationFnMetadata,
} from "../handler/ValidationHandler";
import { DecoratorType } from "./ValidatorService";
import { Class } from "../model/type/class.type";

type ConstructorType = { new (): any };

class ReflectService {
  buildDecoratorFn(key: MetadataKey, value: any) {
    return (target: any, property: string) => {
      this.setMetadata(key, value, target.constructor, property);
    };
  }

  addExternalValidatorImpl<T>(
    key: MetadataKey,
    target: any,
    property: string,
    validator: DecoratorType
  ) {
    this.validateType(target.constructor, property, false);
    validator(target, property);
    this.validateType(target.constructor, property, true);
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
    this.setMetadata(key, metadata, target.constructor, property);
  }

  validateType(target: any, property: string, value?: boolean): boolean {
    if (value === undefined) {
      return !!Reflect.getMetadata(MetadataKey.VALIDATE_TYPE, target, property);
    }
    Reflect.defineMetadata(MetadataKey.VALIDATE_TYPE, value, target, property);
    return value;
  }

  getClassGetterType(target: any, property: string): InferredType {
    return this.getFieldType(target, property, "design:returntype");
  }

  getClassFieldTypeReal(target: any, property: string): Class<any> {
    return Reflect.getMetadata("design:type", target, property) as Class<any>;
  }

  getClassFieldType(target: any, property: string): InferredType {
    return this.getFieldType(target, property, "design:type");
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

  private getFieldType(
    target: any,
    property: string,
    identifier: string
  ): InferredType {
    const meta = Reflect.getMetadata(identifier, target, property);
    if (!meta) {
      return InferredType.VOID;
    }
    const type = meta.name;
    for (const inferredType in InferredType) {
      if ((InferredType as any)[inferredType] === type) {
        return type;
      }
    }
    return InferredType.GENERIC_OBJECT;
  }
}

export default new ReflectService();
