import { ValidationFn } from "../../../handler/ValidationHandler";
import ValidatorService, {
	FieldValidatorBuilderProps,
} from "../../../service/ValidatorService";

export type RuleProps<T> = FieldValidatorBuilderProps<T>;

export default function Rule<T>(isValid: ValidationFn<T>) {
	return ValidatorService.buildFieldValidatorDecorator<T>({
		isValid,
	});
}
