import type API from "../../index";
import { FieldDecoratorCtx } from "./../decorators";
export * from "./models";
export * from "./service";
/**
 * Retrieves the names of all fields in a class.
 *
 * @param constructor - The class constructor.
 * @returns An array of field names.
 */
export declare function getClassFieldNames<TClass>(constructor: API.Utilities.Types.Class<TClass>): Array<keyof TClass>;
/**
 * Retrieves the property descriptor for a specific field in a class.
 *
 * @param constructor - The class constructor.
 * @param name - The name of the field.
 * @returns The property descriptor for the field.
 */
export declare function getClassFieldDescriptor<TClass>(constructor: API.Utilities.Types.Class<TClass>, name: keyof TClass): PropertyDescriptor | undefined;
/**
 * Retrieves or initializes metadata for a given strategy.
 *
 * @param strategy - The strategy to get metadata for.
 * @returns The metadata object.
 */
export declare function getMetadata(strategy: MetaStrategy): DecoratorMetadataObject;
/**
 * Checks if a given strategy is a class.
 *
 * @param strategy - The strategy to check.
 * @returns True if the strategy is a class, false otherwise.
 */
export declare function isClass(strategy: MetaStrategy): strategy is API.Utilities.Types.Class<any>;
/**
 * Type alias for strategies that can either be a decorator context or a class.
 */
export type MetaStrategy = FieldDecoratorCtx<any> | API.Utilities.Types.Class<any> | DecoratorContext;
//# sourceMappingURL=index.d.ts.map