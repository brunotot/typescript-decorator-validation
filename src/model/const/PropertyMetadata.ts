import { Class } from "../type/Class.type";
import { KeyOf } from "../utility/type.utility";
import MetadataProcessor from "../../processor/MetadataProcessor";

export type PropertyTypeGroup =
  | "PRIMITIVE_ARRAY"
  | "OBJECT_ARRAY"
  | "OBJECT"
  | "PRIMITIVE";

export default class PropertyMetadata<T> {
  private _owner: Class<T>;
  private _name: KeyOf<T>;
  private _clazz: Class<unknown> | null;
  private _type: PropertyTypeGroup;

  get parent() {
    return this._owner;
  }

  get name() {
    return this._name;
  }

  get clazz() {
    return this._clazz;
  }

  get type() {
    return this._type;
  }

  #runtimeValue: any;

  constructor(clazz: Class<T>, field: KeyOf<T>, runtimeValue: unknown) {
    this.#runtimeValue = runtimeValue as T;
    this._owner = clazz;
    this._name = field;
    this._clazz = this.buildClass();
    this._type = this.buildTypeGroup();
  }

  private buildTypeGroup(): PropertyTypeGroup {
    const p = MetadataProcessor.fromClass(this._owner);
    const vp = p.getValidationProcessor(this._name as string);
    if (!vp.isInitialTypeGroup) {
      return vp.typeGroup;
    }
    const value = this.#runtimeValue;

    return Array.isArray(value)
      ? vp.constructorCreator
        ? "OBJECT_ARRAY"
        : "PRIMITIVE_ARRAY"
      : vp.constructorCreator
      ? "OBJECT"
      : "PRIMITIVE";
  }

  private buildClass(): Class<unknown> | null {
    return (
      MetadataProcessor.fromClass(this._owner)
        .getValidationProcessor(this._name as string)
        .constructorCreator?.() ?? null
    );
  }
}
