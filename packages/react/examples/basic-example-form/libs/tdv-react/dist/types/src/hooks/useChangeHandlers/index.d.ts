import { Utilities } from "tdv-core";
import { type UseFormChangeHandlerMap } from "../useForm/types";
import { type UseChangeHandlersConfig } from "./types";
/**
 * Custom hook that generates form change handlers for a given class and configuration.
 * @typeParam TClass - The class type.
 * @typeParam TBody - The body type (default is TClass).
 * @param clazz - The class to generate form change handlers for.
 * @param setForm - The form setter function.
 * @returns An object containing form change handlers for each field in the class.
 */
export declare function useChangeHandlers<TClass, TBody = TClass>(clazz: Utilities.Types.Class<TClass>, { setForm }: UseChangeHandlersConfig<TBody>): UseFormChangeHandlerMap<TBody>;
//# sourceMappingURL=index.d.ts.map