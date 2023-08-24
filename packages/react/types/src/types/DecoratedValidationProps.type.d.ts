import { Class, ValidationGroup } from "tdv-core";
export type DecoratedValidationProps<T> = {
    model: Class<T>;
    defaultValue?: T;
    groups?: ValidationGroup[];
};
