import MetadataKey from "../../model/enum/MetadataKey";
import ReflectService from "../../service/ReflectService";
import { Class } from "../../model/type/class.type";
import InferredType from "../../model/enum/InferredType";
import ErrorMessage from "../../model/messages/ErrorMessage";

export default function valid<T>(innerFormReturnType?: Class<T>) {
  if (innerFormReturnType) {
    return ReflectService.buildDecoratorFn(
      MetadataKey.SEMANTICS_VALID,
      innerFormReturnType
    );
  }

  return (target: any, property: string) => {
    const type = ReflectService.getClassFieldTypeReal(target, property);
    if (
      !type ||
      ReflectService.getClassFieldType(target, property) === InferredType.ARRAY
    ) {
      throw new Error(ErrorMessage.InvalidUsageOfDecoratorValid());
    }
    return ReflectService.buildDecoratorFn(MetadataKey.SEMANTICS_VALID, type)(
      target,
      property
    );
  };
}
