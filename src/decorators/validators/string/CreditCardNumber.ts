import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

function isValidCreditCardNumber(str: string): boolean {
	if (/[^0-9]/.test(str) || str.length < 16) {
		return false;
	}

	let sum = 0;
	let double = false;
	for (let i = str.length - 1; i >= 0; i--) {
		const digit = parseInt(str[i]);
		if (double) {
			sum += (digit * 2) % 9 || 9;
		} else {
			sum += digit;
		}
		double = !double;
	}
	return sum % 10 === 0;
}

export default function CreditCardNumber(message?: string) {
	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => ({
			key: "CreditCardNumber",
			message: message ?? ErrorMessage.CreditCardNumber(),
			valid: isValidCreditCardNumber(value),
		}),
	});
}
