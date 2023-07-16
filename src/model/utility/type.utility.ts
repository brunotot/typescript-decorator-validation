import {
  ValidationFn,
  ValidationGroupType,
} from "../../handler/ValidationHandler";
import ErrorMessage from "../../messages/impl/ErrorMessage";
import { WritableKeyOf } from "../type/WritableKeyOf";
import { Condition } from "../type/namespace/Condition.ns";
import { Strategy } from "../type/namespace/Strategy.ns";
import { TypeGroup } from "../type/namespace/TypeGroup.ns";
import { $ } from "../type/namespace/Utility.ns";

export type KeyOf<T> = keyof T;

export type BasicValidatorProviderTypeMandatoryMessage<T extends object = {}> =
  ValidatorDecoratorCommonPropsMandatoryMessage<T>;

export type BasicValidatorProviderType<V = string, T extends object = {}> =
  | V
  | ValidatorDecoratorCommonProps<T>;

export type ValidatorDecoratorCommonProps<T extends object> = T & {
  groups?: ValidationGroupParamType;
  message?: string;
};

export type ValidatorDecoratorCommonPropsMandatoryMessage<T extends object> =
  T & {
    groups?: ValidationGroupParamType;
    message: string;
  };

export type ValidationGroupParamType =
  | ValidationGroupType
  | ValidationGroupType[];

export type ValueOrObjectValidatorProps<T> =
  | T
  | {
      value: T;
      message?: string;
    };

export type DefaultValidatorProps<T> = {
  value: T;
  message: string;
};

export type ValidatorBuilder<T> = {
  isValid: ValidationFn<T>;
  groups?: ValidationGroupParamType;
};

export type Nullable<GUARD = undefined> = GUARD extends undefined
  ? any
  : GUARD | undefined | null;

export function extractDefaultValidatorProps<T>(
  props: ValueOrObjectValidatorProps<T>,
  errorMessageKey: KeyOf<typeof ErrorMessage>
): DefaultValidatorProps<T> {
  const errorMessageFn = ErrorMessage[errorMessageKey] as any;
  const isComplexObject =
    typeof props === "object" && props != null && "value" in props;
  const value: T = isComplexObject ? (props as any).value : props;
  const message: string = isComplexObject
    ? (props as any).message
    : errorMessageFn(value);
  return {
    value,
    message,
  };
}

// prettier-ignore
export type FieldStrategy<TActual, TKey extends KeyOf<TActual>, TStrat> =

  true extends Condition.isPrimitive<TActual[TKey]>
    ?Strategy.Primitive<TActual[TKey], TStrat>

  :true extends Condition.isFunction<TActual[TKey]>
    ?Strategy.Function

  :true extends Condition.isArray<TActual[TKey]>
    ?Strategy.Array<TActual[TKey], TStrat> 

  :true extends Condition.isObject<TActual[TKey]>
    ?Strategy.Object<TActual[TKey], TStrat>

:never;

export type StrategyOptional<TActual> = {
  [TKey in WritableKeyOf<TActual>]?: FieldStrategy<TActual, TKey, $._>;
};

export type StrategyMandatory<TActual, TStrat> = {
  [TKey in KeyOf<TActual>]-?: FieldStrategy<TActual, TKey, TStrat>;
};

// prettier-ignore
export type EvaluatedStrategy<T, V = $._> = true extends Condition.isUndefined<V>
  ? $.ExcludeNever<StrategyOptional<T>>
  : $.ExcludeNever<StrategyMandatory<T, V>>;
