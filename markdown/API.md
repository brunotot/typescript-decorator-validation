<h2>Table of Contents</h2>

- [Classes](#classes)
- [Namespaces](#namespaces)
- [Validators](#validators)
  - [any](#any)
  - [Date](#date)
  - [array](#array)
  - [number](#number)
  - [string](#string)

---

### Classes

- [`ValidationEngine`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/validation/index.ts#L22) - Main entry point for validating objects at runtime
- [`ValidationConfigurer`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/reflection/service/impl/reflection.service.validation.ts#L16) - Handles the process of attaching validators to the actual class' metadata

### Namespaces

- [`Decorator`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/decorators/index.ts#L10) - Contains logic for manipulating decorators
- [`Localization`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/localization/index.ts#L6) - Contains logic for manipulating the app's localization
- [`Reflection`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/reflection/index.ts#L9) - Contains logic for manipulating class' metadata

### Validators

##### any

- [`Required`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/any/Required.ts) - Checks if value is not empty
- [`Falsy`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/any/Falsy.ts) - Checks if value is falsy
- [`Truthy`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/any/Truthy.ts) - Checks if value is truthy
- [`validate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/any/Rule.ts) - Validates the field based on custom-provided validation logic
- [`attribute`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/any/valid.ts) - Sets the runtime representation of decorated field's type

##### Date

- [`FutureDate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/date/FutureDate.ts) - Checks if a date is in the future
- [`PastDate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/date/PastDate.ts) - Checks if a date is in the past
- [`TodayDate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/date/TodayDate.ts) - Checks if a date is today, comparing year, month and day

##### array

- [`ArrayContains`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArrayContains.ts) - Validates that array at runtime contains the supplied value
- [`ArrayEmpty`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArrayEmpty.ts) - Validates that array at runtime must be empty
- [`ArrayEvery`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArrayEvery.ts) - Validates that every element in the array meets the specified condition
- [`ArrayNone`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArrayNone.ts) - Validates that no elements in the array meet the specified condition
- [`ArrayOne`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArrayOne.ts) - Validates that exactly one element in the array meets the specified condition
- [`ArraySizeExact`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArraySizeExact.ts) - Validates that the array has an exact size
- [`ArraySizeMax`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArraySizeMax.ts) - Validates that the array size does not exceed a maximum value
- [`ArraySizeMin`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArraySizeMin.ts) - Validates that the array size is not below a minimum value
- [`ArraySizeRange`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArraySizeRange.ts) - Validates that the array size is within a specific range
- [`ArraySome`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArraySome.ts) - Validates that some elements in the array meet the specified condition
- [`ArrayUnique`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/ArrayUnique.ts) - Validates that all elements in the array are unique
- [`foreach`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/array/foreach.ts) - Applies a specific validator to each element in the array

##### number

- [`Decimal`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/Decimal.ts) - Validates that a number is a decimal number
- [`Digits`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/Digits.ts) - Validates that a number has a specific number of digits
- [`Integer`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/Integer.ts) - Validates that a number is an integer
- [`Negative`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/Negative.ts) - Validates that a number is negative
- [`NonNegative`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/NonNegative.ts) - Validates that a number is non-negative
- [`NonPositive`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/NonPositive.ts) - Validates that a number is non-positive
- [`Positive`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/Positive.ts) - Validates that a number is positive
- [`ValueMax`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/ValueMax.ts) - Validates that a number does not exceed a maximum value
- [`ValueMin`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/ValueMin.ts) - Validates that a number is not below a minimum value
- [`ValueRange`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/number/ValueRange.ts) - Validates that a number is within a specific range

##### string

- [`Alpha`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/Alpha.ts) - Validates that a string contains only alphabetical characters
- [`Alphanumeric`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/Alphanumeric.ts) - Validates that a string contains only alphanumeric characters
- [`Email`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/Email.ts) - Validates that a string is a valid email address
- [`IPAddress`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/IPAddress.ts) - Validates that a string is a valid IP address
- [`Lowercase`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/Lowercase.ts) - Validates that a string is all lowercase
- [`Numeric`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/Numeric.ts) - Validates that a string contains only numeric characters
- [`Uppercase`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/Uppercase.ts) - Validates that a string is all uppercase
- [`URL`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/impl/URL.ts) - Validates that a string is a valid URL
- [`Pattern`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/regex/Pattern.ts) - Validates that a string matches a specific regex pattern
- [`ExactLength`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/ExactLength.ts) - Validates that a string has an exact length
- [`Length`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/Length.ts) - Validates that a string has a length within a specific range
- [`MaxLength`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/MaxLength.ts) - Validates that a string does not exceed a maximum length
- [`MinLength`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/MinLength.ts) - Validates that a string is not below a minimum length
- [`Password`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/string/Password.ts) - Validates that a string meets password complexity requirements
