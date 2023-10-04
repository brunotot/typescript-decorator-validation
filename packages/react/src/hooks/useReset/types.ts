import TdvCore, { Validation } from "tdv-core";
import UseFormHook from "../useForm/types";

namespace UseResetHook {
  export type UseResetConfig<TClass> = {
    engine: Validation.Engine<TClass>;
    form: TdvCore.Utilities.Objects.Payload<TClass>;
    setForm: (v: TdvCore.Utilities.Objects.Payload<TClass>) => void;
    submitted: boolean;
    handleSetSubmitted: (v: boolean) => void;
  };

  export type UseResetReturn<TClass> = UseFormHook.UseFormData<TClass>["reset"];
}

export default UseResetHook;
