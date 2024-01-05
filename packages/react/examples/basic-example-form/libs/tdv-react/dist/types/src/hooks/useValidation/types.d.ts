import type { Dispatch, SetStateAction } from "react";
import { type Form, type ValidationResult } from "tdv-core";
import type TdvCore from "tdv-core";
/**
 * A namespace which holds all necessary data for `useValidation` hook
 */
declare namespace UseValidationHook {
    /**
     * Validation-specific properties object which is meant to be consumed in a React component
     */
    type UseValidationData<TClass> = {
        isValid: boolean;
        detailedErrors: TdvCore.Strategy.Impl.DetailedErrors<TClass>;
        errors: TdvCore.Strategy.Impl.Errors<TClass>;
        engine: Form<TClass>;
        globalErrors: ValidationResult[];
    };
    /**
     * A type representing the return value of `useValidation` hook and is consisted of form state getter & setter and other data defined in `UseValidationData` type
     */
    type UseValidationReturn<TClass> = readonly [
        TdvCore.Utilities.Objects.Payload<TClass>,
        Dispatch<SetStateAction<TdvCore.Utilities.Objects.Payload<TClass>>>,
        UseValidationData<TClass>
    ];
    /**
     * The configuration object of `useValidation` hook. Accepts a default value and groups which should be taken into consideration when validating
     */
    type UseValidationConfig<TClass> = {
        defaultValue?: TdvCore.Utilities.Objects.Payload<TClass>;
        groups?: string[];
        resolveDecoratorArgs?: () => TdvCore.Decorator.DecoratorArgs;
        asyncDelay?: number;
        locale?: TdvCore.Localization.Locale;
    };
}
export default UseValidationHook;
//# sourceMappingURL=types.d.ts.map