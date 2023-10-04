import Localization from "../localization";
import ValidationConfigurer from "../reflection/service/impl/FieldValidatorMetaService";
import Objects from "../types/namespace/objects.namespace";
import ClassDecorator from "./kind/ClassDecorator";
import FieldDecorator from "./kind/FieldDecorator";
import ClassValidatorDecorator from "./kind/derived/ClassValidatorDecorator";
import FieldValidatorDecorator from "./kind/derived/FieldValidatorDecorator";
import DecoratorProps from "./props";

/**
 * A collection of types and interfaces for creating and handling decorators.
 */
namespace Decorator {
  export import Props = DecoratorProps;

  export import FieldBaseService = FieldDecorator;

  export import ClassBaseService = ClassDecorator;

  export import FieldValidatorService = FieldValidatorDecorator;

  export import ClassValidatorService = ClassValidatorDecorator;

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
   * Context object passed to a decorator functio
  const [min, max] = Array.isArray(props) ? props : props.valuen.
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
  export function groups(provider: Props.GenericModel): string[] {
    return isDecoratorProps(provider) && "groups" in provider
      ? Array.isArray(provider.groups)
        ? Objects.unique(provider.groups)
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

  function isDecoratorProps(props: Props.GenericModel): boolean {
    return !!props && !Array.isArray(props) && typeof props === "object";
  }
}

export default Decorator;
