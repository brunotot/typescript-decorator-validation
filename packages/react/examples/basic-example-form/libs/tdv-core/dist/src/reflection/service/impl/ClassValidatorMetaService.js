"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidatorMetaService = void 0;
const _decorators_1 = require("../../../decorators");
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
        this.validateIf = () => true;
    }
    /**
     * Adds a class-level validator to the provided class.
     * @param validate - The validation function.
     * @param groups - Optional validation groups.
     */
    addValidator(validate, meta = _decorators_1.DEFAULT_DECORATOR_META) {
        this.data.add({ validate, meta });
    }
}
exports.ClassValidatorMetaService = ClassValidatorMetaService;
