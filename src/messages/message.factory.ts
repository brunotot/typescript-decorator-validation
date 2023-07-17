import { $ } from "../model/type/namespace/Utility.ns";
import { sprintf } from "../model/utility/object.utility";
import { getLocale } from "./model/Locale";
import translations from "./model/Translations";

export type MessageFn<T extends any[] = []> = $.FuncFactory<T, string>;

// Central method for getting translation handlers.
export function t(key: string, ...args: any[]): string {
  const locale = getLocale();
  const service = translations[locale];
  return sprintf(service[key], ...args);
}
