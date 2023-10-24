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

> <div id="what-does-tdv-core-do">❓ <strong><i>What does <code>tdv-core</code> do?</i></strong></div>
> 💡 <code>tdv-core</code> is an independent module responsible for handling all TypeScript-heavy evaluations and exposing useful classes and methods for managing, evaluating and displaying class model validation errors. It is designed to be fully customizable and easy to extend.

###

> <div id="which-versions-of-typescript-are-supported">❓ <strong><i>Which versions of TypeScript are supported?</i></strong></div>
> 💡 All TypeScript versions after and including the <strong>v5.0</strong> are supported.

## Installation

###

> <div id="how-do-i-install-it">❓ <strong><i>How do I install it?</i></strong></div>
> 💡 Very simple. You first have to make sure you have TypeScript <strong>v5</strong> installed. Afterwards, you install <code>tdv-core</code> package and optionally <code>tdv-react</code> or any of the supported framework-specific packages. You can see the full list of supported framework-packages <a href="https://github.com/brunotot/typescript-decorator-validation/tree/main/packages/core#supported-frameworks">here</a>.

```sh
npm install -d typescript@latest
npm install tdv-core
npm install tdv-react # optional
```

###

## Usage

> <div id="how-do-i-create-my-own-custom-decorator">❓ <strong><i>How do I create my own custom decorator?</i></strong></div>
> 💡 <code>tdv-core</code> exposes a method <a href="https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/collection/any/create.ts#L27">create</a> which returns a decorator factory based on your custom implementation. It accepts validation <code>groups</code> param and <code>isValid</code> which expects a callback that returns an object containing <code>key</code>, error <code>message</code> and <code>valid</code> boolean evaluation.

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

> <div id="how-to-specify-custom-error-messages-for-predefined-validators">❓ <strong><i>How to specify custom error messages for predefined validators?</i></strong></div>
> 💡 Each predefined validator in <code>tdv-core</code> allows for configurable properties, including custom error messages. To set a custom message, pass the <code>{ message: "Your custom error message" }</code> object to the validator. If a validator doesn't accept any arguments related to the validation logic and is able to process custom-defined messages then it may allow the first argument to be an actual string message instead of (union) configurable object.

```typescript
import { collection } from "tdv-core";

class MyClass {
  @collection.string.Required()
  // valid, will use default message defined by `tdv-core`
  @collection.string.Required("Custom error message")
  // also valid, will use custom-defined string
  @collection.string.Required({ message: "Custom error message" })
  // also valid, will use custom-defined string
  input!: string;
}
```

###

> <div id="how-to-specify-custom-validation-groups-for-predefined-validators">❓ <strong><i>How to specify custom validation groups for predefined validators?</i></strong></div>
> 💡 Like <code>message</code> parameter, we can also provide <code>groups</code> parameter to predefined validators. Validation groups are considered unique primitive identifiers - meaning it accepts identifiers like <code>number</code>, <code>string</code> or <code>symbol</code>. If no groups are provided, they default to an empty array.

```typescript
import { collection } from "tdv-core";

class MyClass {
  @collection.string.Required()
  // valid, will use default empty array for `groups`
  @collection.string.Required({ groups: "update" })
  // also valid, will validate only if validation engine has active "update" group
  @collection.string.Required({ groups: ["update", "create"] })
  // also valid, will validate only if validation engine has active "update" or "create" group
  input!: string;
}
```

###

## Localization

###

> <div id="which-languages-does-this-library-support">❓ <strong><i>Which languages does this library support?</i></strong></div>
> 💡 English, Croatian, German, Spanish, Frech, Italian and Dutch.

```typescript
namespace Localization {
  /** 2-character locale string representation. */
  export type Locale = "en" | "hr" | "de" | "es" | "fr" | "it" | "nl";
}
```

###

> <div id="how-to-change-error-messages-default-locale">❓ <strong><i>How to change error messages default locale?</i></strong></div>
> 💡 You can change the globally defined locale using <code>setLocale</code> method.

```typescript
import { Localization } from "tdv-core";

Localization.setLocale("es"); // Changes default locale to Spanish.
```

###

> <div id="how-to-specify-different-locale-for-each-validation-engine">❓ <strong><i>How to specify different locale for each validation engine?</i></strong></div>
> 💡 You can specify a locale when supplying configuration props to the engine. <code>ValidationEngine</code> constructor can accept configurable options <code>TdvCore.ValidationEngine.Config</code> in which we can define a custom value for <code>locale</code> key.

```typescript
import { ValidationEngine, TdvCore } from "tdv-core";

const options: TdvCore.ValidationEngine.Config = {
  locale: "es",
};

const engine = new ValidationEngine(SomeClass, options);
```

###

> <div id="can-i-define-a-custom-interceptor-for-evaluating-inline-defined-messages">❓ <strong><i>Can I define a custom interceptor for evaluating inline-defined messages?</i></strong></div>
> 💡 Yes. There is a <code>MessageResolver</code> class exposed specifically for this use-case. Check the example.

```typescript
import { Localization, ValidationEngine, collection } from "tdv-core";

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
  @collection.string.Required("required")
  input: string = "";
}

const engine = new ValidationEngine(SomeClass, { locale: "es" });
const result = engine.validate({});
console.log(result.errors.input);
// [ '[🇪🇸]: El campo de texto no debe estar vacío.' ]
```

## API Reference

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
