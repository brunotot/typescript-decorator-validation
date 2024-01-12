import { IMock } from "@common/ValidationHandlerMock";
import { Pattern } from "@src/decorators";
import RegexConst from "@src/decorators/data/validators/string/regex/shared/regex.constants";
import $ from "../../../../index";
import { standardTest } from "../../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "Pattern";
const successData: Type[] = ["abcdef", "aaa", null, undefined];
const errorData: Type[] = ["abc@", "123", "123a@"];

/*** Model ***/
class Model implements IMock<Type> {
  @Pattern(RegexConst.ALPHA, { message: "Error" })
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
