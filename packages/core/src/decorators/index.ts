import ValidationConfigurer from "../reflection/service/impl/reflection.service.validation";
import Validation from "../types/namespace/validation.namespace";
import DecoratorServiceNs from "./service/decorator.service";
import ParamsExtractorServiceNs from "./service/params-extractor.service";
import ValidatorServiceNs from "./service/validator.service";

/**
 * A namespace which holds decorator-related methods and types
 *
 * @description
 * A collection of types and interfaces for creating and handling decorators.
 */
namespace Decorator {
  /**
   * @typeParam T - The type of the value being decorated.
   *
   * @description
   * Type definition for a decorator function.
   */
  export type Instance<T = unknown> = (
    target: any,
    context: Decorator.Context<T>
  ) => void;

  /**
   * @typeParam Accept - The type of value the context accepts.
   *
   * @description
   * Context object passed to a decorator function.
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
   * @typeParam T - The type of the value being decorated.
   *
   * @description
   * Supplier function for generating decorators.
   */
  export type Supplier<T = unknown> = (
    name: string,
    meta: ValidationConfigurer,
    context: Decorator.Context<T>
  ) => void;

  /**
   * @typeParam T - The type of the object being decorated.
   *
   * @description
   * Properties that can be partially applied to a decorator.
   */
  export type ImpartialProps<T extends object = {}> = T & {
    groups?: Validation.GroupsParam;
    message: string;
  };

  /**
   * @typeParam V - The type of the value being decorated.
   * @typeParam T - The type of the object being decorated.
   *
   * @description
   * Properties that can be partially applied to a decorator, including the value.
   */
  export type PartialProps<V = string, T extends object = ValueProps<V>> =
    | V
    | (T & {
        groups?: Validation.GroupsParam;
        message?: string;
      });

  /**
   * @typeParam T - The type of the value being decorated.
   *
   * @description
   * Properties for specifying the value in a decorator.
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
