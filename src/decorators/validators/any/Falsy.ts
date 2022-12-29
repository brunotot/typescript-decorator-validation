import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import { isTruthy } from "./Truthy";

export default function Falsy(message: string = ErrorMessage.Falsy()) {
	return ValidatorService.buildFieldValidatorDecorator<any>({
		isValid: (value) => ({
			key: "Falsy",
			message,
			valid: !isTruthy(value),
		}),
	});
}
