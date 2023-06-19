import Rule from "../../decorators/validators/custom/Rule";
import Digits from "../../decorators/validators/number/Digits";
import ValueMax from "../../decorators/validators/number/ValueMax";
import ValueRange from "../../decorators/validators/number/ValueRange";
import Email from "../../decorators/validators/string/Email";
import Password from "../../decorators/validators/string/Password";
import Pattern from "../../decorators/validators/string/Pattern";
import URL from "../../decorators/validators/string/URL";
import Truthy from "../../decorators/validators/any/Truthy";
import Falsy from "../../decorators/validators/any/Falsy";
import Decimal from "../../decorators/validators/number/Decimal";
import Integer from "../../decorators/validators/number/Integer";
import Negative from "../../decorators/validators/number/Negative";
import NonNegative from "../../decorators/validators/number/NonNegative";
import NonPositive from "../../decorators/validators/number/NonPositive";
import Positive from "../../decorators/validators/number/Positive";
import Alpha from "../../decorators/validators/string/Alpha";
import CreditCardNumber from "../../decorators/validators/string/CreditCardNumber";
import Date from "../../decorators/validators/string/Date";
import IPAddress from "../../decorators/validators/string/IPAddress";
import JSON from "../../decorators/validators/string/JSON";
import Numeric from "../../decorators/validators/string/Numeric";
import XML from "../../decorators/validators/string/XML";
import Time from "../../decorators/validators/string/Time";
import Required from "../../decorators/validators/any/Required";
import ArrayContains from "../../decorators/validators/array/ArrayContains";
import ArrayEmpty from "../../decorators/validators/array/ArrayEmpty";
import ArrayEvery from "../../decorators/validators/array/ArrayEvery";
import ArrayUnique from "../../decorators/validators/array/ArrayUnique";
import ArraySizeExact from "../../decorators/validators/array/ArraySizeExact";
import foreach from "../../decorators/validators/array/foreach";
import ArraySizeMax from "../../decorators/validators/array/ArraySizeMax";
import ArraySizeMin from "../../decorators/validators/array/ArraySizeMin";
import ArraySizeRange from "../../decorators/validators/array/ArraySizeRange";
import ArrayNone from "../../decorators/validators/array/ArrayNone";
import ArrayOne from "../../decorators/validators/array/ArrayOne";
import ArraySome from "../../decorators/validators/array/ArraySome";
import ValueMin from "../../decorators/validators/number/ValueMin";

const any = {
  Truthy,
  Falsy,
  Required,
};

const array = {
  ...any,
  ArrayContains,
  ArrayEmpty,
  ArrayEvery,
  ArrayNone,
  ArrayOne,
  ArraySome,
  ArrayUnique,
  ArraySizeExact,
  ArraySizeMax,
  ArraySizeMin,
  ArraySizeRange,
  foreach,
};

const boolean = {
  Truthy,
  Falsy,
};

const number = {
  ...any,
  Digits,
  ValueMax,
  ValueMin,
  ValueRange,
  Decimal,
  Integer,
  Negative,
  NonNegative,
  NonPositive,
  Positive,
};

const string = {
  ...any,
  Email,
  Password,
  Pattern,
  URL,
  Alpha,
  CreditCardNumber,
  Date,
  IPAddress,
  JSON,
  Numeric,
  XML,
  Time,
};

const custom = {
  Rule,
};

const validators = {
  any,
  array,
  boolean,
  number,
  string,
  custom,
};

export { validators };
