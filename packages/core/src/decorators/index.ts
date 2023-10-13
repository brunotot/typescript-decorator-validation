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
      get: (object: any) => Accept;
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
   * @param message - The default message to return if no message is found in the provider.
   *
   * @returns The extracted message or the default message if none is found.
   */
  export function message(
    definedMessage?: string,
    locale?: API.Localization.Resolver.LocaleResolver.Locale,
    key?: API.Localization.Service.MessageReaderService.MessageKey,
    ...args: any[]
  ): string {
    const msg = definedMessage ?? API.Utilities.Strings.EMPTY;
    const isTranslationDefined = !locale || !key;
    const isMessageDefined = msg.length > 0;
    const translateFn = API.Localization.Service.TranslationService.translate;
    const resolverFn = API.Localization.Resolver.MessageResolver.resolve;
    return isTranslationDefined
      ? msg
      : isMessageDefined
      ? translateFn(locale, key, ...args)
      : resolverFn(locale, msg);
  }

  /**
   * Extracts validation groups from the provided decorator properties.
   * @typeParam T - The type of the object being validated.
   * @param provider - The decorator properties.
   * @returns An array of unique validation groups.
   */
  export function groups(provider?: Props.Any): string[] {
    return provider?.groups === undefined
      ? []
      : Array.isArray(provider.groups)
      ? API.Utilities.Objects.unique(provider.groups)
      : [provider.groups];
  }

  /**
   * Filters validators based on the provided validation groups.
   * @typeParam TFieldType - The type of the field being validated.
   * @param data - The array of metadata for each validator.
   * @param groups - The validation groups to filter by.
   * @returns An array of filtered validators.
   */
  export function groupedValidators<TFieldType>(
    data: Array<API.Validation.Metadata<TFieldType>>,
    groups: string[]
  ): Array<API.Validation.Metadata<TFieldType>> {
    return data.filter((meta: API.Validation.Metadata<TFieldType>) =>
      groups.length > 0
        ? meta.groups.some((o) => groups.includes(o))
        : meta.groups.length === 0
    );
  }
}

export default Decorator;
