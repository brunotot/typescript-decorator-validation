import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import { PredicateType } from "../../../utils/ObjectUtils";

export type SomeProps<T> = {
	test: PredicateType<T>;
	message: string;
};

export default function Some<T>({ test, message }: SomeProps<T>) {
	return ValidatorService.buildFieldValidatorDecorator<any[]>({
		expectedType: InferredType.ARRAY,
		isValid: (array) => ({
			key: "Some",
			message,
			valid: (array ?? []).some(test),
		}),
	});
}
