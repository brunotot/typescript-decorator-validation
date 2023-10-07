import { useMemo } from "react";
import TdvCore, { Validation } from "tdv-core";
import ns from "./types";

export default function useValidationEngine<TClass>(
  model: TdvCore.Utilities.Types.Class<TClass>,
  config?: ns.UseValidationEngineConfig<TClass>
) {
  return useMemo(
    () => new Validation.ValidationEngine<TClass>(model, config),
    []
  );
}
