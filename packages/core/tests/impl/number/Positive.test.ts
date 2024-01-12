import { IMock } from "@common/ValidationHandlerMock";
import { Positive } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "Positive";
const successData: Type[] = [1, 5, 10, 1500];
const errorData: Type[] = [-1, -5, -10, -1500, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Positive()
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
