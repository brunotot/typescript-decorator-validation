import API from "../../../../index";
import { AbstractMetaService } from "../AbstractMetaService";
/**
 * A configurer class which allows for easier manipulation of decorated fields and corresponding metadata
 *
 * @remarks
 * This class is responsible for managing metadata related to validation.
 * It provides methods to add validators, get field names, and manage descriptors.
 */
export declare class FieldValidatorMetaService extends AbstractMetaService<Map<string, API.Reflection.Descriptor.Instance<any, any, any>>> {
    #private;
    /**
     * Static method to create a new instance of FieldValidatorMetaService.
     *
     * @param strategy - The strategy to inject.
     * @returns A new instance of FieldValidatorMetaService.
     */
    static inject(strategy: API.Reflection.MetaStrategy): FieldValidatorMetaService;
    private constructor();
    /**
     * Adds a validator to a field.
     *
     * @param field - The name of the field.
     * @param isValid - The validation function.
     * @param groups - Optional validation groups.
     */
    addValidator(field: string, isValid: API.Validation.Evaluator<any>, groups: string[]): void;
    /**
     * Gets the names of all fields present within given
     * reflection strategy (`Types.Class<T>` or `Decorator.Context`).
     *
     * @returns An array of field names.
     */
    getFields(): string[];
    /**
     * Checks if a descriptor exists for a given name.
     *
     * @param name - The name of a field descriptor.
     * @returns `true` if the descriptor exists, `false` otherwise.
     */
    hasDescriptor(name: string): boolean;
    /**
     * Gets a typed descriptor for a given field name.
     *
     * @param thisName - The name of the field.
     * @returns The typed descriptor.
     */
    getTypedDescriptor<TClass, TName extends keyof TClass>(thisName: TName): API.Reflection.Descriptor.Instance<unknown, TClass, TName>;
    /**
     * Gets an untyped descriptor for a given field key.
     *
     * @param fieldKey - The key of the field.
     * @returns The untyped descriptor.
     */
    getUntypedDescriptor(fieldKey: any): API.Reflection.Descriptor.Instance<any, any, any>;
}
//# sourceMappingURL=FieldValidatorMetaService.d.ts.map