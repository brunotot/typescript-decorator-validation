type ClassDef<T> = new (...args: any[]) => T;
type ObjectDef<T> = (...args: any[]) => T;

export type Class<T> = new (...args: any[]) => T;
export type ConstructorType<T> = { new (): T };

export type CompositeConstructor<T> = ClassDef<T> | ObjectDef<T>;
