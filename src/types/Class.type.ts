export type Class<T> = new () => T;
export type ConstructorType = { new (): any };
export type ClassCreator<T> = () => Class<T>;
