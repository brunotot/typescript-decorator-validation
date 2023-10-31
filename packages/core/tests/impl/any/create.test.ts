import { create } from "../../../collection/any/create";
import { Integer } from "../../../collection/number/Integer";
import { Email } from "../../../collection/string/regex/impl/Email";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "Rule";
const successData: Type[] = [null, undefined, "", "test123", "123test"];
const errorData: Type[] = ["aaaaaaaaaaa", "test"];

/*** Model ***/
class Model implements IMock<Type> {
  @create((v) => ({
    key: "CustomRule",
    message: "Invalid",
    valid: !v || (v.length > 5 && v.toLowerCase().includes("test")),
  }))
  value: Type;

  @Email()
  @Integer()
  get test1() {
    return "";
  }

  @Email()
  @Integer()
  test2() {
    return "";
  }

  @Email()
  @Integer()
  test3!: string;
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
