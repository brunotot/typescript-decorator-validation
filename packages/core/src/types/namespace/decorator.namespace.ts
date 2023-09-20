import ValidationMetaService from "../../reflection/service/impl/reflection.service.validation";
import Validation from "./validation.namespace";

namespace Decorator {
  export type Type<T = unknown> = (
    target: any,
    context: Decorator.Context<T>
  ) => void;

  export type Context<Accept = unknown> = Readonly<{
    kind: "field" | "method" | "getter";
    static: boolean;
    private: boolean;
    name: string;
    metadata: DecoratorMetadata;
    access: {
      get(object: any): Accept;
    };
  }>;

  export type Supplier<T = unknown> = (
    name: string,
    meta: ValidationMetaService,
    context: Decorator.Context<T>
  ) => void;

  export type ImpartialProps<T extends object = {}> = T & {
    groups?: Validation.GroupsParam;
    message: string;
  };

  export type PartialProps<V = string, T extends object = ValueProps<V>> =
    | V
    | (T & {
        groups?: Validation.GroupsParam;
        message?: string;
      });

  export type ValueProps<T> = T extends string
    ? {}
    : {
        value: T;
      };
}

export default Decorator;
