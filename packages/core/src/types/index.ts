import ConditionNamespace from "./namespace/condition.namespace";
import EntityProcessorNamespace from "./namespace/entity-processor.namespace";
import FactoryNamespace from "./namespace/factory.namespace";
import HelperNamespace from "./namespace/helper.namespace";
import ObjectsNamespace from "./namespace/objects.namespace";
import ParamsNamespace from "./namespace/params.namespace";
import StrategyNamespace from "./namespace/strategy.namespace";
import TypesNamespace from "./namespace/types.namespace";
import ValidationNamespace from "./namespace/validation.namespace";

// prettier-ignore
namespace Core {
  export import Factory = FactoryNamespace;
  export import Condition = ConditionNamespace;
  export import Strategy = StrategyNamespace;
  export import Objects = ObjectsNamespace;
  export import Helper = HelperNamespace;
  export import Types = TypesNamespace;
  export import Params = ParamsNamespace;
  export import Validation = ValidationNamespace;
  export import EntityProcessor = EntityProcessorNamespace
}

export default Core;
