import type TdvCore from "tdv-core";

namespace UseValidationEngineHook {
  export type UseValidationEngineConfig<TClass> =
    TdvCore.Validation.Config<TClass>;
}

export default UseValidationEngineHook;
