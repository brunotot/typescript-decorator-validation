import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import { PredicateType } from "../../../utils/ObjectUtils";

export type EveryProps<T> = {
	test: PredicateType<T>;
	message: string;
};

export default function Some<T>({ test, message }: EveryProps<T>) {
	return ValidatorService.buildFieldValidatorDecorator<any[]>({
		expectedType: InferredType.ARRAY,
		isValid: (array) => ({
			key: "Every",
			message,
			valid: (array ?? []).every(test),
		}),
	});
}
