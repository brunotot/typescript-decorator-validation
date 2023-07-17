import Digits from "../../../validators/number/Digits";
import ValueMax from "../../../validators/number/ValueMax";
import ValueRange from "../../../validators/number/ValueRange";
import Email from "../../../validators/string/Email";
import Password from "../../../validators/string/Password";
import Pattern from "../../../validators/string/Pattern";
import URL from "../../../validators/string/URL";
import Truthy from "../../../validators/any/Truthy";
import Falsy from "../../../validators/any/Falsy";
import Decimal from "../../../validators/number/Decimal";
import Integer from "../../../validators/number/Integer";
import Negative from "../../../validators/number/Negative";
import NonNegative from "../../../validators/number/NonNegative";
import NonPositive from "../../../validators/number/NonPositive";
import Positive from "../../../validators/number/Positive";
import Alpha from "../../../validators/string/Alpha";
import CreditCardNumber from "../../../validators/string/CreditCardNumber";
import IPAddress from "../../../validators/string/IPAddress";
import Numeric from "../../../validators/string/Numeric";
import Required from "../../../validators/any/Required";
import ArrayContains from "../../../validators/array/ArrayContains";
import ArrayEmpty from "../../../validators/array/ArrayEmpty";
import ArrayEvery from "../../../validators/array/ArrayEvery";
import ArrayUnique from "../../../validators/array/ArrayUnique";
import ArraySizeExact from "../../../validators/array/ArraySizeExact";
import foreach from "../../../validators/array/foreach";
import ArraySizeMax from "../../../validators/array/ArraySizeMax";
import ArraySizeMin from "../../../validators/array/ArraySizeMin";
import ArraySizeRange from "../../../validators/array/ArraySizeRange";
import ArrayNone from "../../../validators/array/ArrayNone";
import ArrayOne from "../../../validators/array/ArrayOne";
import ArraySome from "../../../validators/array/ArraySome";
import ValueMin from "../../../validators/number/ValueMin";
import ExactLength from "../../../validators/string/ExactLength";
import Length from "../../../validators/string/Length";
import MaxLength from "../../../validators/string/MaxLength";
import MinLength from "../../../validators/string/MinLength";
import FutureDate from "../../../validators/date/FutureDate";
import PastDate from "../../../validators/date/PastDate";
import TodayDate from "../../../validators/date/TodayDate";
import Rule from "../../../validators/any/Rule";

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

const date = {
  ...any,
  FutureDate,
  PastDate,
  TodayDate,
};

const string = {
  ...any,
  Email,
  Password,
  Pattern,
  URL,
  Alpha,
  CreditCardNumber,
  IPAddress,
  Numeric,
  ExactLength,
  Length,
  MaxLength,
  MinLength,
};

const validators = {
  any,
  array,
  boolean,
  number,
  string,
  date,
  Rule,
};

export default validators;
