import * as NsRequired from "./any/Required";
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
/**
 * A collection of validators and decorators for `any` fields.
 */
var ValidatorAnyGroup;
(function (ValidatorAnyGroup) {
    ValidatorAnyGroup.Required = NsRequired.Required;
})(ValidatorAnyGroup || (ValidatorAnyGroup = {}));
/**
 * A collection of validators and decorators for `array` fields.
 */
var ValidatorArrayGroup;
(function (ValidatorArrayGroup) {
    ValidatorArrayGroup.ArrayContains = NsArrayContains.ArrayContains;
    ValidatorArrayGroup.ArrayEmpty = NsArrayEmpty.ArrayEmpty;
    ValidatorArrayGroup.ArrayEvery = NsArrayEvery.ArrayEvery;
    ValidatorArrayGroup.ArrayNone = NsArrayNone.ArrayNone;
    ValidatorArrayGroup.ArrayOne = NsArrayOne.ArrayOne;
    ValidatorArrayGroup.ArraySome = NsArraySome.ArraySome;
    ValidatorArrayGroup.ArrayUnique = NsArrayUnique.ArrayUnique;
    ValidatorArrayGroup.ArraySizeExact = NsArraySizeExact.ArraySizeExact;
    ValidatorArrayGroup.ArraySizeMax = NsArraySizeMax.ArraySizeMax;
    ValidatorArrayGroup.ArraySizeMin = NsArraySizeMin.ArraySizeMin;
    ValidatorArrayGroup.ArraySizeRange = NsArraySizeRange.ArraySizeRange;
    ValidatorArrayGroup.foreach = NsForeach.foreach;
    ValidatorArrayGroup.Required = ValidatorAnyGroup.Required;
})(ValidatorArrayGroup || (ValidatorArrayGroup = {}));
/**
 * A collection of validators and decorators for `boolean` fields.
 */
var ValidatorBooleanGroup;
(function (ValidatorBooleanGroup) {
    ValidatorBooleanGroup.AssertTrue = NsAssertTrue.AssertTrue;
    ValidatorBooleanGroup.AssertFalse = NsAssertFalse.AssertFalse;
    ValidatorBooleanGroup.Required = ValidatorAnyGroup.Required;
})(ValidatorBooleanGroup || (ValidatorBooleanGroup = {}));
/**
 * A collection of validators and decorators for `number` fields.
 */
var ValidatorNumberGroup;
(function (ValidatorNumberGroup) {
    ValidatorNumberGroup.Digits = NsDigits.Digits;
    ValidatorNumberGroup.ValueMax = NsValueMax.ValueMax;
    ValidatorNumberGroup.ValueMin = NsValueMin.ValueMin;
    ValidatorNumberGroup.ValueRange = NsValueRange.ValueRange;
    ValidatorNumberGroup.Decimal = NsDecimal.Decimal;
    ValidatorNumberGroup.Integer = NsInteger.Integer;
    ValidatorNumberGroup.Negative = NsNegative.Negative;
    ValidatorNumberGroup.NonNegative = NsNonNegative.NonNegative;
    ValidatorNumberGroup.NonPositive = NsNonPositive.NonPositive;
    ValidatorNumberGroup.Positive = NsPositive.Positive;
    ValidatorNumberGroup.Required = ValidatorAnyGroup.Required;
})(ValidatorNumberGroup || (ValidatorNumberGroup = {}));
/**
 * A collection of validators and decorators for `Date` fields.
 */
var ValidatorDateGroup;
(function (ValidatorDateGroup) {
    ValidatorDateGroup.FutureDate = NsFutureDate.FutureDate;
    ValidatorDateGroup.PastDate = NsPastDate.PastDate;
    ValidatorDateGroup.TodayDate = NsTodayDate.TodayDate;
    ValidatorDateGroup.Required = ValidatorAnyGroup.Required;
})(ValidatorDateGroup || (ValidatorDateGroup = {}));
/**
 * A collection of validators and decorators for `string` fields.
 */
var ValidatorStringGroup;
(function (ValidatorStringGroup) {
    ValidatorStringGroup.Email = NsEmail.Email;
    ValidatorStringGroup.Password = NsPassword.Password;
    ValidatorStringGroup.Pattern = NsPattern.Pattern;
    ValidatorStringGroup.URL = NsURL.URL;
    ValidatorStringGroup.Alpha = NsAlpha.Alpha;
    ValidatorStringGroup.IPAddress = NsIPAddress.IPAddress;
    ValidatorStringGroup.Numeric = NsNumeric.Numeric;
    ValidatorStringGroup.ExactLength = NsExactLength.ExactLength;
    ValidatorStringGroup.MaxLength = NsMaxLength.MaxLength;
    ValidatorStringGroup.MinLength = NsMinLength.MinLength;
    ValidatorStringGroup.Uppercase = NsUppercase.Uppercase;
    ValidatorStringGroup.Lowercase = NsLowercase.Lowercase;
    ValidatorStringGroup.Alphanumeric = NsAlphanumeric.Alphanumeric;
    ValidatorStringGroup.Required = ValidatorAnyGroup.Required;
})(ValidatorStringGroup || (ValidatorStringGroup = {}));
/**
 * A collection of validators and decorators for `classes`.
 */
var ValidatorClassGroup;
(function (ValidatorClassGroup) {
    ValidatorClassGroup.ValidDateRange = NsValidDateRange.ValidDateRange;
})(ValidatorClassGroup || (ValidatorClassGroup = {}));
/**
 * A collection of validators and decorator functions grouped by field type.
 */
var ValidatorCollection;
(function (ValidatorCollection) {
    ValidatorCollection.any = ValidatorAnyGroup;
    ValidatorCollection.date = ValidatorDateGroup;
    ValidatorCollection.string = ValidatorStringGroup;
    ValidatorCollection.number = ValidatorNumberGroup;
    ValidatorCollection.boolean = ValidatorBooleanGroup;
    ValidatorCollection.array = ValidatorArrayGroup;
    ValidatorCollection.clazz = ValidatorClassGroup;
})(ValidatorCollection || (ValidatorCollection = {}));
export default ValidatorCollection;
