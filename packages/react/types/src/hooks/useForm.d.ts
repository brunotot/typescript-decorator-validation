/// <reference types="react" />
import { Class, Errors, ValidationGroup } from "tdv-core";
type ChangeHandlerCache<T> = {
    [K in keyof T]: (value: T[K]) => void;
};
export type UseFormProps<T> = {
    model: Class<T>;
    defaultValue?: T;
    validationGroups?: ValidationGroup[];
    validateImmediately?: boolean;
    standalone?: boolean;
    onSubmit?: () => Promise<void> | void;
    onSubmitValidationFail?: () => void;
    whenChanged?: () => void;
};
type ChangeHandlerValue<T, K extends keyof T> = T[K] | ((prev: T[K]) => T[K]);
export type ChangeHandler<T> = <K extends keyof T>(key: K, value: ChangeHandlerValue<T, K>) => void;
export default function useForm<T>({ model, defaultValue: defaultValue0, whenChanged, validationGroups: groups, onSubmit: onSubmitParam, onSubmitValidationFail, validateImmediately: validateImmediatelyParam, standalone, }: UseFormProps<T>): {
    isValid: boolean;
    submitted: boolean;
    cachedHandlers: ChangeHandlerCache<T>;
    form: T;
    setForm: import("react").Dispatch<import("react").SetStateAction<T>>;
    onSubmit: () => Promise<void>;
    handleChange: ChangeHandler<T>;
    providerProps: {
        submitted: boolean;
        setSubmitted: (bool: boolean) => void;
        validateImmediately: boolean;
    };
    errors: Errors<T>;
};
export {};
