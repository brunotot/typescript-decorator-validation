import { TdvCore } from "tdv-core";

namespace UseEntityProcessorHook {
  export type UseEntityProcessorConfig<TBody> =
    TdvCore.ValidationEngine.Config<TBody>;
}

export default UseEntityProcessorHook;
