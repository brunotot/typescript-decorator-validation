import { ArrayContains } from "@decorators";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

const SEARCH_ITEM = 7;
const NON_SEARCH_ITEM_STRING = "X";
const NON_SEARCH_ITEM_NUMBER = "5";
const NON_SEARCH_ITEM_UNDEFINED = undefined;
const NON_SEARCH_ITEM_NULL = null;

/*** Data ***/
type Type = any[];
const type = "Array<any>";
const identifier = "ArrayContains";
const successData: Type[] = [[SEARCH_ITEM], [NON_SEARCH_ITEM_STRING, NON_SEARCH_ITEM_UNDEFINED, SEARCH_ITEM]];
const errorData: Type[] = [[], [NON_SEARCH_ITEM_NUMBER, NON_SEARCH_ITEM_UNDEFINED, NON_SEARCH_ITEM_NULL]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayContains(SEARCH_ITEM, { message: "Error" })
  value: Type = [];
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
