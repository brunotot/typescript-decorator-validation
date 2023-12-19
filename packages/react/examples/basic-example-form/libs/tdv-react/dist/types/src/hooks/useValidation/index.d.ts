import type TdvCore from "tdv-core";
import type ns from "./types";
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
export default function useValidation<TClass>(model: TdvCore.Utilities.Types.Class<TClass>, { defaultValue, groups }?: ns.UseValidationConfig<TClass>): ns.UseValidationReturn<TClass>;
//# sourceMappingURL=index.d.ts.map