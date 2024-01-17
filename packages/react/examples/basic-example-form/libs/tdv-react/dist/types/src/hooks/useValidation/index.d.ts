import { type Utilities } from "tdv-core";
import { type UseValidationConfig, type UseValidationReturn } from "./types";
/**
 * React hook which exposes validation-related props to a form component
 *
 * It provides the same destructuring pattern as you may have when
 * assigning the result of `useState` to a variable. The only key
 * difference is with the additional 3rd argument which holds extra
 * form-related and validation-related information. Most notable are
 * `isValid` and `errors`.
 *
 * @example
 * ```ts
 * const [form, setForm, {
 *   errors,
 *   detailedErrors,
 *   isValid,
 *   engine
 * }] = useValidation(MyClass)
 * ```
 *
 * @typeParam TClass - represents parent form class model holding context of current compontent
 */
export declare function useValidation<TClass>(Class: Utilities.Types.Class<TClass>, props?: UseValidationConfig<TClass>): UseValidationReturn<TClass>;
//# sourceMappingURL=index.d.ts.map