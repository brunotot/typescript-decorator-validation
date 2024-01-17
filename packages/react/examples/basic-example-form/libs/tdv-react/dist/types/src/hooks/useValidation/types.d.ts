import type { Dispatch, SetStateAction } from "react";
import { type Decorators, type Form, type Localization, type Strategy, type Utilities, type ValidationResult } from "tdv-core";
/**
 * Validation-specific properties object which is meant to be consumed in a React component
 */
export type UseValidationData<TClass> = {
    isValid: boolean;
    detailedErrors: Strategy.DetailedErrorsResponse<TClass>;
    errors: Strategy.SimpleErrorsResponse<TClass>;
    engine: Form<TClass>;
    globalErrors: ValidationResult[];
};
/**
 * A type representing the return value of `useValidation` hook and is consisted of form state getter & setter and other data defined in `UseValidationData` type
 */
export type UseValidationReturn<TClass> = readonly [
    Utilities.Objects.Payload<TClass>,
    Dispatch<SetStateAction<Utilities.Objects.Payload<TClass>>>,
    UseValidationData<TClass>
];
/**
 * The configuration object of `useValidation` hook. Accepts a default value and groups which should be taken into consideration when validating
 */
export type UseValidationConfig<TClass> = {
    defaultValue?: Utilities.Objects.Payload<TClass>;
    groups?: string[];
    resolveDecoratorArgs?: () => Decorators.DecoratorArgs;
    asyncDelay?: number;
    locale?: Localization.Locale;
};
//# sourceMappingURL=types.d.ts.map