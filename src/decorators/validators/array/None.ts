import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import { PredicateType } from "../../../utils/ObjectUtils";

export type NoneProps<T> = {
	test: PredicateType<T>;
	message: string;
};

export default function None<T>({ test, message }: NoneProps<T>) {
	return ValidatorService.buildFieldValidatorDecorator<any[]>({
		expectedType: InferredType.ARRAY,
		isValid: (array) => ({
			key: "None",
			message,
			valid: (array ?? []).filter(test).length === 0,
		}),
	});
}
