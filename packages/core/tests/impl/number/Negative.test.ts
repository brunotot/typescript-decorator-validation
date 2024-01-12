import { IMock } from "@common/ValidationHandlerMock";
import { Negative } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "Negative";
const successData: Type[] = [-1, -5, -10, -1500];
const errorData: Type[] = [1, 5, 10, 1500, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Negative()
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
