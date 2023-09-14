import { $ } from "../types/namespace/Utility.ns";

export type Locale = "hr" | "en";

export type LocaleDefault = "en";

export type MessageFn<T extends any[] = []> = $.FuncFactory<T, string>;
