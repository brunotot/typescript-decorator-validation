import { $ } from "../../../src/types/namespace/Utility.ns";
import TodayDate from "../../../validators/date/TodayDate";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

const NEG_INFINITY = new Date(1990, 0, 1);
const POS_INFINITY = new Date(2099, 11, 31);

/*** Data ***/
type Type = $.Nullable<Date>;
const type = "Date";
const identifier = "TodayDate";
const successData: Type[] = [new Date(), undefined, null];
const errorData: Type[] = [NEG_INFINITY, POS_INFINITY];

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
