import ValidatorService, {
	ValidationEvaluationType,
} from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

function isValidJSON(value: string, message: string): ValidationEvaluationType {
	let valid = true;
	try {
		window.JSON.parse(value);
	} catch (ignored) {
		valid = false;
	}
	return {
		key: "XML",
		message,
		valid,
	};
}

export default function JSON(message?: string) {
	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => isValidJSON(value, message ?? ErrorMessage.JSON()),
	});
}
