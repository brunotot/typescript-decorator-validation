import { TdvCore } from "tdv-core";

namespace UseValidationEngineHook {
  export type UseValidationEngineConfig<TBody> =
    TdvCore.ValidationEngine.Config<TBody>;
}

export default UseValidationEngineHook;
