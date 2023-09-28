<h1 align="center">🚀 TypeScript Decorator Validation 🚀</h1>

<p align="center">🎩 <strong>TypeScript v5:</strong> Harness the power of TypeScript v5 decorators for type-safe validation.</p>
<p align="center">🛠️ <strong>Extensible:</strong> Customize our library to fit your unique needs with ease.</p>
<p align="center">🌍 <strong>i18n Support:</strong> Speak your users' language with built-in localization.</p>
<p align="center">🔧 <strong>Adaptability:</strong> Seamless integration with existing TypeScript apps.</p>
<p align="center">💻 <strong>Versatility:</strong> Works on both client and server-side.</p>

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

## TOC

- [Installation](#installation)
- [Documentation](#documentation)
- [Contribution](#contribution)
- [Future goals](#future-goals)
- [Supported frameworks](#supported-frameworks)
- [Examples](#examples)
- [Repository architecture](#repository-architecture)
- [Comparison against similar solutions](#comparison-against-similar-solutions)

## Installation

```bash
npm i tdv-core
npm i tdv-react # when using in framework-specific environment
```

## Supported Frameworks

- [x] [view React implementation](https://github.com/brunotot/typescript-decorator-validation/tree/main/packages/react#readme)
- [ ] Angular
- [ ] Svelte
- [ ] Vue

## Documentation

- [tdv-core](https://brunotot.github.io/typescript-decorator-validation/modules/tdv_core.html)
- [tdv-react](https://brunotot.github.io/typescript-decorator-validation/modules/tdv_react.html)

## Contribution

To contribute, simply clone the main branch, commit changes to a local branch and open pull request.</br>
Branch will be ready for merge after all CI tests pass and a review has been made.

## Future goals

- [x] Implement strict type checking
- [x] Implement predefined decorator validators
- [x] Provide source code documentation
- [x] Implement concise tests for various scenarios
- [ ] Build implementation packages for popular front-end frameworks

## Examples

A basic TypeScript form can look something like

```typescript
import { validators, ValidationEngine } from "tdv-core";

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
  @validators.string.MinLength(5)
  @validators.string.Required()
  firstName!: string;

  @validators.string.Required()
  lastName!: string;

  @validators.string.Required()
  @validators.string.Password()
  password!: string;

  confirmPassword!: string;

  @validators.string.URL()
  url!: string;

  @validators.number.ValueRange({ min: 18, max: 100 })
  age!: number;

  @validators.boolean.Truthy("Passwords must match")
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
const processor = new ValidationEngine(UserForm);
const { errors } = processor.validate(dummy);
console.log(JSON.stringify(errors, null, 2));
```

And the result is

```json
{
  "firstName": [
    "Field is mandatory",
    "Field must contain at least 5 characters"
  ],
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

The `tdv-core` package is the backbone, providing core validation logic that's framework-agnostic. Features include:

- A decorator factory for easy integration with TypeScript
- Metadata management for dynamic behavior
- Localization support
- Built-in validators like `Email`, `Required`, etc.

The core package serves as the foundation for implementation libraries like `tdv-react`, with future extensions planned for Angular, Vue, and Svelte. This modular design ensures that the core logic remains framework-agnostic, allowing for easy adaptability.

## Comparison against similar solutions

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
