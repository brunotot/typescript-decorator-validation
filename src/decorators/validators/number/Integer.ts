import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export default function Integer(message: string = ErrorMessage.Integer()) {
	return ValidatorService.buildFieldValidatorDecorator<number>({
		expectedType: InferredType.NUMBER,
		isValid: (num) => ({
			key: "Integer",
			message,
			valid: num !== undefined && num !== null && Number.isInteger(num),
		}),
	});
}
