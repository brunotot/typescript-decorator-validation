import ValidationMetaService from "../reflection/service/impl/reflection.service.validation";
import Validation from "../types/namespace/validation.namespace";

export type Decorator<T = unknown> = (
  target: any,
  context: DecoratorContext<T>
) => void;

export type DecoratorContextMetadata = DecoratorMetadata;

export type DecoratorContext<Accept = unknown> = Readonly<{
  kind: "field" | "method" | "getter";
  static: boolean;
  private: boolean;
  name: string;
  metadata: DecoratorContextMetadata;
  access: {
    get(object: any): Accept;
  };
}>;

export type DecoratorImpartialProps<T extends object = {}> = T & {
  groups?: Validation.SpreadableGroup;
} & {
  message: string;
};

export type DecoratorPartialProps<
  V = string,
  T extends object = DecoratorValueProps<V>
> =
  | V
  | (T & {
      groups?: Validation.SpreadableGroup;
    } & Partial<{
        message: string;
      }>);

export type DecoratorValueProps<T> = T extends string
  ? {}
  : {
      value: T;
    };

export type DecoratorSupplier<T = unknown> = (
  name: string,
  meta: ValidationMetaService,
  context: DecoratorContext<T>
) => void;
