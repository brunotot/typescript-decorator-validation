import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";
import ArrayContains from "./../../../validators/array/ArrayContains";

const SEARCH_ITEM = 7;
const NON_SEARCH_ITEM_STRING = "X";
const NON_SEARCH_ITEM_NUMBER = "5";
const NON_SEARCH_ITEM_UNDEFINED = undefined;
const NON_SEARCH_ITEM_NULL = null;

/*** Data ***/
type Type = any[];
const type = "Array<any>";
const identifier = "ArrayContains";
const successData: Type[] = [
  [SEARCH_ITEM],
  [NON_SEARCH_ITEM_STRING, NON_SEARCH_ITEM_UNDEFINED, SEARCH_ITEM],
];
const errorData: Type[] = [
  [],
  [NON_SEARCH_ITEM_NUMBER, NON_SEARCH_ITEM_UNDEFINED, NON_SEARCH_ITEM_NULL],
];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayContains({ value: SEARCH_ITEM })
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
