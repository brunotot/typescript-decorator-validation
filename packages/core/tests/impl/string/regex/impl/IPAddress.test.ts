import $ from "../../../../../index";
import { IPAddress } from "../../../../../validators/string/regex/impl/IPAddress";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "IPAddress";
const successData: Type[] = ["192.168.1.0", "", null, undefined];
const errorData: Type[] = [
  "test123",
  "192.168",
  "@@@",
  "gmail.com",
  "www.google.hr",
];

/*** Model ***/
class Model implements IMock<Type> {
  @IPAddress()
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
