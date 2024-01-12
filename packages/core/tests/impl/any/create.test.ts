import { IMock } from "@common/ValidationHandlerMock";
import { createFieldValidator } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "Rule";
const successData: Type[] = [null, undefined, "", "test123", "123test"];
const errorData: Type[] = ["aaaaaaaaaaa", "test"];

/*** Model ***/
class Model implements IMock<Type> {
  @createFieldValidator(v => ({
    key: "CustomRule",
    message: "Invalid",
    valid: !v || (v.length > 5 && v.toLowerCase().includes("test")),
  }))
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
