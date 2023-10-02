import { TdvCore, ValidationEngine } from "tdv-core";
import UseFormHook from "../useForm/types";

namespace UseResetHook {
  export type UseResetConfig<TClass> = {
    engine: ValidationEngine<TClass>;
    form: TdvCore.Helper.Payload<TClass>;
    setForm: (v: TdvCore.Helper.Payload<TClass>) => void;
    submitted: boolean;
    handleSetSubmitted: (v: boolean) => void;
  };

  export type UseResetReturn<TClass> = UseFormHook.UseFormData<TClass>["reset"];
}

export default UseResetHook;
