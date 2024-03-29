import { AssertTrue } from "@decorators";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = boolean;
const type = "any";
const identifier = "AssertTrue";
const successData: Type[] = [true];
const errorData: Type[] = [false];

/*** Model ***/
class Model implements IMock<Type> {
  @AssertTrue()
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
