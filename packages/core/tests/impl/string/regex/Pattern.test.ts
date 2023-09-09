import RegexConst from "../../../../src/model/constants/regex.constants";
import { $ } from "../../../../src/types/namespace/Utility.ns";
import Pattern from "../../../../validators/string/regex/Pattern";
import { standardTest } from "../../../common/TestFactory";
import { IMock } from "../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Nullable<string>;
const type = "String";
const identifier = "Pattern";
const successData: Type[] = ["abcdef", "aaa", null, undefined];
const errorData: Type[] = ["abc@", "123", "123a@"];

/*** Model ***/
class Model implements IMock<Type> {
  @Pattern({ message: "", regex: RegexConst.ALPHA })
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