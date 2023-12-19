import ObjectStrategyType from "../ObjectStrategy/types";
/**
 * Namespace for ObjectArrayGetter Strategy Types.
 */
var ObjectArrayGetterStrategyType;
(function (ObjectArrayGetterStrategyType) {
    /**
     * Constant name identifier for this strategy.
     */
    ObjectArrayGetterStrategyType.Name = `() => ${ObjectStrategyType.Name}[]`;
})(ObjectArrayGetterStrategyType || (ObjectArrayGetterStrategyType = {}));
export default ObjectArrayGetterStrategyType;
