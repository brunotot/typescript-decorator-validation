import UseFormNamespace from "./../useForm/types";
import ns from "./types";

export default function useReset<TClass, TBody = TClass>({
  processor,
  form,
  setForm,
  submitted,
  handleSetSubmitted,
}: ns.UseResetConfig<TClass, TBody>) {
  const reset: UseFormNamespace.UseFormData<TBody>["reset"] = (...paths) => {
    const noArgsInstance = processor.noArgsInstance;

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
    const hasCloned = paths.some((p) =>
      cloneField(noArgsInstance, formClone, p.split("."))
    );
    if (hasCloned) {
      setForm(formClone);
    }
    if (submitted) {
      handleSetSubmitted(false);
    }
  };
  return reset;
}
