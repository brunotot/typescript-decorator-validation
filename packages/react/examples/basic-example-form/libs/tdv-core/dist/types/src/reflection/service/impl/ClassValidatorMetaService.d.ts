import { AbstractMetaService, type MetaStrategy } from "../../service/AbstractMetaService";
import { type EventEmitter, type Types } from "../../../utilities";
import { ValidationMetadata } from "../../../validation/models/ValidationMetadata";
import type { ValidationEvaluator } from "../../../validation/types";
/**
 * Unwraps a MetaStrategy type to its inferred class.
 * @typeParam TStrategy - The MetaStrategy type to unwrap.
 */
export type UnwrapMetaStrategy<TStrategy extends MetaStrategy> = TStrategy extends Types.Class<infer TInferredClass> ? TInferredClass : any;
/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation (at class level). It provides methods to add validators and read them.
 */
export declare class ClassValidatorMetaService<TStrategy extends MetaStrategy> extends AbstractMetaService<ValidationMetadata<any>> {
    /**
     * Static method to create a new instance of ClassValidatorMetaService.
     * @param strategy - The strategy to inject.
     * @returns A new instance of ClassValidatorMetaService.
     */
    static inject<T extends MetaStrategy>(strategy: T, eventEmitter: EventEmitter): ClassValidatorMetaService<UnwrapMetaStrategy<T>>;
    eventEmitter: EventEmitter;
    private constructor();
    /**
     * Adds a class-level validator to the provided class.
     * @param isValid - The validation function.
     * @param groups - Optional validation groups.
     */
    addValidator(isValid: ValidationEvaluator<Types.UnwrapClass<TStrategy>>, groups: string[]): void;
}
//# sourceMappingURL=ClassValidatorMetaService.d.ts.map