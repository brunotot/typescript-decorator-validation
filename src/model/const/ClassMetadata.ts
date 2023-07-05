import {
  ValidationData,
  ValidationFnMetadata,
  ValidationGroupType,
} from "../../handler/ValidationHandler";
import PropertyMetadata from "./PropertyMetadata";
import { Class } from "../type/Class.type";
import { ValidationClass } from "../type/ValidationClass.type";
import { isValidationGroupUnion } from "../utility/object.utility";
import { KeyOf } from "../utility/type.utility";
import MetadataService, {
  getClassFieldNames,
} from "../../service/MetadataService";

export default class ClassMetadata<T> {
  private _clazz: Class<T>;
  private _fieldNames: KeyOf<T>[];
  private _validationGroups: ValidationGroupType[];
  private _validators: ValidationData<T>;

  constructor(clazz: Class<T>, ...validationGroups: ValidationGroupType[]) {
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

  createInstance(state: ValidationClass<T>): T {
    const instance: any = new this._clazz();
    const entries = Object.entries(state || {});

    const handleObject = (
      meta: PropertyMetadata<T>,
      key: string,
      value: any
    ) => {
      const innerValidationHandler = new ClassMetadata(
        meta.clazz!,
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
        ...this._validationGroups
      );
      value.forEach((v) => {
        instance[key].push(innerValidationHandler.createInstance(v));
      });
    };

    for (const [key, value] of entries) {
      const meta = new PropertyMetadata<T>(this._clazz, key as KeyOf<T>);
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

  private buildValidators<T>(): ValidationData<T> {
    return this._fieldNames.reduce((obj, property) => {
      const fieldMetadata = new PropertyMetadata(this._clazz, property);
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
                ...this._validationGroups
              ).buildValidators(),
            }
          : validationMetadataListByActiveGroup,
      };
    }, {}) as ValidationData<T>;
  }

  private getValidationMetadata<T>(
    property: string
  ): ValidationFnMetadata<T>[] {
    return new MetadataService(this._clazz).get(property).node as any;
  }

  private buildFieldNames(): KeyOf<T>[] {
    return getClassFieldNames(this._clazz) as KeyOf<T>[];
  }
}
