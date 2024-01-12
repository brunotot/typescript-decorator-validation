import { IMock } from "@common/ValidationHandlerMock";
import { Decimal } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "Decimal";
const successData: Type[] = [1.25, 23.15, 677.999];
const errorData: Type[] = [1, 250, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Decimal()
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
