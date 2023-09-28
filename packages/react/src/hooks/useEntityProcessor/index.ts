import { useMemo } from "react";
import { TdvCore, ValidationEngine } from "tdv-core";
import ns from "./types";

export default function useEntityProcessor<TClass, TBody = TClass>(
  model: TdvCore.Types.Class<TClass>,
  config?: ns.UseEntityProcessorConfig<TBody>
) {
  return useMemo(() => new ValidationEngine<TClass, TBody>(model, config), []);
}
