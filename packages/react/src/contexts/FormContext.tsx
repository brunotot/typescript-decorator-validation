import React, { Dispatch, SetStateAction, createContext } from "react";

type FormContext = {
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
};

export const FormContext = createContext<FormContext | undefined>(undefined);

export type FormProviderProps = {
  children: React.ReactNode;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
};

export default function FormProvider({
  children,
  submitted,
  setSubmitted,
}: FormProviderProps) {
  return (
    <FormContext.Provider value={{ submitted, setSubmitted }}>
      {children}
    </FormContext.Provider>
  );
}
