import { DecoratorType } from "../../../service/ValidatorService";
import ReflectService from "../../../service/ReflectService";
import MetadataKey from "../../../model/enum/MetadataKey";

export default function foreach<T>(...validators: DecoratorType[]) {
  return (target: any, property: string) => {
    validators.forEach((validator) =>
      ReflectService.addExternalValidatorImpl(
        MetadataKey.VALIDATOR_EACH_IN_ARRAY,
        target,
        property,
        validator
      )
    );
  };
}
