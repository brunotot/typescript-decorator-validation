import { type UseResetConfig, type UseResetReturn } from "./types";
/**
 * Resets the form values and submission status.
 * If no arguments are provided, the form is reset to its default values.
 * If specific paths are provided, only those paths are reset to their default values.
 * @param engine - The form engine instance.
 * @param form - The current form values.
 * @param setForm - The function to update the form values.
 * @param submitted - The current submission status.
 * @param handleSetSubmitted - The function to update the submission status.
 * @returns The reset function.
 */
export declare function useReset<TClass>({ engine, form, setForm, submitted, handleSetSubmitted, }: UseResetConfig<TClass>): UseResetReturn<TClass>;
//# sourceMappingURL=index.d.ts.map