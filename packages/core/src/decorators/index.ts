import Localization from "../localization";
import ValidationConfigurer from "../reflection/service/impl/FieldValidatorMetaService";
import Objects from "../types/namespace/objects.namespace";
import Validation from "../types/namespace/validation.namespace";
import ValidatorServiceNs from "./kind/derived/FieldValidatorDecorator";
/**
 * A collection of types and interfaces for creating and handling decorators.
 */
namespace Decorator {
  export type ContextKind =
    | "class"
    | "method"
    | "getter"
    | "setter"
    | "accessor"
    | "field";

  /**
   * Type definition for a decorator function.
   *
   * @typeParam T - The type of the value being decorated.
   */
  export type Instance<T = unknown> = (
    target: any,
    context: Decorator.Context<T>
  ) => void;

  /**
   * Context object passed to a decorator function.
   *
   * @typeParam Accept - The type of value the context accepts.
   */
  export type Context<Accept = unknown> = Readonly<{
    kind: "field" | "method" | "getter";
    static: boolean;
    private: boolean;
    name: string;
    metadata: globalThis.DecoratorMetadata;
    access: {
      get(object: any): Accept;
    };
  }>;

  /**
   * Supplier function for generating decorators.
   *
   * @typeParam T - The type of the value being decorated.
   */
  export type Supplier<T = unknown> = (
    name: string,
    meta: ValidationConfigurer,
    context: Decorator.Context<T>
  ) => void;

  /**
   * Properties that can be partially applied to a decorator.
   *
   * @typeParam T - The type of the object being decorated.
   */
  export type ImpartialProps<T extends object = {}> = T & {
    groups?: Validation.GroupsParam;
    message: string;
  };

  /**
   * Properties that can be partially applied to a decorator, including the value.

   *
   * @typeParam V - The type of the value being decorated.
   * @typeParam T - The type of the object being decorated.
   */
  export type PartialProps<V = string, T extends object = ValueProps<V>> =
    | V
    | (T & {
        groups?: Validation.GroupsParam;
        message?: string;
      });

  /**
   * Properties for specifying the value in a decorator.
   *
   * @typeParam T - The type of the value being decorated.
   */
  export type ValueProps<T> = T extends string
    ? {}
    : {
        value: T;
      };

  // export import DecoratorService = DecoratorServiceNs;

  export import ValidatorService = ValidatorServiceNs;

  /**
   * Extracts a message from the provided decorator properties.
   *
   * @typeParam T - The type of the object being validated.
   *
   * @param provider - The decorator properties.
   * @param defaultMessage - The default message to return if no message is found in the provider.
   *
   * @returns The extracted message or the default message if none is found.
   */
  export function message<T extends object>(
    provider: Decorator.PartialProps<any, T> | undefined,
    defaultMessage: string,
    locale: Localization.Locale
  ): string {
    if (!provider) return defaultMessage;
    const providerType = typeof provider;
    const msgNullable = providerType ? provider : provider.message;
    const msgNonNull = msgNullable ?? "";
    return msgNonNull.length
      ? Localization.MessageResolver.resolve(locale, msgNonNull)
      : defaultMessage;
  }

  /**
   * Extracts validation groups from the provided decorator properties.
   *
   * @typeParam T - The type of the object being validated.
   *
   * @param provider - The decorator properties.
   *
   * @returns An array of unique validation groups.
   */
  export function groups<T extends object>(
    provider: Decorator.PartialProps<any, T>
  ): Validation.Group[] {
    return Array.isArray(provider)
      ? Objects.unique(provider)
      : typeof provider === "object"
      ? Array.isArray(provider.groups)
        ? Objects.unique(provider.groups)
        : provider.groups
        ? [provider.groups]
        : []
      : [];
  }
}

export default Decorator;
