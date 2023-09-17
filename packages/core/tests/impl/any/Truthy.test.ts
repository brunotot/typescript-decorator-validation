import $ from "../../../src/types";
import Truthy from "../../../validators/any/Truthy";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Objects.Optional<any>;
const type = "any";
const identifier = "Truthy";
const successData: Type[] = [true, "X", []];
const errorData: Type[] = [false, "", 0, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Truthy()
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
