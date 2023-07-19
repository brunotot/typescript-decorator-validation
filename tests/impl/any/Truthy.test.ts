import { IMock } from "../../common/ValidationHandlerMock";
import { standardTest } from "../../common/TestFactory";
import Truthy from "../../../validators/any/Truthy";
import { $ } from "../../../src/types/namespace/Utility.ns";

/*** Data ***/
type Type = $.Nullable<any>;
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