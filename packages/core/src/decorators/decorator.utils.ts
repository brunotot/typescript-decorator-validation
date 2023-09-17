import { hasValue } from "../shared";
import $ from "../types";
import Validation from "../types/namespace/validation.namespace";
import { DecoratorPartialProps } from "./decorator.types";

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
): Validation.Group[] {
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
  object: $.Objects.Optional<T>,
  isValid: (value: T) => boolean
) {
  return !hasValue(object) ? true : isValid(object);
}
