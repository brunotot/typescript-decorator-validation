export type DecoratorContextMetadata = Record<PropertyKey, unknown>;

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
