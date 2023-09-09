import { $ } from "../../../../../src/types/namespace/Utility.ns";
import Alphanumeric from "../../../../../validators/string/regex/impl/Alphanumeric";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Nullable<string>;
const type = "String";
const identifier = "Alphanumeric";
const successData: Type[] = ["123abcdef", null, undefined, ""];
const errorData: Type[] = ["123abc!=?"];

/*** Model ***/
class Model implements IMock<Type> {
  @Alphanumeric()
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