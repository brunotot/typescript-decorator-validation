import { Class, ValidationGroup } from "tdv-core";

export type DecoratedValidationProps<TClass, TBody = TClass> = {
  model: Class<TClass>;
  defaultValue?: TBody;
  groups?: ValidationGroup[];
};
