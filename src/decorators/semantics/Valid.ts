import MetadataKey from "../../model/enum/MetadataKey";
import ReflectService from "../../service/ReflectService";
import { Class } from "../../model/type/class.type";

export default function Valid<T>(innerFormReturnType: Class<T>) {
  return ReflectService.buildDecoratorFn(
    MetadataKey.SEMANTICS_VALID,
    innerFormReturnType
  );
}
