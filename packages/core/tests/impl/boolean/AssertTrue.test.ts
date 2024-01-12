import { IMock } from "@common/ValidationHandlerMock";
import { AssertTrue } from "@src/decorators";
import { standardTest } from "../../common/TestFactory";

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
