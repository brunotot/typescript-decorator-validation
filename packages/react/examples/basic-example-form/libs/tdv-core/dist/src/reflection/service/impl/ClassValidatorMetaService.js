import API from "../../../../index";
import { AbstractMetaService } from "../AbstractMetaService";
/**
 * A configurer class which allows for easier manipulation of decorated class validators and corresponding metadata
 *
 * @remarks
 * This class is responsible for managing metadata related to validation (at class level).
 * It provides methods to add validators and read them.
 */
export class ClassValidatorMetaService extends AbstractMetaService {
    /**
     * Static method to create a new instance of ClassValidatorMetaService.
     *
     * @param strategy - The strategy to inject.
     * @returns A new instance of ClassValidatorMetaService.
     */
    static inject(strategy) {
        return new ClassValidatorMetaService(strategy);
    }
    constructor(strategy) {
        super(ClassValidatorMetaService.name, strategy, () => new API.Reflection.Rule.Instance());
    }
    /**
     * Adds a class-level validator to the provided class.
     *
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
