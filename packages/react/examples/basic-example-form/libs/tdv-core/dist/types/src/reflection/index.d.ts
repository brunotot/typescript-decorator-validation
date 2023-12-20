import type API from "../../index";
import ReflectionStrategyNamespace from "../strategy/models/StrategyMapper";
import ReflectionDescriptor from "./models/ReflectionDescriptor";
import ReflectionRule from "./models/ReflectionRule";
import * as _AbstractMetaService from "./service/AbstractMetaService";
import * as _ClassValidatorMetaService from "./service/impl/ClassValidatorMetaService";
import * as _FieldValidatorMetaService from "./service/impl/FieldValidatorMetaService";
/**
 * A namespace which holds data related to reading and manipulating metadata through reflection
 */
declare namespace Reflection {
    export import Descriptor = ReflectionDescriptor;
    /**
     * Retrieves the names of all fields in a class.
     *
     * @param constructor - The class constructor.
     * @returns An array of field names.
     */
    function getClassFieldNames<TClass>(constructor: API.Utilities.Types.Class<TClass>): Array<keyof TClass>;
    /**
     * Retrieves the property descriptor for a specific field in a class.
     *
     * @param constructor - The class constructor.
     * @param name - The name of the field.
     * @returns The property descriptor for the field.
     */
    function getClassFieldDescriptor<TClass>(constructor: API.Utilities.Types.Class<TClass>, name: keyof TClass): PropertyDescriptor | undefined;
    /**
     * Retrieves or initializes metadata for a given strategy.
     *
     * @param strategy - The strategy to get metadata for.
     * @returns The metadata object.
     */
    function getMetadata(strategy: MetaStrategy): DecoratorMetadataObject;
    /**
     * Checks if a given strategy is a class.
     *
     * @param strategy - The strategy to check.
     * @returns True if the strategy is a class, false otherwise.
     */
    function isClass(strategy: MetaStrategy): strategy is API.Utilities.Types.Class<any>;
    /**
     * Type alias for strategies that can either be a decorator context or a class.
     */
    type MetaStrategy = API.Decorator.ForField.Basic.Context<any> | API.Utilities.Types.Class<any> | DecoratorContext;
    export import Rule = ReflectionRule;
    export import Strategy = ReflectionStrategyNamespace;
    /**
     * Collection of service classes for managing validators on class or field level.
     */
    namespace Services {
        export import AbstractMetaService = _AbstractMetaService.AbstractMetaService;
        export import ClassValidatorMetaService = _ClassValidatorMetaService.ClassValidatorMetaService;
        export import FieldValidatorMetaService = _FieldValidatorMetaService.FieldValidatorMetaService;
    }
}
export default Reflection;
//# sourceMappingURL=index.d.ts.map