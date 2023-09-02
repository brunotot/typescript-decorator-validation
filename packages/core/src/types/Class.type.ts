export type Class<T> = new () => T;
export type ConstructorType<T> = { new (): T };
export type ClassCreator<T> = () => Class<T>;
export type StripClass<TClass extends Class<any>> =
  TClass extends new () => infer U ? U : never;
