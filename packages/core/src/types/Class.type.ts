export type Class<T> = new (...args: any[]) => T;
export type ConstructorType<T> = { new (): T };
export type StripClass<TClass extends Class<any>> =
  TClass extends new () => infer U ? U : never;
