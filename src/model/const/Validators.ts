import Rule from "../../../validators/impl/any/Required";
import Digits from "../../../validators/impl/number/Digits";
import ValueMax from "../../../validators/impl/number/ValueMax";
import ValueRange from "../../../validators/impl/number/ValueRange";
import Email from "../../../validators/impl/string/Email";
import Password from "../../../validators/impl/string/Password";
import Pattern from "../../../validators/impl/string/Pattern";
import URL from "../../../validators/impl/string/URL";
import Truthy from "../../../validators/impl/any/Truthy";
import Falsy from "../../../validators/impl/any/Falsy";
import Decimal from "../../../validators/impl/number/Decimal";
import Integer from "../../../validators/impl/number/Integer";
import Negative from "../../../validators/impl/number/Negative";
import NonNegative from "../../../validators/impl/number/NonNegative";
import NonPositive from "../../../validators/impl/number/NonPositive";
import Positive from "../../../validators/impl/number/Positive";
import Alpha from "../../../validators/impl/string/Alpha";
import CreditCardNumber from "../../../validators/impl/string/CreditCardNumber";
import IPAddress from "../../../validators/impl/string/IPAddress";
import Numeric from "../../../validators/impl/string/Numeric";
import Required from "../../../validators/impl/any/Required";
import ArrayContains from "../../../validators/impl/array/ArrayContains";
import ArrayEmpty from "../../../validators/impl/array/ArrayEmpty";
import ArrayEvery from "../../../validators/impl/array/ArrayEvery";
import ArrayUnique from "../../../validators/impl/array/ArrayUnique";
import ArraySizeExact from "../../../validators/impl/array/ArraySizeExact";
import foreach from "../../../validators/impl/array/foreach";
import ArraySizeMax from "../../../validators/impl/array/ArraySizeMax";
import ArraySizeMin from "../../../validators/impl/array/ArraySizeMin";
import ArraySizeRange from "../../../validators/impl/array/ArraySizeRange";
import ArrayNone from "../../../validators/impl/array/ArrayNone";
import ArrayOne from "../../../validators/impl/array/ArrayOne";
import ArraySome from "../../../validators/impl/array/ArraySome";
import ValueMin from "../../../validators/impl/number/ValueMin";
import ExactLength from "../../../validators/impl/string/ExactLength";
import Length from "../../../validators/impl/string/Length";
import MaxLength from "../../../validators/impl/string/MaxLength";
import MinLength from "../../../validators/impl/string/MinLength";
import FutureDate from "../../../validators/impl/date/FutureDate";
import PastDate from "../../../validators/impl/date/PastDate";
import TodayDate from "../../../validators/impl/date/TodayDate";

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
  date,
};

export { validators };
