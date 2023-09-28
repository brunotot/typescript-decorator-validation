/**
 * A namespace which holds data related to `FormContext`
 */
namespace FormContext {
  /**
   * Represents the props which `FormProvider` component accepts
   */
  export type FormProviderProps = {
    children: React.ReactNode;
    submitted: boolean;
    setSubmitted: (bool: boolean) => void;
    validateImmediately: boolean;
  };
}

export default FormContext;
