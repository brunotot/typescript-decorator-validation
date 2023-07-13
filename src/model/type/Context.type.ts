import { Nullable } from "../../service/ValidatorService";

export type MetadataType = Record<PropertyKey, unknown>;

export type AcceptableDecoratorFieldType<T = unknown> = Nullable<
  T | ((...args: any[]) => T)
>;

export type ContextKind = "field" | "method" | "getter";

export type Context<Accept = unknown> = Readonly<{
  kind: ContextKind;
  static: boolean;
  private: boolean;
  name: string;
  metadata: MetadataType;
  access: {
    get(object: any): Accept;
  };
}>;
