import Objects from "../../../src/utilities/impl/Objects";
import Required from "../../../validators/any/Required";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<any>;
const type = "any";
const identifier = "Required";
const successData: Type[] = ["lorem", true, 0, -1, 1, new Date(), ["lorem"]];
const errorData: Type[] = [false, null, undefined, "", []];

/*** Model ***/
class Model implements IMock<Type> {
  @Required()
  value: Type;
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
