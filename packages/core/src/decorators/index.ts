import ValidationConfigurer from "../reflection/service/impl/reflection.service.validation";
import Validation from "../types/namespace/validation.namespace";
import DecoratorServiceNs from "./service/decorator.service";
import ParamsExtractorServiceNs from "./service/params-extractor.service";
import ValidatorServiceNs from "./service/validator.service";

/**
 * A collection of types and interfaces for creating and handling decorators.
 */
namespace Decorator {
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

  export import DecoratorService = DecoratorServiceNs;

  export import ValidatorService = ValidatorServiceNs;

  export import ParamsExtractorService = ParamsExtractorServiceNs;
}

export default Decorator;
