import ReflectService from "./ReflectService";
import MetadataKey from "../model/enum/MetadataKey";
import {
  ValidationFn,
  ValidationFnMetadata,
  ValidationGroupType,
} from "../handler/ValidationHandler";
import { ValidationGroupParamType } from "../model/utility/type.utility";
import { FieldDecoratorType, buildFieldDecorator } from "./DecoratorService";

export type FieldValidatorBuilderProps<T> = {
  isValid: ValidationFn<T>;
  metadataKey?: MetadataKey;
  groups?: ValidationGroupParamType;
};

export type DecoratorReturnType<PARENT, FIELD_TYPE> = (
  this: PARENT,
  value: FIELD_TYPE
) => FIELD_TYPE;

export type ValidatorMetadataType<T> = {
  validationFn: ValidationFn<T>;
  groups: ValidationGroupParamType;
};

export type NullableType<GUARD = undefined> = GUARD extends undefined
  ? any
  : GUARD | undefined | null;

class ValidatorService {
  buildFieldValidatorDecorator<T>({
    isValid,
    metadataKey = MetadataKey.VALIDATOR_FIELD,
    groups = [],
  }: FieldValidatorBuilderProps<T>): FieldDecoratorType<any, T> {
    const groupsArray = Array.isArray(groups)
      ? groups
      : groups !== undefined
      ? [groups]
      : [];

    return buildFieldDecorator<T>((target, property) => {
      saveMetadata({
        target,
        property,
        groupsArray,
        metadataKey,
        isValid,
      });
    });
  }
}

type SaveMetadataProps<T> = {
  target: any;
  property: string;
  groupsArray: ValidationGroupType[];
  metadataKey: MetadataKey;
  isValid: ValidationFn<T>;
};

function saveMetadata<T>({
  target,
  property,
  groupsArray,
  metadataKey,
  isValid,
}: SaveMetadataProps<T>) {
  ReflectService.setMetadata<ValidationFnMetadata<T>>(
    metadataKey,
    { validate: isValid, groups: groupsArray },
    target.constructor,
    property,
    (v) => v.validate
  );
}

export default new ValidatorService();
