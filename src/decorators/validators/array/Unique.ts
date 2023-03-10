import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import InferredType from "../../../constants/InferredType";
import {
	hash,
	HashFunctionType,
	isArrayUnique,
} from "../../../utils/ObjectUtils";

export type UniqueProps<T> =
	| string
	| {
			hash?: HashFunctionType<T>;
			message?: string;
	  };

export default function Unique<T>(props?: UniqueProps<T>) {
	const message = props
		? typeof props === "string"
			? props
			: props.message ?? ErrorMessage.Unique()
		: ErrorMessage.Unique();

	const hashFn = props
		? typeof props === "string"
			? hash
			: props.hash ?? hash
		: hash;

	return ValidatorService.buildFieldValidatorDecorator<any[]>({
		expectedType: InferredType.ARRAY,
		isValid: (array) => ({
			key: "Unique",
			message,
			valid: isArrayUnique(
				array,
				(obj1, obj2) => hashFn(obj1) === hashFn(obj2)
			),
		}),
	});
}
