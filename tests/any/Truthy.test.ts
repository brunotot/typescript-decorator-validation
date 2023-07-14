import { IMock } from "../common/ValidationHandlerMock";
import { Nullable } from "../../src/service/ValidatorService";
import { standardTest } from "../common/TestFactory";
import Truthy from "../../src/decorators/validators/any/Truthy";

/*** Data ***/
type Type = Nullable<any>;
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
