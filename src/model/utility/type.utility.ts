import ErrorMessage from "../const/ErrorMessage";

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
  errorMessageKey: keyof typeof ErrorMessage
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

type Values<T> = T[keyof T];

export type OmitNever<T> = Pick<
  T,
  Values<{
    [Prop in keyof T]: [T[Prop]] extends [never] ? never : Prop;
  }>
>;

export type RecursiveComplexType<T, V = undefined> = OmitNever<{
  [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? never
      : T[K] extends any[]
      ? T[K][number] extends object | any[]
        ? RecursiveComplexType<T[K][number], V>[]
        : V extends undefined
        ? T[K]
        : V[]
      : RecursiveComplexType<T[K], V>
    : V extends undefined
    ? T[K]
    : V;
}>;
