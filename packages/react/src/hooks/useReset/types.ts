import { type Form, type Utilities } from "tdv-core";

export type UseResetConfig<TClass> = {
  engine: Form<TClass>;
  form: Utilities.Objects.Payload<TClass>;
  setForm: (v: Utilities.Objects.Payload<TClass>) => void;
  submitted: boolean;
  handleSetSubmitted: (v: boolean) => void;
};

export type UseResetReturn<TClass> = ((
  ...fieldPaths: Array<PayloadFieldPath<Utilities.Objects.Payload<TClass>>>
) => void) & {};

/**
 * A wrapper type for evaluation object paths as strings
 */
export type ObjectPathEvaluator<T, K extends string> = K extends keyof T
  ? K extends Utilities.Objects.Inputs<T>
    ? K | `${K}.${PayloadFieldPath<T[K]>}`
    : ""
  : never;

/**
 * A helper type for evaluation paths as strings representing JavaScript object selectors
 */
export type PayloadFieldPathEvaluator<T> = {
  [K in keyof T]-?: K extends string
    ? Utilities.Booleans.isFunction<T[K]> extends true
      ? never
      : Utilities.Booleans.isArray<T[K]> extends true
      ? K
      : Utilities.Booleans.isObject<T[K]> extends true
      ? ObjectPathEvaluator<T, K>
      : K extends Utilities.Objects.Inputs<T>
      ? K
      : never
    : never;
};

/**
 * A central method for getting a union of all possible payload field paths
 */
export type PayloadFieldPath<T> = Utilities.Booleans.isFunction<T> extends true
  ? ""
  : Utilities.Booleans.isObject<T> extends true
  ? PayloadFieldPathEvaluator<T>[keyof T]
  : "";
