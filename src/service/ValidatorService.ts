import MetadataKey from "../model/enum/MetadataKey";
import { ValidationGroupParamType } from "../model/utility/type.utility";
import { FieldDecoratorType, buildFieldDecorator } from "./DecoratorService";
import MetadataService from "./MetadataService";
import {
  ValidationFn,
  ValidationGroupType,
} from "../handler/ValidationHandler";

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

type SaveMetadataProps = {
  target: any;
  property: string;
  groups?: ValidationGroupParamType;
  isValid: ValidationFn<unknown>;
};

class ValidatorService {
  buildFieldValidatorDecorator<T>(
    props: FieldValidatorBuilderProps<T>
  ): FieldDecoratorType<any, T> {
    return buildFieldDecorator<T>((target, property) => {
      saveMetadata({
        target,
        property,
        groups: props.groups,
        isValid: props.isValid as any,
      });
    });
  }
}

function normalizeGroups(groups?: ValidationGroupParamType) {
  return Array.isArray(groups)
    ? groups
    : groups !== undefined
    ? [groups]
    : ([] as ValidationGroupType[]);
}

function saveMetadata(props: SaveMetadataProps) {
  const service = new MetadataService(props.target.constructor);
  const metadata = service.get(props.property);
  metadata.appendNode({
    groups: normalizeGroups(props.groups),
    validate: props.isValid,
  });
}

export default new ValidatorService();
