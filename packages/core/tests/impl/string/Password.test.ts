import $ from "../../../index";
import { Password } from "../../../validators/string/Password";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "Password";
const successData: Type[] = ["Test12345!"];
const errorData: Type[] = [
  "",
  null,
  undefined,
  "12345",
  "12345678",
  "12345678!",
  "12345678!",
  "12345678!A",
  "123aA!",
];

/*** Model ***/
class Model implements IMock<Type> {
  @Password({
    length: 8,
    lowercase: true,
    numbers: true,
    specials: true,
    uppercase: true,
  })
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
