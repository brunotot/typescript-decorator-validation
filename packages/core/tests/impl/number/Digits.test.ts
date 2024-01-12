import { IMock } from "@common/ValidationHandlerMock";
import { Digits } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "Digits";
const successData: Type[] = [1.123, 12.1234, undefined, null];
const errorData: Type[] = [123.12345, 12.12345, 123.1234];

/*** Model ***/
class Model implements IMock<Type> {
  @Digits(2, 4)
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
