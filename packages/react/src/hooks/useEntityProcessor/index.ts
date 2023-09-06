import { useMemo } from "react";
import { Class, EntityProcessor } from "tdv-core";
import ns from "./types";

export default function useEntityProcessor<TClass, TBody = TClass>(
  model: Class<TClass>,
  config?: ns.UseEntityProcessorConfig<TBody>
) {
  return useMemo(() => new EntityProcessor<TClass, TBody>(model, config), []);
}
