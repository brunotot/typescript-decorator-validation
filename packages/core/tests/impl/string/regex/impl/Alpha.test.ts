import { IMock } from "@common/ValidationHandlerMock";
import { Alpha } from "@src/decorators";
import $ from "../../../../../index";
import { standardTest } from "../../../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
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
