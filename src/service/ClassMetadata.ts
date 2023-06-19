import {
  ValidationData,
  ValidationFnMetadata,
  ValidationGroupType,
} from "../handler/ValidationHandler";
import InferredType from "../model/enum/InferredType";
import MetadataKey from "../model/enum/MetadataKey";
import { Class } from "../model/type/class.type";
import { ValidationClass } from "../model/type/validation-class.type";
import { isValidationGroupUnion } from "../model/utility/object.utility";
import { KeyOf, RecursiveComplexType } from "../model/utility/type.utility";
import PropertyMetadata from "./PropertyMetadata";
import ReflectService from "./ReflectService";

export type ClassMetadataFieldsType<T> = RecursiveComplexType<
  T,
  PropertyMetadata<T>
>;

export default class ClassMetadata<T> {
  private _clazz: Class<T>;
  private _fieldNames: KeyOf<T>[];
  private _validationGroups: ValidationGroupType[];
  private _fields: ClassMetadataFieldsType<T>;
  private _validators: ValidationData<T>;

  constructor(clazz: Class<T>, ...validationGroups: ValidationGroupType[]) {
    this._clazz = clazz;
    this._validationGroups = validationGroups;
    this._fieldNames = this.buildFieldNames();
    this._fields = this.buildFields();
    this._validators = this.buildValidators();
  }

  get clazz() {
    return this._clazz;
  }

  get fields() {
    return this._fields;
  }

  get validators() {
    return this._validators;
  }

  createInstance(state: ValidationClass<T>): T {
    const instance: any = new this._clazz();
    const entries = Object.entries(state || {});
    for (const [key, value] of entries) {
      const meta = new PropertyMetadata<T>(this._clazz, key as KeyOf<T>);

      if (meta.clazz) {
        if (meta.is(InferredType.GENERIC_OBJECT)) {
          const innerValidationHandler = new ClassMetadata(
            meta.clazz,
            ...this._validationGroups
          );
          instance[key] = innerValidationHandler.createInstance(value as any);
          continue;
        }
        if (meta.is(InferredType.ARRAY)) {
          instance[key] = [];
          const innerValidationHandler = new ClassMetadata(
            meta.clazz,
            ...this._validationGroups
          );
          (value as any[]).forEach((v) => {
            instance[key].push(innerValidationHandler.createInstance(v));
          });
          continue;
        }
      }

      instance[key] = value;
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
        [property]: innerClass
          ? {
              node: validationMetadataListByActiveGroup,
              children: new ClassMetadata(
                innerClass,
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
    return ReflectService.getMetadata(
      MetadataKey.VALIDATOR_FIELD,
      this._clazz,
      property
    );
  }

  private buildFields(): ClassMetadataFieldsType<T> {
    return this._fieldNames.reduce(
      (prev, key) => ({
        ...prev,
        [key]: new PropertyMetadata(this._clazz, key),
      }),
      {} as ClassMetadataFieldsType<T>
    );
  }

  private buildFieldNames(): KeyOf<T>[] {
    return [
      ...ReflectService.getClassFieldNames(this._clazz),
      ...ReflectService.getClassGetterNames(this._clazz),
    ] as KeyOf<T>[];
  }
}
