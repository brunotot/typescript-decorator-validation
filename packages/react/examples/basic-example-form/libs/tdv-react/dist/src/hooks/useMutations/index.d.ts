import { Utilities } from "tdv-core";
import type UseFormNamespace from "./../useForm/types";
import type ns from "./types";
export default function useMutations<TClass, TBody = TClass>(clazz: Utilities.Types.Class<TClass>, { setForm }: ns.UseMutationsConfig<TBody>): UseFormNamespace.UseFormChangeHandlerMap<TBody>;
//# sourceMappingURL=index.d.ts.map