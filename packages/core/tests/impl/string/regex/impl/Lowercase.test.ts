import { IMock } from "@common/ValidationHandlerMock";
import { Lowercase } from "@src/decorators";
import $ from "../../../../../index";
import { standardTest } from "../../../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
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
