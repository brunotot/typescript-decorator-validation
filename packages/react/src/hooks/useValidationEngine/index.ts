import { useMemo } from "react";
import { TdvCore, ValidationEngine } from "tdv-core";
import ns from "./types";

export default function useValidationEngine<TClass>(
  model: TdvCore.Types.Class<TClass>,
  config?: ns.UseValidationEngineConfig<TClass>
) {
  return useMemo(() => new ValidationEngine<TClass>(model, config), []);
}
