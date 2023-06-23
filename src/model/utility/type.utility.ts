import { ValidationGroupType } from "../../handler/ValidationHandler";
import ErrorMessage from "../messages/ErrorMessage";

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

type Values<T> = T[KeyOf<T>];

export type OmitNever<T> = Pick<
  T,
  Values<{
    [Prop in KeyOf<T>]: [T[Prop]] extends [never] ? never : Prop;
  }>
>;

export type EndNode<CHILD, PARENT = CHILD> = {
  node: PARENT;
  children: CHILD[];
};

export type UndefinedOrElse<
  PREDICATE,
  TRUE,
  FALSE = PREDICATE
> = PREDICATE extends undefined ? TRUE : FALSE;

// prettier-ignore
export type RecursiveComplexType<T, V = undefined> = OmitNever<{
  [K in KeyOf<T>]: 
    T[K] extends object
      ? T[K] extends Function
        ? never
        : T[K] extends any[]
          ? T[K][number] extends object
            ? UndefinedOrElse<
                V, 
                RecursiveComplexType<T[K][number], V>[], 
                EndNode<RecursiveComplexType<T[K][number], V>, V>
              >
            : UndefinedOrElse<
                V, 
                T[K], 
                EndNode<V>
              >
          : T[K] extends Date
            ? UndefinedOrElse<V, T[K]>
            : RecursiveComplexType<V, T[K]>
      : UndefinedOrElse<V, T[K]>;
}>;
