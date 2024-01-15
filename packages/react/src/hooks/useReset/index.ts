import { type UseFormData } from "../useForm/types";
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
export function useReset<TClass>({
  engine,
  form,
  setForm,
  submitted,
  handleSetSubmitted,
}: UseResetConfig<TClass>): UseResetReturn<TClass> {
  const reset: UseFormData<TClass>["reset"] = (...paths) => {
    const noArgsInstance = engine.defaultValue;

    if (paths.length === 0) {
      setForm(noArgsInstance);
      handleSetSubmitted(false);
      return;
    }

    function cloneField(from: any, to: any, paths: string[]): boolean {
      if (paths.length === 0) {
        return false;
      }
      if (paths.length === 1) {
        if (JSON.stringify(to[paths[0]]) !== JSON.stringify(from[paths[0]])) {
          to[paths[0]] = from[paths[0]];
          return true;
        }
        return false;
      }
      const [parentPath, ...restPaths] = paths;
      return cloneField(from[parentPath], to[parentPath], restPaths);
    }

    const formClone = structuredClone(form);
    const hasCloned = paths.some(p => cloneField(noArgsInstance, formClone, p.split(".")));
    if (hasCloned) {
      setForm(formClone);
    }
    if (submitted) {
      handleSetSubmitted(false);
    }
  };
  return reset;
}
