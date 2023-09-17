import $ from "../../../src/types";
import Falsy from "../../../validators/any/Falsy";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Objects.Optional<any>;
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
