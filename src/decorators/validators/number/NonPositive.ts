import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export default function NonPositive(
	message: string = ErrorMessage.NonPositive()
) {
	return ValidatorService.buildFieldValidatorDecorator<number>({
		expectedType: InferredType.NUMBER,
		isValid: (num) => ({
			key: "NonPositive",
			message,
			valid: num !== undefined && num !== null && num <= 0,
		}),
	});
}
