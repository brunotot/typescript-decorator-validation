import { $ } from "../types/namespace/Utility.ns";

export type Locale = "hr" | "en" | "de" | "es" | "fr" | "it";

export type LocaleDefault = "en";

export type MessageFn<T extends any[] = []> = $.FuncFactory<T, string>;
