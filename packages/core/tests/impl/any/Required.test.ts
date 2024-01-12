import { IMock } from "@common/ValidationHandlerMock";
import { Required } from "@src/decorators";
import * as Objects from "@src/utilities/impl/Objects";
import { standardTest } from "../../common/TestFactory";

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
