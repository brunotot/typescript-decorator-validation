import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";

export function hasValue(obj: any): boolean {
	return !(
		obj === undefined ||
		obj === null ||
		obj === false ||
		(Array.isArray(obj) && obj.length === 0) ||
		(typeof obj === "string" && obj.trim().length === 0) ||
		(typeof obj === "object" && Object.keys(obj).length === 0)
	);
}

export default function NotEmpty(message: string = ErrorMessage.NotEmpty()) {
	return ValidatorService.buildFieldValidatorDecorator<any>({
		isValid: (value) => ({
			key: "NotEmpty",
			message,
			valid: hasValue(value),
		}),
	});
}
