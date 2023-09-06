import { EntityProcessor } from "tdv-core";

namespace UseResetHook {
  export type UseResetConfig<TClass, TBody = TClass> = {
    processor: EntityProcessor<TClass, TBody>;
    form: TBody;
    setForm: (v: TBody) => void;
    submitted: boolean;
    handleSetSubmitted: (v: boolean) => void;
  };
}

export default UseResetHook;
