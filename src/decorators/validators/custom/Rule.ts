import ValidatorService, {
	EvaluateValidationType,
	FieldValidatorBuilderProps,
} from "../../../service/ValidatorService";

export type RuleProps<T> = FieldValidatorBuilderProps<T>;

export default function Rule<T>(isValid: EvaluateValidationType<T>) {
	return ValidatorService.buildFieldValidatorDecorator<T>({
		isValid,
	});
}
