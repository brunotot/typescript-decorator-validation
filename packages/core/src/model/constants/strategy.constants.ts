import { Class } from "../../types/Class.type";
import { PropertyTypeGroup } from "../descriptor/field.descriptor";
import ObjectArrayStrat from "../validation-strategy/impl/object-array.strategy";
import ObjectStrat from "../validation-strategy/impl/object.strategy";
import PrimitiveArrayStrat from "../validation-strategy/impl/primitive-array.strategy";
import PrimitiveStrat from "../validation-strategy/impl/primitive.strategy";
import ValidationStrategy from "../validation-strategy/strategy";

// prettier-ignore
const StrategyRegister: Record<PropertyTypeGroup, Class<ValidationStrategy>> = {
  "PRIMITIVE_ARRAY": PrimitiveArrayStrat,
     "OBJECT_ARRAY": ObjectArrayStrat,
        "PRIMITIVE": PrimitiveStrat,
           "OBJECT": ObjectStrat,
};

export default StrategyRegister;
