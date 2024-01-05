import $ from "../../../../../index";
import { Numeric } from "../../../../../src/decorators";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "Numeric";
const successData: Type[] = ["123456", "", null, undefined];
const errorData: Type[] = ["test123", "test", "123test"];

/*** Model ***/
class Model implements IMock<Type> {
  @Numeric()
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
