import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";

export default function Truthy(message: string = ErrorMessage.Truthy()) {
	return ValidatorService.buildFieldValidatorDecorator<any>({
		isValid: (value) => ({
			key: "Truthy",
			message,
			valid: !!value,
		}),
	});
}
