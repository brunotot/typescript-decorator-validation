import React, { createContext } from "react";

type FormContext = {
  submitted: boolean;
  setSubmitted: (bool: boolean) => void;
  validateImmediately: boolean;
};

export const FormContext = createContext<FormContext | undefined>(undefined);

export type FormProviderProps = {
  children: React.ReactNode;
  submitted: boolean;
  setSubmitted: (bool: boolean) => void;
  validateImmediately: boolean;
};

export default function FormProvider({
  children,
  submitted,
  setSubmitted,
  validateImmediately,
}: FormProviderProps) {
  return (
    <FormContext.Provider
      value={{ submitted, setSubmitted, validateImmediately }}
    >
      {children}
    </FormContext.Provider>
  );
}
