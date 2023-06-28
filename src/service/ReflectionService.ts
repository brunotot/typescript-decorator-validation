import MetadataKey from "../model/enum/MetadataKey";
import "reflect-metadata";
import { KeyOf } from "../model/utility/type.utility";
import { Class } from "../model/type/Class.type";

function sanitizeTarget(target: any) {
  return target instanceof Function ? target : target.constructor;
}

class ReflectionService {
  get<T, K = any>(
    target: Class<K>,
    property: KeyOf<K>,
    key: MetadataKey
  ): T | null {
    return (
      (Reflect.getMetadata(
        key,
        sanitizeTarget(target),
        property as string
      ) as T) ?? null
    );
  }

  set<T, K = any>(
    target: Class<K>,
    property: KeyOf<K>,
    key: MetadataKey,
    value: T
  ): void {
    Reflect.defineMetadata(
      key,
      value,
      sanitizeTarget(target),
      property as string
    );
  }

  delete<K = any>(
    target: Class<K>,
    property: KeyOf<K>,
    key: MetadataKey
  ): void {
    Reflect.deleteMetadata(key, sanitizeTarget(target), property as string);
  }
}

export default new ReflectionService();
