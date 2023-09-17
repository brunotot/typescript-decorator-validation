import $ from "../../../../../src/types";
import Lowercase from "../../../../../validators/string/regex/impl/Lowercase";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Objects.Optional<string>;
const type = "String";
const identifier = "Lowercase";
const successData: Type[] = ["test", "", null, undefined];
const errorData: Type[] = ["Test123", "tesT123", "TEST123"];

/*** Model ***/
class Model implements IMock<Type> {
  @Lowercase()
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
