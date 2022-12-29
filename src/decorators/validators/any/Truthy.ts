import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";

export function isTruthy(obj: any): boolean {
	return !(
		obj === undefined ||
		obj === null ||
		obj === false ||
		(Array.isArray(obj) && obj.length === 0) ||
		(typeof obj === "string" && obj.length === 0) ||
		(typeof obj === "object" && Object.keys(obj).length === 0)
	);
}

export default function Truthy(message: string = ErrorMessage.Truthy()) {
	return ValidatorService.buildFieldValidatorDecorator<any>({
		isValid: (value) => ({
			key: "Truthy",
			message,
			valid: isTruthy(value),
		}),
	});
}
