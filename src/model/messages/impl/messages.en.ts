import { MessageFormatType } from "../ErrorMessage";

const MessageFormatEn: MessageFormatType = {
  ArrayEmpty: `Array must be empty.`,
  ArrayContains: `Array must contain the following element: {0} `,
  Decimal: `Value must be a decimal number but is {0}`,
  ArraySizeMin: `Array must contain minimally {0} elements but contains {1}.`,
  ArraySizeRange: `Array must contain between {0} and {1} elements but contains {2}.`,
  ArraySizeMax: `Array must contain maximally {0} elements but contains {1}.`,
  ArraySizeExact: `Array must contain exactly {0} elements but contains {1}.`,
  MinLength: `Field must contain at least {0} characters`,
  MaxLength: `Field cannot contain more than {0} characters`,
  NotEmpty: "Field is mandatory",
  Pattern: `Value doesn't conform regular expression "{0}"`,
  Email: "Value is not a valid email",
  PasswordUppercaseViolation: `Password must contain at least 1 uppercase letter`,
  PasswordLowercaseViolation: `Password must contain at least 1 lowercase letter`,
  PasswordNumbersViolation: `Password must contain at least 1 number`,
  PasswordSpecialsViolation: `Password must contain at least 1 special character`,
  PasswordLengthViolation: `Password must be at least {0} characters long`,
  URL: `The URL you entered is not a valid one`,
  ValueMin: `Minimum allowed value is {0} but is {1}`,
  ValueMax: `Maximum allowed value is {0} but is {1}`,
  ValueRange: `Value must be greater than or equal to {0} and less than or equal to {1} but is {2}`,
  Digits: `Integer part of the number can have a maximum of {0} digits and fraction part a maximum of {1}`,
  ExactLength: `Value must contain exactly {0} characters`,
  RangeLength: `Value must contain between {0} and {1} characters`,
  XML: `Given string is not a valid XML`,
  JSON: `Given string is not a valid JSON`,
  IPAddress: `Given string is not a valid IP address`,
  CreditCardNumber: `Given string is not a valid credit card number`,
  Date: `Given string does not comply the desired date format ({0})`,
  Time: `Given string does not comply {0} locale for {1} time`,
  Numeric: `Given string must only contain numbers`,
  Alpha: `Given string must only contain alphabetical characters`,
  Integer: `Value must be an integer but is {0}`,
  Positive: `Value must be a positive number but is {0}`,
  Negative: `Value must be a negative number but is {0}`,
  NonNegative: `Value must be more than or equal to 0 but is {0}`,
  NonPositive: `Value must be less than or equal to 0 but is {0}`,
  Truthy: `Value must be truthy`,
  Falsy: `Value must be falsy`,
  ArrayUnique: `Array elements must be unique`,
  InvalidDigitsParams: `maxInteger [{0}] and maxFraction [{1}] must be whole numbers`,
  InvalidUsageOfDecoratorValid: `\n\n@valid expects a class argument but couldn't infer it using reflection since the argument isn't present.\nAre you using it inside @foreach and forgot to pass the array instance type as argument?\n`,
  IncompatibleTypes:
    `\n\nField "{0}" from class "{1}" does not comply used validator decorator.` +
    `\nThis decorator expects any of [{2}] types but has received [{3}].\n`,
};

export default MessageFormatEn;
