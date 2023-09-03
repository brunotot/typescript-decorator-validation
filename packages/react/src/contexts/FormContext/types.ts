namespace FormContext {
  export type FormProviderProps = {
    children: React.ReactNode;
    submitted: boolean;
    setSubmitted: (bool: boolean) => void;
    validateImmediately: boolean;
  };
}

export default FormContext;
