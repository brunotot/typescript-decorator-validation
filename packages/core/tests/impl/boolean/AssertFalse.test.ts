import { AssertFalse } from "@decorators";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = boolean;
const type = "any";
const identifier = "AssertFalse";
const successData: Type[] = [false];
const errorData: Type[] = [true];

/*** Model ***/
class Model implements IMock<Type> {
  @AssertFalse()
  value!: Type;
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
