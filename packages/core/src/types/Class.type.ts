export type Class<T> = new (...args: any[]) => T;
export type ConstructorType<T> = { new (): T };
