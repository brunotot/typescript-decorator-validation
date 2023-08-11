import React, { Dispatch, SetStateAction, createContext } from "react";

type FormContext = {
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  validateImmediately: boolean;
};

export const FormContext = createContext<FormContext | undefined>(undefined);

export type FormProviderProps = {
  children: React.ReactNode;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
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
