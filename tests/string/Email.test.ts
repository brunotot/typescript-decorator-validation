import { IMock } from "../common/ValidationHandlerMock";
import { Nullable } from "../../src/service/ValidatorService";
import { standardTest } from "../common/TestFactory";
import Email from "../../src/decorators/validators/string/Email";

/*** Data ***/
type Type = Nullable<string>;
const type = "Email";
const identifier = "Required";
const successData: Type[] = ["mail@mail.com", null, undefined];
const errorData: Type[] = ["invalid@~", "vvv@vvv.", "invalid"];

/*** Model ***/
class Model implements IMock<Type> {
  @Email()
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
