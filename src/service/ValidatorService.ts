import ReflectService from "./ReflectService";
import MetadataKey from "../model/enum/MetadataKey";
import InferredType from "../model/enum/InferredType";
import ErrorMessage from "../model/messages/ErrorMessage";
import {
  ValidationFn,
  ValidationFnMetadata,
} from "../handler/ValidationHandler";
import { ValidationGroupParamType } from "../model/utility/type.utility";

export type FieldValidatorBuilderProps<T> = {
  isValid: ValidationFn<T>;
  expectedType?: InferredType | InferredType[];
  validateType?: boolean;
  metadataKey?: MetadataKey;
  groups?: ValidationGroupParamType;
};

export type DecoratorType = (target: any, property: string) => void;

export type ValidatorMetadataType<T> = {
  validationFn: ValidationFn<T>;
  groups: ValidationGroupParamType;
};

class ValidatorService {
  buildFieldValidatorDecorator<T>({
    isValid,
    expectedType,
    validateType = true,
    metadataKey = MetadataKey.VALIDATOR_FIELD,
    groups = [],
  }: FieldValidatorBuilderProps<T>): DecoratorType {
    const groupsArray = Array.isArray(groups)
      ? groups
      : groups !== undefined
      ? [groups]
      : [];
    const expectedTypeNormalized = expectedType ?? [InferredType.ANY];
    const expectedTypeArray = Array.isArray(expectedTypeNormalized)
      ? expectedTypeNormalized
      : [expectedTypeNormalized];
    return (target: any, property: string) => {
      if (validateType) {
        this.requireType(target, property, expectedTypeArray);
      }
      ReflectService.setMetadata<ValidationFnMetadata<T>>(
        metadataKey,
        { validate: isValid, groups: groupsArray },
        target.constructor,
        property,
        (v) => v.validate
      );
    };
  }

  private requireType(
    target: any,
    property: string,
    expectedType: InferredType[]
  ) {
    if (!ReflectService.validateType(target, property)) {
      return;
    }

    if (expectedType.includes(InferredType.ANY)) {
      return;
    }
    const actualType = ReflectService.getClassFieldType(target, property);

    if (actualType === InferredType.FUNCTION) {
      return;
    }

    if (!expectedType.includes(actualType)) {
      const className: string = target.constructor.name;
      const classNameSanitized = className.slice(0, className.length - 1);
      throw new Error(
        ErrorMessage.IncompatibleTypes(
          classNameSanitized,
          property,
          expectedType,
          actualType
        )
      );
    }
  }
}

export default new ValidatorService();
