import TdvCore from "tdv-core";
import ns from "./types";
/**
 * React hook which exposes useful form and validation-related props to a form component
 *
 * Hook internally invokes {@link useValidation}
 *
 * It provides the same destructuring pattern as you may have when
 * assigning the result of `useState` to a variable. The only key
 * difference is with the additional 3rd argument which holds extra
 * form-related and validation-related information. Most notable are
 * `isValid`, `handleChange`, `errors` and `onSubmit`.
 *
 * @example
 * ```ts
 * const [form, setForm, {
 *   isValid,
 *   isSubmitted,
 *   onSubmit,
 *   errors,
 *   providerProps,
 *   mutations
 * }] = useForm(MyClass)
 * ```
 *
 * @typeParam TClass - represents parent form class model holding context of current compontent
 */
export default function useForm<TClass>(model: TdvCore.Utilities.Types.Class<TClass>, { defaultValue, onSubmit: onSubmitParam, onSubmitValidationFail, standalone, validateImmediately, validationGroups: groups, onChange, }?: ns.UseFormConfig<TClass>): ns.UseFormReturn<TClass>;
//# sourceMappingURL=index.d.ts.map