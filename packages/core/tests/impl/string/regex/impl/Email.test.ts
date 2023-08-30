import { $ } from "../../../../../src/types/namespace/Utility.ns";
import Email from "../../../../../validators/string/regex/impl/Email";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Nullable<string>;
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
