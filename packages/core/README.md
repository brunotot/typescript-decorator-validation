<h1 align="center">:rocket: TypeScript Decorator Validation - Core :rocket:</h1>

<p align="center">:star: validates forms with TypeScript's native 
 <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators">decorators</a>
</p>
<p align="center">:star: adapts well with existing TypeScript applications</p>
<p align="center">:star: client-side and server-side supported</p>
<p align="center">:star: enforces strict type checking</p>
<p align="center">:star: uses <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html">TypeScript v5</a> syntax</p>

<p align="center">
 <a href="https://npmcharts.com/compare/typescript-decorator-validation?minimal=true">
  <img alt="Downloads per month" src="https://img.shields.io/npm/dm/typescript-decorator-validation" height="20"/>
 </a>
 
 <a href="https://www.npmjs.com/package/typescript-decorator-validation">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/typescript-decorator-validation.svg" height="20"/>
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

## Table of Contents

- [Install](#install)
- [Contribute](#contribute)
- [Future goals](#future-goals)
- [Supported frameworks](#supported-frameworks)
- [Examples](#examples)

## Install

1. Install core (server-side)
```
npm install tdv-core
```

## Contribute

1. Open bash terminal
2. Change directory to your desired position
3. Clone the repository main branch
```bash
git clone https://github.com/brunotot/typescript-decorator-validation.git
```
4. Checkout a new branch
```bash
git checkout -b "[package-name]-[issue-number]-issue-lorem-ipsum"
```
5. Commit and push changes
6. Open pull request

## Future goals

- [x] Implement strict type checking
- [x] Implement predefined decorator validators
- [ ] Provide fully-fledged documentation  
- [ ] Implement concise API for CI tests
- [ ] Implement tests for predefined decorator validators
- [ ] Write implementation libs for popular front-end frameworks

## Supported Frameworks
- [x] [view React implementation](https://github.com/brunotot/typescript-decorator-validation/tree/main/packages/react#readme)
- [ ] Angular
- [ ] Svelte
- [ ] Vue
- [ ] Solid


## Examples

A basic TypeScript form can look something like
```typescript
import { validators, EntityProcessor } from 'tdv-core';

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
  firstName: '',
  lastName: '',
  password: "12345",
  confirmPassword: '',
  url: '',
  age: 10,
};
```

Now we can inspect the errors of the given sample value

```typescript
const processor = new EntityProcessor(UserForm);
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
  "lastName": [
    "Field is mandatory"
  ],
  "password": [
    "Password must be at least 8 characters long"
  ],
  "url": [],
  "age": [
    "Value must be greater than or equal to 18 and less than or equal to 100 but is 10"
  ],
  "passwordsMatch": [
    "Passwords must match"
  ]
}
```
