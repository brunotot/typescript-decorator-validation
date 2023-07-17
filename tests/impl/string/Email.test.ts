import { IMock } from "../../common/ValidationHandlerMock";
import { standardTest } from "../../common/TestFactory";
import { Nullable } from "../../../src/model/utility/type.utility";
import Email from "../../../validators/string/Email";

/*** Data ***/
type Type = Nullable<string>;
const type = "String";
const identifier = "Email";
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
