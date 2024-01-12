import { IMock } from "@common/ValidationHandlerMock";
import { URL } from "@src/decorators";
import $ from "../../../../../index";
import { standardTest } from "../../../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "URL";
const successData: Type[] = ["www.google.hr", "https://www.facebook.com/?query=", null, undefined];
const errorData: Type[] = ["/google.com", "test@test"];

/*** Model ***/
class Model implements IMock<Type> {
  @URL()
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
