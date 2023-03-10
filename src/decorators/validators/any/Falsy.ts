import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";

export default function Falsy(message: string = ErrorMessage.Falsy()) {
	return ValidatorService.buildFieldValidatorDecorator<any>({
		isValid: (value) => ({
			key: "Falsy",
			message,
			valid: !value,
		}),
	});
}
