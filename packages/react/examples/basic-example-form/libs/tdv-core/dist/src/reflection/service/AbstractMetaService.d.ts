import { Types } from "../../utilities";
type FieldDecoratorCtx<T = unknown> = Readonly<{
    kind: "getter" | "method" | "field";
    static: boolean;
    private: boolean;
    name: string;
    metadata?: globalThis.DecoratorMetadataObject;
    access: {
        get: (object: any) => T;
    };
}>;
/** Type alias for strategies that can either be a decorator context or a class. */
export type MetaStrategy = FieldDecoratorCtx<any> | Types.Class<any> | DecoratorContext;
/**
 * Abstract class for managing metadata.
 * @remarks This class provides methods for managing metadata associated with a given strategy. It can be used to get, set, and check for the existence of attributes in the metadata.
 */
export declare abstract class AbstractMetaService<Entry> {
    #private;
    protected context?: FieldDecoratorCtx<any>;
    /**
     * Constructor for AbstractMetaService.
     * @param injectionKey - The key used for metadata injection.
     * @param strategy - The strategy for which metadata is managed.
     * @param initial - A function that returns the initial value for the metadata entry.
     */
    constructor(injectionKey: string, strategy: MetaStrategy, initial: () => Entry);
    /**
     * Gets the class associated with this AbstractMetaService.
     */
    get class(): Types.Class<any>;
    /**
     * Sets the class associated with this AbstractMetaService.
     */
    set class(clazz: Types.Class<any>);
    /**
     * Gets the metadata object.
     */
    get metadata(): DecoratorMetadataObject;
    /**
     * Gets the data entry from the metadata.
     *
     * @returns The data entry.
     */
    get data(): Entry;
    /**
     * Checks if an attribute exists in the metadata.
     *
     * @protected
     * @param key - The key of the attribute.
     * @returns True if the attribute exists, false otherwise.
     */
    protected hasAttr(key: string): boolean;
    /**
     * Gets an attribute from the metadata.
     *
     * @param attrKey - The key of the attribute.
     * @param attrDefault - A function that returns the default value for the attribute.
     * @returns The value of the attribute.
     */
    protected attr<T>(attrKey: string, attrDefault?: () => T): T;
}
export {};
//# sourceMappingURL=AbstractMetaService.d.ts.map