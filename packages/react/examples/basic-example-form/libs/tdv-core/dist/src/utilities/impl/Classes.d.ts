import { Types } from "../impl/Types";
export declare namespace Classes {
    /**
     * Retrieves the names of all fields in a class.
     *
     * @param constructor - The class constructor.
     * @returns An array of field names.
     */
    function getClassFieldNames<TClass>(constructor: Types.Class<TClass>): Array<keyof TClass>;
    /**
     * Retrieves the property descriptor for a specific field in a class.
     *
     * @param constructor - The class constructor.
     * @param name - The name of the field.
     * @returns The property descriptor for the field.
     */
    function getClassFieldDescriptor<TClass>(constructor: Types.Class<TClass>, name: keyof TClass): PropertyDescriptor | undefined;
    /**
     * Retrieves or initializes metadata for a given strategy.
     *
     * @param strategy - The strategy to get metadata for.
     * @returns The metadata object.
     */
    function getMetadata(strategy: any): DecoratorMetadataObject;
    /**
     * Checks if a given strategy is a class.
     *
     * @param strategy - The strategy to check.
     * @returns True if the strategy is a class, false otherwise.
     */
    function isClass(strategy: any): strategy is Types.Class<any>;
}
//# sourceMappingURL=Classes.d.ts.map