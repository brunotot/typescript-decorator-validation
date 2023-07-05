import { Class } from "../type/Class.type";
import { KeyOf } from "../utility/type.utility";
import MetadataService from "../../service/MetadataService";

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

  constructor(clazz: Class<T>, field: KeyOf<T>) {
    this._owner = clazz;
    this._name = field;
    this._clazz = this.buildClass();
    this._type = this.buildTypeGroup();
  }

  private buildTypeGroup(): PropertyTypeGroup {
    return new MetadataService(this._owner).get(this._name as string).typeGroup;
  }

  private buildClass(): Class<unknown> | null {
    return (
      new MetadataService(this._owner)
        .get(this._name as string)
        .constructorCreator?.() ?? null
    );
  }
}
