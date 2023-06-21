import InferredType from "../model/enum/InferredType";
import MetadataKey from "../model/enum/MetadataKey";
import { Class } from "../model/type/class.type";
import { KeyOf } from "../model/utility/type.utility";
import ReflectService from "./ReflectService";
import "reflect-metadata";

export default class PropertyMetadata<T> {
  private _parent: Class<T>;
  private _field: KeyOf<T>;
  private _clazz: Class<unknown> | null;
  private _type: InferredType;
  private _emptyConstructorInstance: T;

  get parent() {
    return this._parent;
  }

  get field() {
    return this._field;
  }

  get clazz() {
    return this._clazz;
  }

  get type() {
    return this._type;
  }

  constructor(clazz: Class<T>, field: KeyOf<T>) {
    this._emptyConstructorInstance = new clazz();
    this._parent = clazz;
    this._field = field;
    this._clazz = this.buildClass();
    this._type = this.buildType();
  }

  is(type: InferredType): boolean {
    return type === this._type;
  }

  private buildClass(): Class<unknown> | null {
    const v1 = ReflectService.getMetadata<Class<any>>(
      MetadataKey.SEMANTICS_VALID,
      this._parent,
      this._field as string
    )[0];
    const v2 = ReflectService.getClassFieldTypeReal(
      this._parent.prototype,
      this._field as string
    );
    return v1 ?? v2 ?? null;
  }

  private buildType(): InferredType {
    return ReflectService.getClassFieldType(
      this._emptyConstructorInstance,
      this._field as string
    );
  }
}
