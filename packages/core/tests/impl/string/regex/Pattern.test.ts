import { Pattern, RegexConst } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../../common/TestFactory";
import { IMock } from "../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<string>;
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
