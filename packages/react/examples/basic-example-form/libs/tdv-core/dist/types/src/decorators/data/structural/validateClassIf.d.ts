import { type ClassDecorator } from "../../factory/forClass/createClassDecorator";
import { type DecoratorValidateIf } from "../../helper";
import { type Types } from "../../../utilities";
export declare function validateClassIf<Class extends Types.Class>(validateIf: DecoratorValidateIf<Types.UnwrapClass<Class>>): ClassDecorator<Class>;
//# sourceMappingURL=validateClassIf.d.ts.map