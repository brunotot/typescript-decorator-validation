import { $ } from "../../types/namespace/Utility.ns";
import { Class } from "../../types/Class.type";
import { Payload } from "../../types/Payload.type";
import MetadataProcessor from "../processor/MetadataProcessor";
import PropertyMetadata from "./PropertyMetadata";
import { ValidationGroup } from "../../decorators/types/DecoratorProps.type";
import { ValidationMetadata } from "../../types/ValidationMetadata.type";
import { getClassFieldNames } from "../../utils/class.utils";
import { isValidationGroupUnion } from "../../utils/decorator.utils";

export default class ClassMetadata<T> {
  #runtimeValue: T;
  private _clazz: Class<T>;
  private _fieldNames: $.Keys<T>[];
  private _validationGroups: ValidationGroup[];
  private _validators: Payload<T>;

  constructor(
    clazz: Class<T>,
    runtimeValue: T,
    ...validationGroups: ValidationGroup[]
  ) {
    this.#runtimeValue = runtimeValue;
    this._clazz = clazz;
    this._validationGroups = validationGroups;
    this._fieldNames = this.buildFieldNames();
    this._validators = this.buildValidators();
  }

  get clazz() {
    return this._clazz;
  }

  get validators() {
    return this._validators;
  }

  createInstance(state: Payload<T>): T {
    const instance: any = new this._clazz();
    const entries = Object.entries(state || {});

    const handleObject = (
      meta: PropertyMetadata<T>,
      key: string,
      value: any
    ) => {
      const innerValidationHandler = new ClassMetadata(
        meta.clazz!,
        instance?.[key],
        ...this._validationGroups
      );
      instance[key] = innerValidationHandler.createInstance(value);
    };

    const handleObjectArray = (
      meta: PropertyMetadata<T>,
      key: string,
      value: any[]
    ) => {
      instance[key] = [];
      const innerValidationHandler = new ClassMetadata(
        meta.clazz!,
        instance?.[key],
        ...this._validationGroups
      );
      value.forEach((v) => {
        instance[key].push(innerValidationHandler.createInstance(v));
      });
    };

    for (const [key, value] of entries) {
      const meta = new PropertyMetadata<T>(
        this._clazz,
        key as $.Keys<T>,
        value
      );
      switch (meta.type) {
        case "OBJECT": {
          handleObject(meta, key, value);
          break;
        }
        case "OBJECT_ARRAY": {
          handleObjectArray(meta, key, value as any[]);
          break;
        }
        default: {
          instance[key] = value;
        }
      }
    }

    return instance as T;
  }

  private buildValidators<T>(): Payload<T> {
    return this._fieldNames.reduce((obj, property) => {
      const fieldMetadata = new PropertyMetadata(
        this._clazz,
        property,
        this.#runtimeValue?.[property]
      );
      const innerClass = fieldMetadata.clazz;

      const validationFnMetadata: ValidationMetadata<T>[] =
        this.getValidationMetadata<T>(property as string);

      const validationMetadataListByActiveGroup = validationFnMetadata.filter(
        (meta) => isValidationGroupUnion(this._validationGroups, meta.groups)
      );

      return {
        ...obj,
        [property]: ["OBJECT_ARRAY", "OBJECT"].includes(fieldMetadata.type)
          ? {
              node: validationMetadataListByActiveGroup,
              children: new ClassMetadata(
                innerClass!,
                this.#runtimeValue?.[property],
                ...this._validationGroups
              ).buildValidators(),
            }
          : validationMetadataListByActiveGroup,
      };
    }, {}) as Payload<T>;
  }

  private getValidationMetadata<T>(property: string): ValidationMetadata<T>[] {
    return MetadataProcessor.fromClass(this._clazz).getValidationProcessor(
      property
    ).node;
  }

  private buildFieldNames(): $.Keys<T>[] {
    return getClassFieldNames(this._clazz) as $.Keys<T>[];
  }
}
