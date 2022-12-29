import ReflectService from "./ReflectService";
import MetadataKey from "../constants/MetadataKey";
import InferredType from "../constants/InferredType";
import ErrorMessage from "../constants/ErrorMessage";
import { ValidationFn } from "../handler/ValidationHandler";

export type FieldValidatorBuilderProps<T> = {
	isValid: ValidationFn<T>;
	expectedType?: InferredType | InferredType[];
};

class ValidatorService {
	buildFieldValidatorDecorator<T>({
		isValid,
		expectedType,
	}: FieldValidatorBuilderProps<T>) {
		const expectedTypeNormalized = expectedType ?? [InferredType.ANY];
		const expectedTypeArray = Array.isArray(expectedTypeNormalized)
			? expectedTypeNormalized
			: [expectedTypeNormalized];
		return (target: any, property: string) => {
			this.requireType(target, property, expectedTypeArray);
			ReflectService.setMetadata(
				MetadataKey.VALIDATOR_FIELD,
				isValid,
				target.constructor,
				property
			);
		};
	}

	private requireType(
		target: any,
		property: string,
		expectedType: InferredType[]
	) {
		if (expectedType.includes(InferredType.ANY)) {
			return;
		}
		const actualType = ReflectService.getClassFieldType(target, property);

		// TODO
		// const actualGetterType = ReflectService.getClassGetterType(target, property);

		if (actualType === InferredType.FUNCTION) {
			return;
		}

		if (!expectedType.includes(actualType)) {
			const className: string = target.constructor.name;
			const classNameSanitized = className.slice(0, className.length - 1);
			throw new Error(
				ErrorMessage.IncompatibleTypes(
					classNameSanitized,
					property,
					expectedType,
					actualType
				)
			);
		}
	}
}

export default new ValidatorService();
