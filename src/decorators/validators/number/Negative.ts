import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export default function Negative(message: string = ErrorMessage.Negative()) {
	return ValidatorService.buildFieldValidatorDecorator<number>({
		expectedType: InferredType.NUMBER,
		isValid: (num) => ({
			key: "Negative",
			message,
			valid: num !== undefined && num !== null && num < 0,
		}),
	});
}
