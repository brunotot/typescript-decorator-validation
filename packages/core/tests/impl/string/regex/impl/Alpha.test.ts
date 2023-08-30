import { $ } from "../../../../../src/types/namespace/Utility.ns";
import Alpha from "../../../../../validators/string/regex/impl/Alpha";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Nullable<string>;
const type = "String";
const identifier = "Alpha";
const successData: Type[] = ["abcdef", null, undefined];
const errorData: Type[] = ["1", "123", "a1", "abc1"];

/*** Model ***/
class Model implements IMock<Type> {
  @Alpha()
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
