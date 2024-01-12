import { IMock } from "@common/ValidationHandlerMock";
import { AssertFalse } from "@src/decorators";
import { standardTest } from "../../common/TestFactory";

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
