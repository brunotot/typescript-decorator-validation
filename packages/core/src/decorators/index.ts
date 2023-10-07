import API from "api";

import DecoratorProps from "./models/DecoratorProps";
import ClassDecoratorServiceNamespace from "./service/ClassDecoratorService";
import ClassDecoratorValidatorServiceNamespace from "./service/ClassDecoratorValidatorService";
import FieldDecoratorServiceNamespace from "./service/FieldDecoratorService";
import FieldDecoratorValidatorServiceNamespace from "./service/FieldDecoratorValidatorService";

/**
 * A collection of types and interfaces for creating and handling decorators.
 */
namespace Decorator {
  /**
   * A collection of services which allow for easy manipulation of field and class decorators.
   */
  export namespace Service {
    export import FieldDecoratorService = FieldDecoratorServiceNamespace;
    export import ClassDecoratorService = ClassDecoratorServiceNamespace;
    export import FieldDecoratorValidatorService = FieldDecoratorValidatorServiceNamespace;
    export import ClassDecoratorValidatorService = ClassDecoratorValidatorServiceNamespace;
  }

  /**
   * Type definition for a decorator function.
   *
   * @typeParam T - The type of the value being decorated.
   */
  export type Instance<T = unknown> = ((
    target: any,
    context: API.Decorator.Context<T>
  ) => void) & {};

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
  export type Supplier<T = unknown> = ((
    name: string,
    meta: API.Reflection.Services.FieldValidatorMetaService,
    context: API.Decorator.Context<T>
  ) => void) & {};

  export import Props = DecoratorProps;

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
    locale: API.Localization.Resolver.LocaleResolver.Locale
  ): string {
    if (!provider) return defaultMessage;
    const providerType = typeof provider;
    const msgNullable = providerType ? provider : provider.message;
    const msgNonNull = msgNullable ?? "";
    return msgNonNull.length
      ? API.Localization.Resolver.MessageResolver.resolve(locale, msgNonNull)
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

  /**
   * Extracts argument values from the provided decorator properties.
   *
   * @typeParam T - The type of the argument value.
   *
   * @param props - The decorator properties.
   * @param key - The key of the argument.
   *
   * @returns The extracted argument value.
   */
  export function args<T>(props: Props.MultiArgs<T>, key: string = "value"): T {
    return isDecoratorProps(props) && key in (props as any)
      ? (props as any)[key]
      : (props as T);
  }

  /**
   * Filters validators based on the provided validation groups.
   *
   * @typeParam TFieldType - The type of the field being validated.
   *
   * @param data - The array of metadata for each validator.
   * @param groups - The validation groups to filter by.
   *
   * @returns An array of filtered validators.
   */
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

  /**
   * Checks if a given object is a DecoratorProps object.
   *
   * @param props - The object to check.
   *
   * @returns A boolean indicating if the object is a DecoratorProps object.
   */
  function isDecoratorProps(props: Props.GenericModel): boolean {
    return !!props && !Array.isArray(props) && typeof props === "object";
  }
}

export default Decorator;
