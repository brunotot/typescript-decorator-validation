import { ValidationEngine } from "tdv-core";

namespace UseResetHook {
  export type UseResetConfig<TClass, TBody = TClass> = {
    engine: ValidationEngine<TClass, TBody>;
    form: TBody;
    setForm: (v: TBody) => void;
    submitted: boolean;
    handleSetSubmitted: (v: boolean) => void;
  };
}

export default UseResetHook;
