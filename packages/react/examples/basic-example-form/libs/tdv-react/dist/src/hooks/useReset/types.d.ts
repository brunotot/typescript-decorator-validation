import type * as TdvCore from "tdv-core";
import { type Form } from "tdv-core";
import type UseFormHook from "../useForm/types";
declare namespace UseResetHook {
    type UseResetConfig<TClass> = {
        engine: Form<TClass>;
        form: TdvCore.Utilities.Objects.Payload<TClass>;
        setForm: (v: TdvCore.Utilities.Objects.Payload<TClass>) => void;
        submitted: boolean;
        handleSetSubmitted: (v: boolean) => void;
    };
    type UseResetReturn<TClass> = UseFormHook.UseFormData<TClass>["reset"];
}
export default UseResetHook;
//# sourceMappingURL=types.d.ts.map