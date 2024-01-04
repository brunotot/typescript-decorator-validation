import { useMemo } from "react";
import type TdvCore from "tdv-core";
import { Form } from "tdv-core";
import type ns from "./types";

export default function useValidationEngine<TClass>(
  model: TdvCore.Utilities.Types.Class<TClass>,
  config?: ns.UseValidationEngineConfig<TClass>
): Form<TClass> {
  return useMemo(() => {
    return new Form<TClass>(model, config);
  }, [JSON.stringify(config)]);
}
