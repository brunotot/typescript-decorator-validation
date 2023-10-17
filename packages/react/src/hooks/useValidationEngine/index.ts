import { useMemo } from "react";
import type TdvCore from "tdv-core";
import { Validation } from "tdv-core";
import type ns from "./types";

export default function useValidationEngine<TClass>(
  model: TdvCore.Utilities.Types.Class<TClass>,
  config?: ns.UseValidationEngineConfig<TClass>
): Validation.ValidationEngine<TClass> {
  return useMemo(
    () => new Validation.ValidationEngine<TClass>(model, config),
    []
  );
}