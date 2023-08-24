import { DecoratedValidation } from "../types/DecoratedValidation.type";
import { DecoratedValidationProps } from "../types/DecoratedValidationProps.type";
export default function useValidation<T>({ defaultValue, model, groups, }: DecoratedValidationProps<T>): DecoratedValidation<T>;
