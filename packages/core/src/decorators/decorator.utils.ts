import { $ } from "../types/namespace/Utility.ns";
import { hasValue } from "../utils/object.utils";
import { DecoratorPartialProps, ValidationGroup } from "./decorator.types";

export function extractMessage<T extends object>(
  provider: DecoratorPartialProps<any, T>,
  defaultMessage: string
) {
  if (!provider) {
    return defaultMessage;
  }
  const nullableMessage =
    typeof provider === "string" ? provider : provider.message;
  return !!nullableMessage?.length ? nullableMessage : defaultMessage;
}

export function extractGroups<T extends object>(
  provider: DecoratorPartialProps<any, T>
): ValidationGroup[] {
  return Array.isArray(provider)
    ? provider
    : typeof provider === "object"
    ? Array.isArray(provider.groups)
      ? provider.groups
      : provider.groups
      ? [provider.groups]
      : []
    : [];
}

export function evaluateNullableValidity<T>(
  object: $.Nullable<T>,
  isValid: (value: T) => boolean
) {
  return !hasValue(object) ? true : isValid(object);
}
