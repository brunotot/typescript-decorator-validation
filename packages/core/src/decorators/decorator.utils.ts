import $ from "../types";
import Decorator from "../types/namespace/decorator.namespace";
import Validation from "../types/namespace/validation.namespace";

export function extractMessage<T extends object>(
  provider: Decorator.PartialProps<any, T>,
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
  provider: Decorator.PartialProps<any, T>
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
  return !$.Objects.hasValue(object) ? true : isValid(object);
}
