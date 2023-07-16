import { IMock } from "../../common/ValidationHandlerMock";
import { Nullable } from "../../../src/model/utility/type.utility";
import { standardTest } from "../../common/TestFactory";
import Required from "../../../validators/impl/any/Required";

/*** Data ***/
type Type = Nullable<any>;
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
