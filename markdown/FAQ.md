# tdv-core

## FAQ

- [General](#general)
  - [What does `tdv-core` do?](#what-does-tdv-core-do)
  - [Which versions of TypeScript are supported?](#which-versions-of-typescript-are-supported)
- [Installation](#installation)
  - [How do I install it?](#how-do-i-install-it)
- [Usage](#usage)
  - [How do I create my own custom decorator?](#how-do-i-create-my-own-custom-decorator)
  - [How to specify custom error messages for predefined validators?](#how-to-specify-custom-error-messages-for-predefined-validators)
  - [How to specify custom validation groups for predefined validators?](#how-to-specify-custom-error-messages-for-predefined-validators)
- [Localization](#localization)
  - [Which languages does this library support?](#which-languages-does-this-library-support)
  - [How to change error messages default locale?](#how-to-change-error-messages-default-locale)
  - [How to specify different locale for each validation engine?](#how-to-specify-different-locale-for-each-validation-engine)
  - [Can I define a custom interceptor for evaluating inline-defined messages?](#can-i-define-a-custom-interceptor-for-evaluating-inline-defined-messages)
- [API Reference](#api-reference)
  - [Classes](#classes)
  - [Namespaces](#namespaces)
  - [Validators](#validators)
    - [`any`](#any)
    - [`Date`](#date)
    - [`array`](#array)
    - [`number`](#number)
    - [`string`](#number)

---

## General

###

> ❓ **_What does `tdv-core` do?_** <br />
> 💡 `tdv-core` is an independent module responsible for handling all TypeScript-heavy evaluations and exposing useful classes and methods for managing, evaluating and displaying class model validation errors. It is designed to be fully customizable and easy to extend.

> ❓ **_Which versions of TypeScript are supported?_** <br />
> 💡 All TypeScript versions after and including the **v5.0** are supported.

## Installation

###

> ❓ **_How do I install it?_** <br />
> 💡 Very simple. You first have to make sure you have TypeScript **v5** installed. Afterwards, you install `tdv-core` package and optionally `tdv-react` or any of the supported framework-specific packages. You can see the full list of supported framework-packages [here](https://github.com/brunotot/typescript-decorator-validation/tree/main/packages/core#supported-frameworks).

```sh
npm install -d typescript@latest
npm install tdv-core
npm install tdv-react # optional
```

## Usage

> ❓ **_How do I create my own custom decorator?_**<br />
> 💡 `tdv-core` exposes a method [`validate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/any/Rule.ts#L28) which returns a decorator factory based on your custom implementation. It accepts validation `groups` param and `isValid` which expects a callback that returns an object containing `key`, error `message` and `valid` boolean evaluation.

```typescript
import { validate } from "tdv-core";

function MinLength(minLength: number) {
  return validate<string>({
    groups: [],
    isValid: (value) => ({
      key: "MinLength",
      message: `Input must have at least ${minLength} characters.`,
      valid: value.length >= minLength,
    }),
  });
}

class MyClass {
  @MinLength(10)
  var1!: string;
}
```

###

> ❓ **_How to specify custom error messages for predefined validators?_** <br />
> 💡 Each predefined validator in `tdv-core` allows for configurable properties, including custom error messages. To set a custom message, pass the `{ message: "Your custom error message" }` object to the validator. If a validator doesn't accept any arguments related to the validation logic and is able to process custom-defined messages then it may allow the first argument to be an actual string message instead of (union) configurable object.

```typescript
import { decorate } from "tdv-core";

class MyClass {
  @decorate.string.Required()
  // valid, will use default message defined by `tdv-core`
  @decorate.string.Required("Custom error message")
  // also valid, will use custom-defined string
  @decorate.string.Required({ message: "Custom error message" })
  // also valid, will use custom-defined string
  input!: string;
}
```

###

> ❓ **_How to specify custom validation groups for predefined validators?_** <br />
> 💡 Like `message` parameter, we can also provide `groups` parameter to predefined validators. Validation groups are considered unique primitive identifiers - meaning it accepts identifiers like `number`, `string` or `symbol`. If no groups are provided, they default to an empty array.

```typescript
import { decorate } from "tdv-core";

class MyClass {
  @decorate.string.Required()
  // valid, will use default empty array for `groups`
  @decorate.string.Required({ groups: "update" })
  // also valid, will validate only if validation engine has active "update" group
  @decorate.string.Required({ groups: ["update", "create"] })
  // also valid, will validate only if validation engine has active "update" or "create" group
  input!: string;
}
```

###

## Localization

###

> ❓ **_Which languages does this library support?_** <br />
> 💡 English, Croatian, German, Spanish, Frech, Italian and Dutch.

```typescript
namespace Localization {
  /** 2-character locale string representation. */
  export type Locale = "en" | "hr" | "de" | "es" | "fr" | "it" | "nl";
}
```

###

> ❓ **_How to change error messages default locale?_** <br />
> 💡 You can change the globally defined locale using `setLocale` method.

```typescript
import { Localization } from "tdv-core";

Localization.setLocale("es"); // Changes default locale to Spanish.
```

###

> ❓ **_How to specify different locale for each validation engine?_** <br />
> 💡 You can specify a locale when supplying configuration props to the engine. `ValidationEngine` constructor can accept configurable options `TdvCore.ValidationEngine.Config` in which we can define a custom value for `locale` key.

```typescript
import { ValidationEngine, TdvCore } from "tdv-core";

const options: TdvCore.ValidationEngine.Config = {
  locale: "es",
};

const engine = new ValidationEngine(SomeClass, options);
```

###

> ❓ **_Can I define a custom interceptor for evaluating inline-defined messages?_** <br />
> 💡 Yes. There is a `MessageResolver` class exposed specifically for this use-case. Check the example.

```typescript
import { Localization, ValidationEngine, decorate } from "tdv-core";

// suppose you have a centralized place where your translations live
const translations: Record<string, Record<string, string>> = {
  en: { required: `[🇬🇧]: Text field must not be empty.` },
  es: { required: `[🇪🇸]: El campo de texto no debe estar vacío.` },
  hr: { required: `[🇭🇷]: Tekstualno polje ne smije biti prazno.` },
};

// provide a custom functional configurer which consumes your localized messages
Localization.MessageResolver.configure(
  (locale, message) => translations[locale][message]
);

class SomeClass {
  @decorate.string.Required("required")
  input: string = "";
}

const engine = new ValidationEngine(SomeClass, { locale: "es" });
const result = engine.validate({});
console.log(result.errors.input);
// [ '[🇪🇸]: El campo de texto no debe estar vacío.' ]
```

## API Reference

### Classes

- [`ValidationEngine`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/processor/index.ts#L22) - Main entry point for validating objects at runtime
- [`ValidationConfigurer`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/reflection/service/impl/reflection.service.validation.ts#L16) - Handles the process of attaching validators to the actual class' metadata

### Namespaces

- [`Decorator`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/decorators/index.ts#L10) - Contains logic for manipulating decorators
- [`Localization`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/localization/index.ts#L6) - Contains logic for manipulating the app's localization
- [`Reflection`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/reflection/index.ts#L9) - Contains logic for manipulating class' metadata

### Validators

##### any

- [`Required`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/any/Required.ts) - Checks if value is not empty
- [`Falsy`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/any/Falsy.ts) - Checks if value is falsy
- [`Truthy`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/any/Truthy.ts) - Checks if value is truthy
- [`validate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/any/Rule.ts) - Validates the field based on custom-provided validation logic
- [`attribute`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/any/valid.ts) - Sets the runtime representation of decorated field's type

##### Date

- [`FutureDate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/date/FutureDate.ts) - Checks if a date is in the future
- [`PastDate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/date/PastDate.ts) - Checks if a date is in the past
- [`TodayDate`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/date/TodayDate.ts) - Checks if a date is today, comparing year, month and day

##### array

- [`ArrayContains`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArrayContains.ts) - Validates that array at runtime contains the supplied value
- [`ArrayEmpty`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArrayEmpty.ts) - Validates that array at runtime must be empty
- [`ArrayEvery`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArrayEvery.ts) - Validates that every element in the array meets the specified condition
- [`ArrayNone`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArrayNone.ts) - Validates that no elements in the array meet the specified condition
- [`ArrayOne`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArrayOne.ts) - Validates that exactly one element in the array meets the specified condition
- [`ArraySizeExact`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArraySizeExact.ts) - Validates that the array has an exact size
- [`ArraySizeMax`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArraySizeMax.ts) - Validates that the array size does not exceed a maximum value
- [`ArraySizeMin`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArraySizeMin.ts) - Validates that the array size is not below a minimum value
- [`ArraySizeRange`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArraySizeRange.ts) - Validates that the array size is within a specific range
- [`ArraySome`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArraySome.ts) - Validates that some elements in the array meet the specified condition
- [`ArrayUnique`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/ArrayUnique.ts) - Validates that all elements in the array are unique
- [`foreach`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/array/foreach.ts) - Applies a specific validator to each element in the array

##### number

- [`Decimal`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/Decimal.ts) - Validates that a number is a decimal number
- [`Digits`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/Digits.ts) - Validates that a number has a specific number of digits
- [`Integer`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/Integer.ts) - Validates that a number is an integer
- [`Negative`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/Negative.ts) - Validates that a number is negative
- [`NonNegative`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/NonNegative.ts) - Validates that a number is non-negative
- [`NonPositive`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/NonPositive.ts) - Validates that a number is non-positive
- [`Positive`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/Positive.ts) - Validates that a number is positive
- [`ValueMax`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/ValueMax.ts) - Validates that a number does not exceed a maximum value
- [`ValueMin`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/ValueMin.ts) - Validates that a number is not below a minimum value
- [`ValueRange`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/number/ValueRange.ts) - Validates that a number is within a specific range

##### string

- [`Alpha`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/Alpha.ts) - Validates that a string contains only alphabetical characters
- [`Alphanumeric`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/Alphanumeric.ts) - Validates that a string contains only alphanumeric characters
- [`Email`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/Email.ts) - Validates that a string is a valid email address
- [`IPAddress`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/IPAddress.ts) - Validates that a string is a valid IP address
- [`Lowercase`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/Lowercase.ts) - Validates that a string is all lowercase
- [`Numeric`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/Numeric.ts) - Validates that a string contains only numeric characters
- [`Uppercase`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/Uppercase.ts) - Validates that a string is all uppercase
- [`URL`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/impl/URL.ts) - Validates that a string is a valid URL
- [`Pattern`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/regex/Pattern.ts) - Validates that a string matches a specific regex pattern
- [`ExactLength`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/ExactLength.ts) - Validates that a string has an exact length
- [`Length`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/Length.ts) - Validates that a string has a length within a specific range
- [`MaxLength`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/MaxLength.ts) - Validates that a string does not exceed a maximum length
- [`MinLength`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/MinLength.ts) - Validates that a string is not below a minimum length
- [`Password`](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/validators/string/Password.ts) - Validates that a string meets password complexity requirements
