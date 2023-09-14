import MetadataProcessor from "../model/processor/MetadataProcessor";
import { $ } from "../types/namespace/Utility.ns";

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

export type ValidationGroup = string | number | symbol;

export type ValidationGroupProp = ValidationGroup | ValidationGroup[];

export type DecoratorImpartialProps<T extends object = {}> =
  DecoratorMessageMandatoryPropsGroup<T>;

export type DecoratorPartialProps<
  V = string,
  T extends object = DecoratorValueProps<V>
> = V | DecoratorMessageOptionalPropsGroup<T>;

type DecoratorValueProps<T> = T extends string
  ? {}
  : {
      value: T;
    };

type DecoratorMessageOptionalPropsGroup<T extends object> = T &
  DecoratorGroupsProps &
  $.Optional<DecoratorMessageProps>;

type DecoratorMessageMandatoryPropsGroup<T extends object> = T &
  DecoratorGroupsProps &
  DecoratorMessageProps;

type DecoratorGroupsProps = {
  groups?: ValidationGroupProp;
};

type DecoratorMessageProps = {
  message: string;
};

export type DecoratorSupplier<T = unknown> = (
  name: string,
  processor: MetadataProcessor,
  context: DecoratorContext<T>
) => void;
