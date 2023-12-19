// @ts-ignore
import React, { createContext } from "react";
export const FormContext = createContext(undefined);
/**
 * Provides form-related context to its children
 *
 * You should always invoke FormProvider at the top of your returned JSX chain
 * because it allows form context state to propagate to your child components.
 * This is particularly useful when your form model contains deeply nested
 * forms which have it's own React component implementations. If your form
 * doesn't contain any deeply nested forms then FormProvider isn't mandatory
 * but is still considered best-practice due to possibility of future changes
 * being made to the form, causing it to require context data.
 *
 * You should never manually feed the context with data, but rather you should use
 * the `providedProps` given to you by {@link useForm} hook to feed context with data.
 *
 * @param {FormProviderProps} props
 *
 * @example
 * Here, `ExampleClass` is an example of a top-level form model containing
 * a deeply nested form (`child` field) and a primitive property (`prop` field).
 * When implementing React component handlers for this form we would expect
 * to have a wrapper component and a nested component to be able to handle the
 * `child` field.
 *
 * ```ts
 * import { useForm, FormProvider, collection, valid } from "tdv-react";
 *
 * class ParentForm {
 *   \@collection.string.Required()
 *   prop!: string;
 *
 *   \@valid(ExampleNested)
 *   child!: ChildForm;
 * }
 *
 * class ChildForm {
 *   \@collection.strings.Required()
 *   nestedProp!: string;
 * }
 *
 * function ChildFormControl() {
 *   const { providerProps } = useForm(ChildForm, {
 *     // since we know ChildForm can only live inside ParentForm
 *     // it is mandatory to set "standalone" to false
 *     standalone: false
 *   });
 *
 *   return (
 *     <FormProvider {...providerProps}>
 *        {...}
 *     </FormProvider>
 *   );
 * }
 *
 * export default function ParentFormControl() {
 *   const { providerProps } = useForm(ParentForm, {
 *     // default value is true
 *     standalone: true
 *   });
 *
 *   return (
 *     <FormProvider {...providerProps}>
 *        <input type="text" name="prop" />
 *        <ChildFormControl />
 *     </FormProvider>
 *   );
 * }
 * ```
 */
export default function FormProvider({ children, submitted, setSubmitted, validateImmediately, }) {
    return (React.createElement(FormContext.Provider, { value: { submitted, setSubmitted, validateImmediately } }, children));
}
