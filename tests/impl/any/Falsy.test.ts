import { IMock } from "../../common/ValidationHandlerMock";
import { standardTest } from "../../common/TestFactory";
import Falsy from "../../../validators/any/Falsy";
import { $ } from "../../../src/types/namespace/Utility.ns";

/*** Data ***/
type Type = $.Nullable<any>;
const type = "any";
const identifier = "Falsy";
const successData: Type[] = [false, "", 0, undefined, null];
const errorData: Type[] = [true, "X", []];

/*** Model ***/
class Model implements IMock<Type> {
  @Falsy()
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
