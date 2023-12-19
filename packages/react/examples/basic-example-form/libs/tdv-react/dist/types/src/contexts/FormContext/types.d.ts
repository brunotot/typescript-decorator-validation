/// <reference types="react" />
/**
 * A namespace which holds data related to `FormContext`
 */
declare namespace FormContext {
    /**
     * Represents the props which `FormProvider` component accepts
     */
    type FormProviderProps = {
        children: React.ReactNode;
        submitted: boolean;
        setSubmitted: (bool: boolean) => void;
        validateImmediately: boolean;
    };
}
export default FormContext;
//# sourceMappingURL=types.d.ts.map