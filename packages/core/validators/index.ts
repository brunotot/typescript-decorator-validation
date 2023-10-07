import * as NsRequired from "./any/Required";
import * as NsAttribute from "./any/attribute";
import * as NsValidate from "./any/create";
import * as NsArrayContains from "./array/ArrayContains";
import * as NsArrayEmpty from "./array/ArrayEmpty";
import * as NsArrayEvery from "./array/ArrayEvery";
import * as NsArrayNone from "./array/ArrayNone";
import * as NsArrayOne from "./array/ArrayOne";
import * as NsArraySizeExact from "./array/ArraySizeExact";
import * as NsArraySizeMax from "./array/ArraySizeMax";
import * as NsArraySizeMin from "./array/ArraySizeMin";
import * as NsArraySizeRange from "./array/ArraySizeRange";
import * as NsArraySome from "./array/ArraySome";
import * as NsArrayUnique from "./array/ArrayUnique";
import * as NsForeach from "./array/foreach";
import * as NsAssertFalse from "./boolean/AssertFalse";
import * as NsAssertTrue from "./boolean/AssertTrue";
import * as NsValidDateRange from "./class/ValidDateRange";
import * as NsFutureDate from "./date/FutureDate";
import * as NsPastDate from "./date/PastDate";
import * as NsTodayDate from "./date/TodayDate";
import * as NsDecimal from "./number/Decimal";
import * as NsDigits from "./number/Digits";
import * as NsInteger from "./number/Integer";
import * as NsNegative from "./number/Negative";
import * as NsNonNegative from "./number/NonNegative";
import * as NsNonPositive from "./number/NonPositive";
import * as NsPositive from "./number/Positive";
import * as NsValueMax from "./number/ValueMax";
import * as NsValueMin from "./number/ValueMin";
import * as NsValueRange from "./number/ValueRange";
import * as NsExactLength from "./string/ExactLength";
import * as NsLength from "./string/Length";
import * as NsMaxLength from "./string/MaxLength";
import * as NsMinLength from "./string/MinLength";
import * as NsPassword from "./string/Password";
import * as NsPattern from "./string/regex/Pattern";
import * as NsAlpha from "./string/regex/impl/Alpha";
import * as NsAlphanumeric from "./string/regex/impl/Alphanumeric";
import * as NsEmail from "./string/regex/impl/Email";
import * as NsIPAddress from "./string/regex/impl/IPAddress";
import * as NsLowercase from "./string/regex/impl/Lowercase";
import * as NsNumeric from "./string/regex/impl/Numeric";
import * as NsURL from "./string/regex/impl/URL";
import * as NsUppercase from "./string/regex/impl/Uppercase";

namespace ValidatorAnyGroup {
  export import Required = NsRequired.Required;
  export import validate = NsValidate.create;
  export import attribute = NsAttribute.attribute;
}

namespace ValidatorArrayGroup {
  export import ArrayContains = NsArrayContains.ArrayContains;
  export import ArrayEmpty = NsArrayEmpty.ArrayEmpty;
  export import ArrayEvery = NsArrayEvery.ArrayEvery;
  export import ArrayNone = NsArrayNone.ArrayNone;
  export import ArrayOne = NsArrayOne.ArrayOne;
  export import ArraySome = NsArraySome.ArraySome;
  export import ArrayUnique = NsArrayUnique.ArrayUnique;
  export import ArraySizeExact = NsArraySizeExact.ArraySizeExact;
  export import ArraySizeMax = NsArraySizeMax.ArraySizeMax;
  export import ArraySizeMin = NsArraySizeMin.ArraySizeMin;
  export import ArraySizeRange = NsArraySizeRange.ArraySizeRange;
  export import foreach = NsForeach.foreach;
  export import Required = ValidatorAnyGroup.Required;
  export import validate = ValidatorAnyGroup.validate;
  export import attribute = ValidatorAnyGroup.attribute;
}

namespace ValidatorBooleanGroup {
  export import AssertTrue = NsAssertTrue.AssertTrue;
  export import AssertFalse = NsAssertFalse.AssertFalse;
  export import Required = ValidatorAnyGroup.Required;
  export import validate = ValidatorAnyGroup.validate;
  export import attribute = ValidatorAnyGroup.attribute;
}

namespace ValidatorNumberGroup {
  export import Digits = NsDigits.Digits;
  export import ValueMax = NsValueMax.ValueMax;
  export import ValueMin = NsValueMin.ValueMin;
  export import ValueRange = NsValueRange.ValueRange;
  export import Decimal = NsDecimal.Decimal;
  export import Integer = NsInteger.Integer;
  export import Negative = NsNegative.Negative;
  export import NonNegative = NsNonNegative.NonNegative;
  export import NonPositive = NsNonPositive.NonPositive;
  export import Positive = NsPositive.Positive;
  export import Required = ValidatorAnyGroup.Required;
  export import validate = ValidatorAnyGroup.validate;
  export import attribute = ValidatorAnyGroup.attribute;
}

namespace ValidatorDateGroup {
  export import FutureDate = NsFutureDate.FutureDate;
  export import PastDate = NsPastDate.PastDate;
  export import TodayDate = NsTodayDate.TodayDate;
  export import Required = ValidatorAnyGroup.Required;
  export import validate = ValidatorAnyGroup.validate;
  export import attribute = ValidatorAnyGroup.attribute;
}

namespace ValidatorStringGroup {
  export import Email = NsEmail.Email;
  export import Password = NsPassword.Password;
  export import Pattern = NsPattern.Pattern;
  export import URL = NsURL.URL;
  export import Alpha = NsAlpha.Alpha;
  export import IPAddress = NsIPAddress.IPAddress;
  export import Numeric = NsNumeric.Numeric;
  export import ExactLength = NsExactLength.ExactLength;
  export import Length = NsLength.Length;
  export import MaxLength = NsMaxLength.MaxLength;
  export import MinLength = NsMinLength.MinLength;
  export import Uppercase = NsUppercase.Uppercase;
  export import Lowercase = NsLowercase.Lowercase;
  export import Alphanumeric = NsAlphanumeric.Alphanumeric;
  export import Required = ValidatorAnyGroup.Required;
  export import validate = ValidatorAnyGroup.validate;
  export import attribute = ValidatorAnyGroup.attribute;
}

namespace ValidatorClassGroup {
  export import ValidDateRange = NsValidDateRange.ValidDateRange;
}

namespace validators {
  export import any = ValidatorAnyGroup;
  export import date = ValidatorDateGroup;
  export import string = ValidatorStringGroup;
  export import number = ValidatorNumberGroup;
  export import boolean = ValidatorBooleanGroup;
  export import array = ValidatorArrayGroup;
  export import clazz = ValidatorClassGroup;
}

export default validators;
