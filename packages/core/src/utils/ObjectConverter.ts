import FieldValidatorMetaService from "../reflection/service/impl/FieldValidatorMetaService";
import Helper from "../types/namespace/helper.namespace";
import Types from "../types/namespace/types.namespace";

namespace ObjectConverter {
  function _toClass<const TConstructor extends Types.Class<any>>(
    clazz: TConstructor,
    object?: Helper.Payload<Types.UnwrapClass<TConstructor>> | Types.Array
  ): Types.UnwrapClass<TConstructor> {
    if (Array.isArray(object)) {
      return object.map((item) =>
        _toClass(clazz, item)
      ) as Types.UnwrapClass<TConstructor>;
    }

    const entries = Object.entries<any>(object ?? {});
    const meta = FieldValidatorMetaService.inject(clazz);
    const data: Record<string, any> = {};
    for (const [key, value] of entries) {
      const descriptor = meta.getUntypedDescriptor(key);
      const { thisClass } = descriptor;
      if (thisClass) {
        if (Array.isArray(value)) {
          data[key] = value.map((item) => _toClass(thisClass, item));
        } else {
          data[key] = toClass(thisClass, value);
        }
      } else {
        data[key] = value;
      }
    }

    const instance = new clazz();
    Object.entries(data).forEach(([k, v]) => (instance[k] = v));
    return instance;
  }

  export function toClass<const TClass extends Types.Class<any>>(
    clazz: TClass,
    object?: Helper.Payload<Types.UnwrapClass<TClass>>
  ): Types.UnwrapClass<TClass> {
    return _toClass(clazz, object);
  }
}

export default ObjectConverter;
