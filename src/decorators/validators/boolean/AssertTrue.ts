import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import InferredType from "../../../constants/InferredType";

export default function AssertTrue(
	message: string = ErrorMessage.AssertTrue()
) {
	return ValidatorService.buildFieldValidatorDecorator<boolean>({
		expectedType: InferredType.BOOLEAN,
		isValid: (value) => ({
			key: "AssertTrue",
			message,
			valid: !!value,
		}),
	});
}
