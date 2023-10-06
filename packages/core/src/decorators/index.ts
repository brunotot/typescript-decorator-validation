import API from "api";

import ClassBaseDecoratorNamespace from "./kind/ClassBaseDecorator";
import FieldBaseDecoratorNamespace from "./kind/FieldBaseDecorator";
import ClassValidatorDecoratorNamespace from "./kind/derived/ClassValidatorDecorator";
import FieldValidatorDecoratorNamespace from "./kind/derived/FieldValidatorDecorator";
import DecoratorProps from "./props";

/**
 * A collection of types and interfaces for creating and handling decorators.
 */
namespace Decorator {
  export import Props = DecoratorProps;

  // Decorator services
  export import FieldBaseDecorator = FieldBaseDecoratorNamespace;
  export import ClassBaseDecorator = ClassBaseDecoratorNamespace;
  export import FieldValidatorDecorator = FieldValidatorDecoratorNamespace;
  export import ClassValidatorDecorator = ClassValidatorDecoratorNamespace;

  /**
   * Type definition for a decorator function.
   *
   * @typeParam T - The type of the value being decorated.
   */
  export type Instance<T = unknown> = (
    target: any,
    context: API.Decorator.Context<T>
  ) => void;

  /**
   * Context object passed to a decorator function
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
    meta: API.Reflection.Services.FieldValidatorMetaService.default,
    context: API.Decorator.Context<T>
  ) => void;

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
  export function message(
    provider: Props.GenericModel,
    defaultMessage: string,
    locale: API.Localization.Locale
  ): string {
    if (!provider) return defaultMessage;
    const providerType = typeof provider;
    const msgNullable = providerType ? provider : provider.message;
    const msgNonNull = msgNullable ?? "";
    return msgNonNull.length
      ? API.Localization.MessageResolver.resolve(locale, msgNonNull)
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
  export function groups(provider: Props.GenericModel): string[] {
    return isDecoratorProps(provider) && "groups" in provider
      ? Array.isArray(provider.groups)
        ? API.Utilities.Objects.unique(provider.groups)
        : provider.groups
        ? [provider.groups]
        : []
      : [];
  }

  export function args<T>(props: Props.MultiArgs<T>, key: string = "value"): T {
    return isDecoratorProps(props) && key in (props as any)
      ? (props as any)[key]
      : (props as T);
  }

  export function groupedValidators<TFieldType>(
    data: API.Validation.Metadata<TFieldType>[],
    groups: string[]
  ) {
    return data.filter((meta: API.Validation.Metadata<TFieldType>) =>
      groups.length
        ? meta.groups.some((o) => groups.includes(o))
        : !meta.groups.length
    );
  }

  function isDecoratorProps(props: Props.GenericModel): boolean {
    return !!props && !Array.isArray(props) && typeof props === "object";
  }
}

export default Decorator;
