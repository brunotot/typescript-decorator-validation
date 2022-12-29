import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export default function Empty<T>(message: string = ErrorMessage.Empty()) {
	return ValidatorService.buildFieldValidatorDecorator<any[]>({
		expectedType: InferredType.ARRAY,
		isValid: (array) => ({
			key: "Empty",
			message,
			valid: (array ?? []).length === 0,
		}),
	});
}
