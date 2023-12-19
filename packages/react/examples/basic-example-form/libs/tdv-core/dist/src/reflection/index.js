import ReflectionStrategyNamespace from "../strategy/models/StrategyMapper";
import ReflectionDescriptor from "./models/ReflectionDescriptor";
import ReflectionRule from "./models/ReflectionRule";
import * as _AbstractMetaService from "./service/AbstractMetaService";
import * as _ClassValidatorMetaService from "./service/impl/ClassValidatorMetaService";
import * as _FieldValidatorMetaService from "./service/impl/FieldValidatorMetaService";
/**
 * A namespace which holds data related to reading and manipulating metadata through reflection
 */
var Reflection;
(function (Reflection) {
    Reflection.Descriptor = ReflectionDescriptor;
    /**
     * Retrieves the names of all fields in a class.
     *
     * @param constructor - The class constructor.
     * @returns An array of field names.
     */
    function getClassFieldNames(constructor) {
        function getPropertyNames(classInstance) {
            return Object.getOwnPropertyNames(classInstance !== null && classInstance !== void 0 ? classInstance : {}).filter(property => property !== "constructor");
        }
        const instance = new constructor();
        const prototype = instance.__proto__;
        const instanceProps = getPropertyNames(instance);
        const prototypeProps = getPropertyNames(prototype);
        const uniquePropsSet = new Set([...instanceProps, ...prototypeProps]);
        const uniquePropsArray = [...uniquePropsSet];
        return uniquePropsArray;
    }
    Reflection.getClassFieldNames = getClassFieldNames;
    /**
     * Retrieves the property descriptor for a specific field in a class.
     *
     * @param constructor - The class constructor.
     * @param name - The name of the field.
     * @returns The property descriptor for the field.
     */
    function getClassFieldDescriptor(constructor, name) {
        const instance = new constructor();
        const prototype = instance.__proto__;
        return Object.getOwnPropertyDescriptor(prototype, name);
    }
    Reflection.getClassFieldDescriptor = getClassFieldDescriptor;
    /**
     * Retrieves or initializes metadata for a given strategy.
     *
     * @param strategy - The strategy to get metadata for.
     * @returns The metadata object.
     */
    function getMetadata(strategy) {
        var _a, _b;
        var _c, _d;
        if (isClass(strategy)) {
            (_a = (_c = Symbol).metadata) !== null && _a !== void 0 ? _a : (_c.metadata = Symbol("Symbol.metadata"));
            (_b = strategy[_d = Symbol.metadata]) !== null && _b !== void 0 ? _b : (strategy[_d] = {});
            return strategy[Symbol.metadata];
        }
        if (strategy && !strategy.metadata) {
            strategy.metadata = {};
        }
        return strategy === null || strategy === void 0 ? void 0 : strategy.metadata;
    }
    Reflection.getMetadata = getMetadata;
    /**
     * Checks if a given strategy is a class.
     *
     * @param strategy - The strategy to check.
     * @returns True if the strategy is a class, false otherwise.
     */
    function isClass(strategy) {
        return typeof strategy === "function";
    }
    Reflection.isClass = isClass;
    Reflection.Rule = ReflectionRule;
    Reflection.Strategy = ReflectionStrategyNamespace;
    /**
     * Collection of service classes for managing validators on class or field level.
     */
    let Services;
    (function (Services) {
        Services.AbstractMetaService = _AbstractMetaService.AbstractMetaService;
        Services.ClassValidatorMetaService = _ClassValidatorMetaService.ClassValidatorMetaService;
        Services.FieldValidatorMetaService = _FieldValidatorMetaService.FieldValidatorMetaService;
    })(Services = Reflection.Services || (Reflection.Services = {}));
})(Reflection || (Reflection = {}));
export default Reflection;
