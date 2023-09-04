import React from "react";
type FormContext = {
    submitted: boolean;
    setSubmitted: (bool: boolean) => void;
    validateImmediately: boolean;
};
export declare const FormContext: React.Context<FormContext | undefined>;
export type FormProviderProps = {
    children: React.ReactNode;
    submitted: boolean;
    setSubmitted: (bool: boolean) => void;
    validateImmediately: boolean;
};
export default function FormProvider({ children, submitted, setSubmitted, validateImmediately, }: FormProviderProps): React.JSX.Element;
export {};
