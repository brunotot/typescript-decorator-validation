import StrategyFactoryNamespace from "./models/StrategyFactory";
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

namespace Strategy {
  export import Types = StrategyTypesNamespace;
  export import Factory = StrategyFactoryNamespace;
  export import Mapper = StrategyMapperNamespace;

  export namespace Service {
    export import AbstractStrategy = AbstractStrategyNamespace.AbstractValidationStrategyService;
    export import FunctionStrategy = FunctionStrategyNamespace.FunctionStrat;
    export import ObjectArrayGetterStrategy = ObjectArrayGetterStrategyNamespace.ObjectArrayGetterStrat;
    export import ObjectArrayStrategy = ObjectArrayStrategyNamespace.ObjectArrayStrat;
    export import ObjectGetterStrategy = ObjectGetterStrategyNamespace.ObjectGetterStrat;
    export import ObjectStrategy = ObjectStrategyNamespace.ObjectStrat;
    export import PrimitiveArrayGetterStrategy = PrimitiveArrayGetterStrategyNamespace.PrimitiveArrayGetterStrat;
    export import PrimitiveArrayStrategy = PrimitiveArrayStrategyNamespace.PrimitiveArrayStrat;
    export import PrimitiveGetterStrategy = PrimitiveGetterStrategyNamespace.PrimitiveGetterStrat;
    export import PrimitiveStrategy = PrimitiveStrategyNamespace.PrimitiveStrat;
  }
}

export default Strategy;
