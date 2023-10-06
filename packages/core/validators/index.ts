import Required from "./any/Required";
import attribute from "./any/attribute";
import validate from "./any/validate";
import ArrayContains from "./array/ArrayContains";
import ArrayEmpty from "./array/ArrayEmpty";
import ArrayEvery from "./array/ArrayEvery";
import ArrayNone from "./array/ArrayNone";
import ArrayOne from "./array/ArrayOne";
import ArraySizeExact from "./array/ArraySizeExact";
import ArraySizeMax from "./array/ArraySizeMax";
import ArraySizeMin from "./array/ArraySizeMin";
import ArraySizeRange from "./array/ArraySizeRange";
import ArraySome from "./array/ArraySome";
import ArrayUnique from "./array/ArrayUnique";
import foreach from "./array/foreach";
import AssertFalse from "./boolean/AssertFalse";
import AssertTrue from "./boolean/AssertTrue";
import ValidDateRange from "./class/ValidDateRange";
import FutureDate from "./date/FutureDate";
import PastDate from "./date/PastDate";
import TodayDate from "./date/TodayDate";
import Decimal from "./number/Decimal";
import Digits from "./number/Digits";
import Integer from "./number/Integer";
import Negative from "./number/Negative";
import NonNegative from "./number/NonNegative";
import NonPositive from "./number/NonPositive";
import Positive from "./number/Positive";
import ValueMax from "./number/ValueMax";
import ValueMin from "./number/ValueMin";
import ValueRange from "./number/ValueRange";
import ExactLength from "./string/ExactLength";
import Length from "./string/Length";
import MaxLength from "./string/MaxLength";
import MinLength from "./string/MinLength";
import Password from "./string/Password";
import Pattern from "./string/regex/Pattern";
import Alpha from "./string/regex/impl/Alpha";
import Alphanumeric from "./string/regex/impl/Alphanumeric";
import Email from "./string/regex/impl/Email";
import IPAddress from "./string/regex/impl/IPAddress";
import Lowercase from "./string/regex/impl/Lowercase";
import Numeric from "./string/regex/impl/Numeric";
import URL from "./string/regex/impl/URL";
import Uppercase from "./string/regex/impl/Uppercase";

const any = {
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
};

const boolean = {
  ...any,
  AssertTrue,
  AssertFalse,
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

const Date = {
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
  IPAddress,
  Numeric,
  ExactLength,
  Length,
  MaxLength,
  MinLength,
  Uppercase,
  Lowercase,
  Alphanumeric,
};

const clazz = {
  ValidDateRange,
};

/**
 * A collection of predefined decorated validators grouped and sorted by variable types
 */
const validators = {
  any,
  array,
  boolean,
  number,
  string,
  Date,
  validate,
  attribute,
  foreach,
  class: clazz,
};

export default validators;
