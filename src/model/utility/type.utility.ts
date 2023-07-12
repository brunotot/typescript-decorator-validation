import { ValidationGroupType } from "../../handler/ValidationHandler";
import ErrorMessage from "../messages/ErrorMessage";
import { OmitNever } from "../type/helper/OmitNever";
import { SomeClass } from "./../../main";
import { PrimitiveSetAppend } from "../../../index";

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

export type _ = undefined;
export type EndNode<CHILD, PARENT = CHILD> = {
  node: PARENT;
  children: CHILD[];
};

export type UndefinedOrElse<
  PREDICATE,
  TRUE,
  FALSE = PREDICATE
> = PREDICATE extends undefined ? TRUE : FALSE;

export type PrimitiveSet = [string, number, boolean, bigint, Date];
export type FunctionType = Function;
export type ObjectType = object;
export type PrimitiveType = [
  ...PrimitiveSet,
  ...(PrimitiveSetAppend extends { values: infer T extends readonly unknown[] }
    ? T
    : [])
];
export type ArrayType = any[];

export type PrimitiveStrategy<TActual, TReplacer> = UndefinedOrElse<
  TReplacer,
  NonNullable<TActual>
>;
export type FunctionStrategy = never;

export type isAnyOf<
  TCheck,
  TPossibilities extends ArrayType
> = NonNullable<TCheck> extends TPossibilities[number] ? true : never;

export type isObject<T> = NonNullable<T> extends ObjectType ? true : never;
export type isFunction<T> = NonNullable<T> extends FunctionType ? true : never;
export type isArray<T> = NonNullable<T> extends ArrayType ? true : never;
export type isPrimitive<T> = isAnyOf<T, PrimitiveType>;
//     ^?
export type isUndefined<T> = T extends undefined ? true : never;

// prettier-ignore
export type ArrayStrategy<TActual, TReplacer> = TActual extends (infer U)[]
  ? true extends isObject<U>
    ? UndefinedOrElse<
        TReplacer, 
        EvaluatedStrategy<U, TReplacer>[], 
        EndNode<EvaluatedStrategy<U, TReplacer>, TReplacer>
      >
    : UndefinedOrElse<
        TReplacer, 
        TActual, 
        EndNode<TReplacer>
      >
  : never;

export type ObjectStrategy<TActual, TReplacer> = EvaluatedStrategy<
  NonNullable<TActual>,
  TReplacer
>;

// prettier-ignore
export type FieldStrategy<TActual, TKey extends KeyOf<TActual>, TStrat> =

  true extends isPrimitive<TActual[TKey]>
    ?PrimitiveStrategy<TActual[TKey], TStrat>

  :true extends isFunction<TActual[TKey]>
      ?FunctionStrategy

  :true extends isArray<TActual[TKey]>
      ?ArrayStrategy<TActual[TKey], TStrat> 

  :true extends isObject<TActual[TKey]>
    ?ObjectStrategy<TActual[TKey], TStrat>

:never;

// prettier-ignore
export type StrategyOptional<TActual> = {
  [TKey in KeyOf<TActual>]: FieldStrategy<TActual, TKey, _>
};

// prettier-ignore
export type StrategyMandatory<TActual, TStrat> = {
  [TKey in KeyOf<TActual>]-?: FieldStrategy<TActual, TKey, TStrat>
};

export type EvaluatedStrategy<T, V = undefined> = true extends isUndefined<V>
  ? OmitNever<StrategyOptional<T>>
  : OmitNever<StrategyMandatory<T, V>>;
