import { $ } from "../type/namespace/Utility.ns";
import { Class } from "../type/Class.type";
import { Payload } from "../type/Payload.type";
import MetadataProcessor from "../../processor/MetadataProcessor";
import PropertyMetadata from "./PropertyMetadata";
import {
  getClassFieldNames,
  isValidationGroupUnion,
} from "../utility/object.utility";
import {
  ValidationFnMetadata,
  ValidationGroupType,
} from "../../processor/EntityProcessor";

export default class ClassMetadata<T> {
  #runtimeValue: T;
  private _clazz: Class<T>;
  private _fieldNames: $.Keys<T>[];
  private _validationGroups: ValidationGroupType[];
  private _validators: Payload<T>;

  constructor(
    clazz: Class<T>,
    runtimeValue: T,
    ...validationGroups: ValidationGroupType[]
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

      const validationFnMetadata: ValidationFnMetadata<T>[] =
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

  private getValidationMetadata<T>(
    property: string
  ): ValidationFnMetadata<T>[] {
    return MetadataProcessor.fromClass(this._clazz).getValidationProcessor(
      property
    ).node;
  }

  private buildFieldNames(): $.Keys<T>[] {
    return getClassFieldNames(this._clazz) as $.Keys<T>[];
  }
}
