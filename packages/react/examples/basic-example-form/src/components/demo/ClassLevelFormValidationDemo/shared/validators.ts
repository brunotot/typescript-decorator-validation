import { Class, UnwrapClass, createClassValidator } from "tdv-core";

export function EqualFields<C extends Class>(...fields: (keyof UnwrapClass<C>)[]) {
  return createClassValidator<C>(value => {
    return {
      key: "EqualFields",
      message: `Fields ${new Intl.ListFormat("en").format(fields as string[])} must match`,
      valid: fields.every(field => value[field] === value[fields[0]]),
    };
  });
}

// prettier-ignore
export const VALIDATORS_CODE = 
`import { Class, UnwrapClass, createClassValidator } from "tdv-core";

export function EqualFields<C extends Class>(...fields: (keyof UnwrapClass<C>)[]) {
  return createClassValidator<C>(value => {
    return {
      key: "EqualFields",
      message: \`Fields \${new Intl.ListFormat("en").format(fields as string[])} must match\`,
      valid: fields.every(field => value[field] === value[fields[0]]),
    };
  });
}`
