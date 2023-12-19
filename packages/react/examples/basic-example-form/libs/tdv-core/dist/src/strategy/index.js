import StrategyMapperNamespace from "./models/StrategyMapper";
import StrategyTypesNamespace from "./models/StrategyTypes";
import * as AbstractStrategyNamespace from "./service/AbstractValidationStrategyService";
import * as FunctionStrategyNamespace from "./service/impl/FunctionStrategy";
import * as ObjectArrayGetterStrategyNamespace from "./service/impl/ObjectArrayGetterStrategy";
import * as ObjectArrayStrategyNamespace from "./service/impl/ObjectArrayStrategy";
import * as ObjectGetterStrategyNamespace from "./service/impl/ObjectGetterStrategy";
import * as ObjectStrategyNamespace from "./service/impl/ObjectStrategy";
import * as PrimitiveArrayGetterStrategyNamespace from "./service/impl/PrimitiveArrayGetterStrategy";
import * as PrimitiveArrayStrategyNamespace from "./service/impl/PrimitiveArrayStrategy";
import * as PrimitiveGetterStrategyNamespace from "./service/impl/PrimitiveGetterStrategy";
import * as PrimitiveStrategyNamespace from "./service/impl/PrimitiveStrategy";
/**
 * Namespace for grouping different validation strategy-related functionalities.
 */
var Strategy;
(function (Strategy) {
    Strategy.Types = StrategyTypesNamespace;
    Strategy.Mapper = StrategyMapperNamespace;
    /**
     * Namespace for Strategy Services.
     */
    let Service;
    (function (Service) {
        Service.AbstractStrategy = AbstractStrategyNamespace.AbstractValidationStrategyService;
        Service.FunctionStrategy = FunctionStrategyNamespace.FunctionStrat;
        Service.ObjectArrayGetterStrategy = ObjectArrayGetterStrategyNamespace.ObjectArrayGetterStrat;
        Service.ObjectArrayStrategy = ObjectArrayStrategyNamespace.ObjectArrayStrat;
        Service.ObjectGetterStrategy = ObjectGetterStrategyNamespace.ObjectGetterStrat;
        Service.ObjectStrategy = ObjectStrategyNamespace.ObjectStrat;
        Service.PrimitiveArrayGetterStrategy = PrimitiveArrayGetterStrategyNamespace.PrimitiveArrayGetterStrat;
        Service.PrimitiveArrayStrategy = PrimitiveArrayStrategyNamespace.PrimitiveArrayStrat;
        Service.PrimitiveGetterStrategy = PrimitiveGetterStrategyNamespace.PrimitiveGetterStrat;
        Service.PrimitiveStrategy = PrimitiveStrategyNamespace.PrimitiveStrat;
    })(Service = Strategy.Service || (Strategy.Service = {}));
})(Strategy || (Strategy = {}));
export default Strategy;
