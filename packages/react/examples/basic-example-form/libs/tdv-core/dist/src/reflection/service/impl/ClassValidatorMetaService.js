"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidatorMetaService = void 0;
const AbstractMetaService_1 = require("../../service/AbstractMetaService");
const ValidationMetadata_1 = require("../../../validation/models/ValidationMetadata");
/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation (at class level). It provides methods to add validators and read them.
 */
class ClassValidatorMetaService extends AbstractMetaService_1.AbstractMetaService {
    /**
     * Static method to create a new instance of ClassValidatorMetaService.
     * @param strategy - The strategy to inject.
     * @returns A new instance of ClassValidatorMetaService.
     */
    static inject(strategy, eventEmitter) {
        return new ClassValidatorMetaService(strategy, eventEmitter);
    }
    constructor(strategy, eventEmitter) {
        super(ClassValidatorMetaService.name, strategy, () => new ValidationMetadata_1.ValidationMetadata());
        this.eventEmitter = eventEmitter;
    }
    /**
     * Adds a class-level validator to the provided class.
     * @param isValid - The validation function.
     * @param groups - Optional validation groups.
     */
    addValidator(isValid, groups) {
        this.data.add({
            validate: isValid,
            groups,
        });
    }
}
exports.ClassValidatorMetaService = ClassValidatorMetaService;
