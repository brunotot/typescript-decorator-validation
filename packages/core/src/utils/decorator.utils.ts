import {
  DecoratorPartialProps,
  ValidationGroup,
} from "../decorators/types/DecoratorProps.type";
import { $ } from "../types/namespace/Utility.ns";
import { hasValue } from "./object.utils";

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

export function isValidationGroupUnion(
  classGroups: ValidationGroup[],
  validatorGroups: ValidationGroup[]
) {
  return classGroups.length
    ? validatorGroups.some((o) => classGroups.includes(o))
    : !validatorGroups.length;
}

export function evaluateNullableValidity<T>(
  object: $.Nullable<T>,
  isValid: (value: T) => boolean
) {
  return !hasValue(object) ? true : isValid(object);
}
