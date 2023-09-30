<h1 align="center">🚀 TypeScript Decorator Validation 🚀</h1>

<<<<<<< Updated upstream
=======
<p align="center">🎩 <strong>TypeScript v5:</strong> Harness the power of TypeScript v5 decorators for type-safe validation.</p>
<p align="center">🛠️ <strong>Extensible:</strong> Customize our library to fit your unique needs with ease.</p>
<p align="center">🌍 <strong>i18n Support:</strong> Speak your users' language with built-in localization.</p>
<p align="center">🔧 <strong>Adaptability:</strong> Seamless integration with existing TypeScript apps.</p>
<p align="center">💻 <strong>Versatility:</strong> Works on both client and server-side.</p>

>>>>>>> Stashed changes
<p align="center">
 <a href="https://npmcharts.com/compare/typescript-decorator-validation?minimal=true">
  <img alt="Downloads per month" src="https://img.shields.io/npm/dm/typescript-decorator-validation" height="20"/>
 </a>
 
 <a href="https://www.npmjs.com/package/typescript-decorator-validation">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/tdv-core.svg" height="20"/>
 </a>
 
 <a href="https://github.com/brunotot/typescript-decorator-validation/graphs/contributors">
  <img alt="Contributors" src="https://img.shields.io/github/contributors/brunotot/typescript-decorator-validation" height="20"/>
 </a>
 
 <a href="https://github.com/brunotot/typescript-decorator-validation/graphs/commit-activity">
  <img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/>
 </a>
 
 <a href="#">
  <img alt="Awesome badge" src="https://awesome.re/badge.svg" height="20"/>
 </a>
</p>

<<<<<<< Updated upstream
<p align="center">
  <a href="https://github.com/brunotot/typescript-decorator-validation/tree/main/markdown/FAQ.md">
    🔎 Frequently Asked Questions (FAQ)
  </a>
</p>

<br />

> 🌟 **Welcome to `tdv-monorepo`, the future of model validation in TypeScript.**
>
> Leveraging TypeScript decorators, `tdv-monorepo` offers a declarative way to manage model validation. Suitable for both client-side and server-side projects, it comes with built-in extensibility and localization support.

### Features

