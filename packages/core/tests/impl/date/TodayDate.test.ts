import { IMock } from "@common/ValidationHandlerMock";
import { TodayDate } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

const NEG_INFINITY = new Date(1990, 0, 1);
const POS_INFINITY = new Date(2099, 11, 31);

/*** Data ***/
type Type = $.Utilities.Objects.Optional<Date>;
const type = "Date";
const identifier = "TodayDate";
const successData: Type[] = [new Date()];
const errorData: Type[] = [NEG_INFINITY, POS_INFINITY, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @TodayDate()
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
