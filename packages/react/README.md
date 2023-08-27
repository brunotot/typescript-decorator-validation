<h1 align="center">:rocket: TypeScript Decorator Validation - React :rocket:</h1>

<p align="center">:star: validates forms with TypeScript's native 
 <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators">decorators</a>
</p>
<p align="center">:star: adapts well with existing TypeScript - React applications</p>
<p align="center">:star: enforces strict type checking</p>
<p align="center">:star: uses <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html">TypeScript v5</a> syntax</p>

<p align="center">
 <a href="https://npmcharts.com/compare/typescript-decorator-validation?minimal=true">
  <img alt="Downloads per month" src="https://img.shields.io/npm/dm/typescript-decorator-validation" height="20"/>
 </a>
 
 <a href="https://www.npmjs.com/package/typescript-decorator-validation">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/tdv-react.svg" height="20"/>
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
 
 <h2 align="center">
  <a href="https://stackblitz.com/github/brunotot/typescript-decorator-validation/tree/main/examples/basic-example-form?file=src%2Fcomponents%2Fcontrols%2FUserFormControls.tsx">STACKBLITZ DEMO</a>
 </h2>
</p>

## Table of Contents

- [Install](#install)
- [Contribute](#contribute)
- [Future goals](#future-goals)
- [Examples](#examples)

## Install

1. Install core and react related dependencies
```bash
npm install typescript@latest --save-dev && npm install tdv-core tdv-react --force
```

2. Apply polyfill inside `src/main.tsx`
```typescript
import "tdv-core/dist/polyfill";
```

3. :rocket: Done. You are ready to go

## Contribute

1. Open bash terminal
2. Change directory to your desired position
3. Clone the repository main branch
```bash
git clone https://github.com/brunotot/typescript-decorator-validation.git
```
4. Checkout a new branch
```bash
git checkout -b "[react]-[issue-number]-issue-lorem-ipsum"
```
5. Commit and push changes
6. Open pull request

## Future goals

- [x] Implement strict type checking
- [ ] Provide fully-fledged documentation  
- [ ] Implement tests for predefined decorator validators

## Examples

A basic TypeScript form can look something like
```typescript
import { validators, EntityProcessor } from 'tdv-core';

/** 
 *  This is an optional layer of abstraction if the class contains complex
 *  validation evaluations which shouldn't be registered as properties.
 *  In this example the "passwordsMatch" field isn't a settable property.
 */
 export type User = {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  url: string;
  age: number;
};

export default class UserForm implements User {
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

Finally, this would be the TSX component

```typescript
import { useState } from "react";
import { FormProvider, useForm } from "tdv-react";
import UserForm from "../../models/UserForm";
import Input from "./../shared/Input";

/**
 * Boolean decider whether the initial validation should trigger only after first form submission:
 *   - when true the validation should trigger only when form is first submitted
 *   - when false validation is triggered immediately when the hook mounts
 */
const SUBMIT_BUTTON_TRIGGERS_VALIDATION = true;

/**
 * State decider on which groups will validation be executed on.
 *   - when 'native' only those validators which have 'native' group defined are evaluated
 *   - when 'custom' only those validators which have 'custom' group defined are evaluated
 *   - when 'both' only those validators which have either 'native' or 'custom' group are evaluated
 */
const VALIDATION_GROUPS_FACTORY: "native" | "custom" | "both" = "both";

export default function UserFormInput() {
  const [numberOfStateChanges, setNumberOfStateChanges] = useState(0);

  /**
   * "useForm" hook accepts two (2) generics. 
   *   - validated Class (mandatory)
   *   - writable scope (optional, defaults to validatedClass)
   
   * Bare in mind that "useForm" acts like "useState" - the only difference
   * is that, besides a getter and a setter, it exports a third data argument
   * in the array which is just an object containing additional relevant data.

   * On commented line (43) useForm hook is called with explicitly defined types UserForm and User.
   * Based on that, the "form" value will evaluate to User since it should only hold the 
   * writable scope of UserForm, and the "errors" value will evaluate to an object type which
   * holds all errors for the fields of UserForm including the non-writtable ones such as 
   * the getter for "arePasswordsEqual" field as it is displayed in the example UserForm class.
   
   * You can try toggling "arePasswordsEqual" visibility from public through private
   * and seeing how the types are being inferred when generics are manually passed and how they 
   * are inferred when generics aren't passed.
   
   * useForm<UserForm, User>(UserForm, {...})
   */
  const [form, _setForm, data] = useForm<UserForm>(UserForm, {
    /**
     * "validationGroups" is an optional parameter which defaults to [] and it specifies
     * which validation groups should be used for validating this particular form. When
     * empty then it loads only those validators which don't have a validation group defined,
     * but when it is not empty then it loads only those validators which have at least
     * one validation group defined which matches with any of the given parameter groups.
     * This can be useful when you want to reuse a form component which' validations differ
     * whether the form component is in Update state or Create state (you may distings
     * validation groups using basic enums or strings or ordinals, it is up to you).
     */
    validationGroups:
      VALIDATION_GROUPS_FACTORY === "both"
        ? ["custom", "native"]
        : VALIDATION_GROUPS_FACTORY === "custom"
        ? ["custom"]
        : ["native"],

    /**
     * "onSubmit" is an optional parameter and it allows for defining custom behavior
     * when a valid form is submitted. It accepts sync or async (Promise) function.
     */
    onSubmit: () => alert("Congrats, you don't have any validation errors!"),

    /**
     * "whenChanged" is an optional parameter and it allows for defining custom behavior each time
     * the "form" value for current context changes. It can be useful when you have a custom complex
     * type that behaves as a primitive value (you might even have a custom controlled input component
     * that handles that specific complex type). If you don't have a custom controlled component
     * defined you can still implement it through "whenChanged" so that, when it's called, it
     * emits the event of that context data changing and the parent component may handle that data
     * accordingly and probably set a new state of its container with included new data that came
     * from the child component.
     */
    whenChanged: () => setNumberOfStateChanges((p) => ++p),

    /**
     * "defaultValue" is an optional parameter and it allows for defining custom empty constructor
     * definition of the model. By default, when "defaultValue" is undefined, the empty constructor
     * of given model is used to initialize the first value of "form".
     */
    defaultValue: undefined,

    /**
     * "standalone" defaults to true and decides if the context of the current form model
     * is at root level. When a form control is standalone that means that it doesn't
     * share any context with the parent and is considered to be the main control of which'
     * submit handler will and should be used. If your form control is a deeply nested form which
     * cannot perform without data from higher hierarchy then you should set standalone to false.
     */
    standalone: true,

    /**
     * "validateImmediately" defaults to false and decides if the validation should get
     * triggered immediately after the hook mounts.
     */
    validateImmediately: !SUBMIT_BUTTON_TRIGGERS_VALIDATION,

    /**
     * "onSubmitValidationFail" is used for handling what happens after a user tries to submit
     * the form but the data is invalid. Here you can see that you get an alert with all
     * errors every time you try to submit an invalid form (currently that will only happen
     * on the first submit since the code is setup so the submit button can become disabled
     * after the first click because it starts the validation process). If we were to allow
     * submit button to always be enabled then the function would be called every time the
     * submit button is clicked and the data is invalid.
     */
    onSubmitValidationFail(e) {
      alert(
        "Form has invalid data. Please correct them\n" +
          JSON.stringify(e, null, 2)
      );
    },
  });

  /**
   * Here you can see additional data which useForm hook exports through the third array arg.
   * It is unpacked here just for education and well-visible purposes - you probably might
   * resort to unpacking data directly at the call of useForm instead.
   */
  const {
    /** Mandatory context props exported for ease-of-use purposes (spread it to <FormProvider>) */
    providerProps,

    /** Object made of class properties mapped to setter functions accepting class property value.*/
    cachedHandlers,

    /** Object with structure of model class but its values are mapped to lists of error messages. */
    errors,

    /** If true - form was already submitted before */
    isSubmitted,

    /** If true - form does not have any errors */
    isValid,

    /** On submit handler which encapsulates checking validity before proceeding with submission. */
    onSubmit,
  } = data;

  const dateOfBirthValue = form!.dateOfBirth
    ? form.dateOfBirth.toISOString().substring(0, 10)
    : "";

  return (
    <>
      {/**
       * <FormProvider/> is used for enabling the possibility of branching inner
       * form objects (deeply nested forms) and allowing all children Form components
       * to inherit the submission value through FormProvider's context.
       */}
      <FormProvider {...providerProps}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <Input
            value={form.testEmail}
            onChange={cachedHandlers.testEmail}
            errors={errors.testEmail}
            label="Test email"
          />
          <Input
            value={form.age}
            onChange={cachedHandlers.age}
            errors={errors.age}
            label="Age"
          />
          <Input
            value={form.password}
            onChange={cachedHandlers.password}
            errors={errors.password}
            type="password"
            label="Password"
          />
          <Input
            value={form.confirmPassword}
            onChange={cachedHandlers.confirmPassword}
            errors={errors.confirmPassword}
            type="password"
            label="Confirm password"
          />
          <Input
            value={dateOfBirthValue}
            onChange={(v) =>
              cachedHandlers.dateOfBirth!(v ? new Date(v) : null!)
            }
            errors={errors.dateOfBirth}
            type="date"
            label="Date of birth"
          />
          {SUBMIT_BUTTON_TRIGGERS_VALIDATION && (
            <button
              style={{ padding: "0.5rem", fontSize: 18, marginTop: 8 }}
              onClick={onSubmit}
              disabled={isSubmitted && !isValid}
            >
              <strong>Submit</strong>
            </button>
          )}
          <p>Form changed state count: {numberOfStateChanges}</p>
        </div>
      </FormProvider>
    </>
  );
}

```
