import NotNull from "../decorators/validators/any/NotNull";
import Size from "../decorators/validators/array/Size";
import AssertFalse from "../decorators/validators/boolean/AssertFalse";
import AssertTrue from "../decorators/validators/boolean/AssertTrue";
import NotEmpty from "../decorators/validators/compound/NotEmpty";
import Rule from "../decorators/validators/custom/Rule";
import Digits from "../decorators/validators/number/Digits";
import Max from "../decorators/validators/number/Max";
import Min from "../decorators/validators/number/Min";
import Range from "../decorators/validators/number/Range";
import Email from "../decorators/validators/string/Email";
import ExactLength from "../decorators/validators/string/ExactLength";
import MaxLength from "../decorators/validators/string/MaxLength";
import MinLength from "../decorators/validators/string/MinLength";
import Password from "../decorators/validators/string/Password";
import Pattern from "../decorators/validators/string/Pattern";
import RangeLength from "../decorators/validators/string/RangeLength";
import URL from "../decorators/validators/string/URL";
import Truthy from "../decorators/validators/any/Truthy";
import Falsy from "../decorators/validators/any/Falsy";
import Decimal from "../decorators/validators/number/Decimal";
import Integer from "../decorators/validators/number/Integer";
import Negative from "../decorators/validators/number/Negative";
import NonNegative from "../decorators/validators/number/NonNegative";
import NonPositive from "../decorators/validators/number/NonPositive";
import Positive from "../decorators/validators/number/Positive";
import Alpha from "../decorators/validators/string/Alpha";
import CreditCardNumber from "../decorators/validators/string/CreditCardNumber";
import Date from "../decorators/validators/string/Date";
import IPAddress from "../decorators/validators/string/IPAddress";
import JSON from "../decorators/validators/string/JSON";
import Numeric from "../decorators/validators/string/Numeric";
import Palindrome from "../decorators/validators/string/Palindrome";
import XML from "../decorators/validators/string/XML";
import Time from "../decorators/validators/string/Time";

const any = {
	NotNull,
	Truthy,
	Falsy,
};

const compound = {
	...any,
	NotEmpty,
};

const array = {
	...any,
	Size,
	NotEmpty: compound.NotEmpty,
};

const boolean = {
	...any,
	AssertFalse,
	AssertTrue,
};

const number = {
	...any,
	Digits,
	Max,
	Min,
	Range,
	Decimal,
	Integer,
	Negative,
	NonNegative,
	NonPositive,
	Positive,
};

const string = {
	...any,
	NotEmpty: compound.NotEmpty,
	Email,
	ExactLength,
	MaxLength,
	MinLength,
	Password,
	Pattern,
	RangeLength,
	URL,
	Alpha,
	CreditCardNumber,
	Date,
	IPAddress,
	JSON,
	Numeric,
	Palindrome,
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
	compound,
	number,
	string,
	custom,
};

export { validators };
