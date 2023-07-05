export type MetadataType = Record<PropertyKey, unknown>;

export interface Context {
  name: string;
  metadata: MetadataType;
}
