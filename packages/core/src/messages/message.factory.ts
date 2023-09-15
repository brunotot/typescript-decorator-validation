import { getLocale } from "./model/locale";
import localizedMessages from "./model/messages";

function sprintf(str: string, ...args: any[]) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

// Central method for getting translation handlers.
const t = (key: string, ...args: any[]) => {
  const locale = getLocale();
  const service = localizedMessages[locale];
  return sprintf(service[key], ...args);
};

export default t;