- powered by TypeScript's [stage-3](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators) decorators (type-safety included)
- small in bundle size with no dependencies
- built-in [i18n localization](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/localization/index.ts#L6) support to supply the messages in the user's native language
- well-documented code and extensive guides for making it easy to get started
- designed to play nice with popular testing frameworks like [Jest](https://jestjs.io/)
- integrates seamlessly within any native TypeScript v5+ project
- provides a clean and declarative way of validating form fields
- exports [Reflection](https://github.com/brunotot/typescript-decorator-validation/blob/main/packages/core/src/reflection/index.ts#L9) namespace containing useful reflection-related methods

### Content

- [Features](#features)
- [Content](#content)
- [Installation](#installation)
- [Quick start](#quick-start)
=======
## TOC

- [TOC](#toc)
- [Installation](#installation)
>>>>>>> Stashed changes
- [Supported Frameworks](#supported-frameworks)
- [Documentation](#documentation)
- [Contribution](#contribution)
- [Future goals](#future-goals)
- [Examples](#examples)
- [Repository architecture](#repository-architecture)
- [Comparison against similar solutions](#comparison-against-similar-solutions)

<<<<<<< Updated upstream
### Installation
=======
## Installation
>>>>>>> Stashed changes

```bash
npm install -d typescript@latest
npm install tdv-core
npm install tdv-react # when using in framework-specific environment
```

<<<<<<< Updated upstream
### Quick start

```typescript
import {
  validate,
  decorate,
  ValidationEngine,
  Localization,
  TdvCore,
} from "tdv-core";

function MinSize(min: number, groups: TdvCore.Validation.Groups = []) {
  return validate<string>({
    groups,
    isValid: (value: string, _parent: Foo, _locale: Localization.Locale) => ({
      key: "MinSize",
      valid: value.length >= min,
      message: `Input must contain at least ${min} characters`,
    }),
  });
}

class Foo {
  @decorate.string.Email() // predefined
  @MinSize(10) // custom
  email!: string;
}

const engine = new ValidationEngine(Foo);
const result = engine.validate({ email: "invalid" });
console.log(result.errors.email);
// [ 'Input must contain at least 10 characters', 'Value is not a valid email' ]
```

### Supported Frameworks
=======
## Supported Frameworks
>>>>>>> Stashed changes

- [x] [view React implementation](https://github.com/brunotot/typescript-decorator-validation/tree/main/packages/react#readme)
- [ ] Angular
- [ ] Svelte
- [ ] Vue

<<<<<<< Updated upstream
### Documentation
=======
## Documentation
>>>>>>> Stashed changes

- [tdv-core](https://brunotot.github.io/typescript-decorator-validation/modules/tdv_core.html)
- [tdv-react](https://brunotot.github.io/typescript-decorator-validation/modules/tdv_react.html)

<<<<<<< Updated upstream
### Contribution
=======
## Contribution
>>>>>>> Stashed changes

To contribute, simply clone the main branch, commit changes to a local branch and open pull request.</br>
Branch will be ready for merge after all CI tests pass and a review has been made.

### Future goals

- [x] Implement strict type checking
- [x] Implement predefined decorator validators
- [x] Provide source code documentation
- [x] Implement concise tests for various scenarios
- [ ] Build implementation packages for popular front-end frameworks

### Examples

A basic TypeScript form can look something like

```typescript
<<<<<<< Updated upstream
import { decorate, ValidationEngine } from "tdv-core";
=======
import { validators, EntityProcessor } from "tdv-core";
>>>>>>> Stashed changes

/**
 *  This is an optional layer of abstraction if the class contains complex
 *  validation evaluations which shouldn't be registered as properties.
 *  In this example the "passwordsMatch" field isn't a settable property.
 */
export type UserFormFields = {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  url: string;
  age: number;
};

export default class UserForm implements UserFormFields {
  @decorate.string.MinLength(5)
  @decorate.string.Required()
  firstName!: string;

  @decorate.string.Required()
  lastName!: string;

  @decorate.string.Required()
  @decorate.string.Password()
  password!: string;

  confirmPassword!: string;

  @decorate.string.URL()
  url!: string;

  @decorate.number.ValueRange({ min: 18, max: 100 })
  age!: number;

  @decorate.boolean.Truthy("Passwords must match")
  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}
```

And a sample value of type UserForm may look something like

```typescript
const dummy: Partial<UserFormFields> = {
  firstName: "",
  lastName: "",
  password: "12345",
  confirmPassword: "",
  url: "",
  age: 10,
};
```

Now we can inspect the errors of the given sample value

```typescript
const engine = new ValidationEngine(UserForm);
const { errors } = engine.validate(dummy);
console.log(errors);
```

And the result is

<<<<<<< Updated upstream
```typescript
=======
```json
>>>>>>> Stashed changes
{
  firstName: [
    "Field is mandatory",
    "Field must contain at least 5 characters"
  ],
<<<<<<< Updated upstream
  lastName: [
    "Field is mandatory"
  ],
  password: [
    "Password must be at least 8 characters long"
  ],
  url: [
    // EMPTY
  ],
  age: [
    "Value must be greater than or equal to 18 and less than or equal to 100 but is 10"
  ],
  passwordsMatch: [
    "Passwords must match"
  ]
}
```

### Repository architecture
=======
  "lastName": ["Field is mandatory"],
  "password": ["Password must be at least 8 characters long"],
  "url": [],
  "age": [
    "Value must be greater than or equal to 18 and less than or equal to 100 but is 10"
  ],
  "passwordsMatch": ["Passwords must match"]
}
```

## Repository architecture
>>>>>>> Stashed changes

The `tdv-core` package is the backbone, providing core validation logic that's framework-agnostic. Features include:

- A decorator factory for easy integration with TypeScript
- Metadata management for dynamic behavior
- Localization support
- Built-in validators like `Email`, `Required`, etc.

The core package serves as the foundation for implementation libraries like `tdv-react`, with future extensions planned for Angular, Vue, and Svelte. This modular design ensures that the core logic remains framework-agnostic, allowing for easy adaptability.

<<<<<<< Updated upstream
### Comparison against similar solutions
=======
## Comparison against similar solutions
>>>>>>> Stashed changes

| Criteria          | tdv-monorepo | Yup    | React Hook Form | Validator.js | Formik |
| ----------------- | ------------ | ------ | --------------- | ------------ | ------ |
| Type Safety       | ✅           | ❌     | 🟡[^1]          | ❌           | ❌     |
| Syntax            | ✅           | ❌     | ✅[^2]          | ❌           | ❌     |
| Learning Curve    | ✅           | 🟡[^3] | 🟡[^4]          | 🟡[^5]       | 🟡[^6] |
| Custom Validators | ✅           | 🟡[^7] | ✅              | 🟡[^8]       | 🟡[^9] |

- ✅: Fully supported and easy-to-use
- ❌: Not supported
- 🟡: Partial support

[^1]: React Hook Form has good TypeScript support but doesn't integrate as seamlessly as `tdv-monorepo`.
[^2]: React Hook Form uses hooks, which are easy to use but different from native TypeScript decorators.
[^3]: Yup requires learning its custom object schema, adding to the learning curve.
[^4]: React Hook Form requires understanding of hooks, adding a slight learning curve.
[^5]: Validator.js requires learning their API, which can be cumbersome.
[^6]: Formik has its own ecosystem, making the learning curve steeper.
[^7]: Yup allows for custom validation but within the confines of its own schema.
[^8]: Validator.js allows for some customization but it's not straightforward.
[^9]: Formik allows for custom validation but within its own framework.
