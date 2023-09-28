import { useMemo } from "react";
import { TdvCore, ValidationEngine } from "tdv-core";
import ns from "./types";

export default function useValidationEngine<TClass, TBody = TClass>(
  model: TdvCore.Types.Class<TClass>,
  config?: ns.UseValidationEngineConfig<TBody>
) {
  return useMemo(() => new ValidationEngine<TClass, TBody>(model, config), []);
}
