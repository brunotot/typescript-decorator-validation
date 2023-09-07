import { $ } from "../types/namespace/Utility.ns";
import { getLocale } from "./model/Locale";
import translations from "./model/Translations";

function sprintf(str: string, ...args: any[]) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

export type MessageFn<T extends any[] = []> = $.FuncFactory<T, string>;

// Central method for getting translation handlers.
export function t(key: string, ...args: any[]): string {
  const locale = getLocale();
  const service = translations[locale];
  return sprintf(service[key], ...args);
}
