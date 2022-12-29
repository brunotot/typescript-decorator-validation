import MetadataKey from "../constants/MetadataKey";
import ReflectService from "../service/ReflectService";
import { deepEquals } from "../utils/ObjectUtils";

export type Class<T> = new () => T;

export type ValidationResult = {
	key: string;
	message: string;
	valid: boolean;
};

export type ValidationFn<T> = (value: T) => ValidationResult;

export interface ValidationData<T> {
	[key: string]: ValidationFn<T>[];
}

export type ErrorData = {
	[key: string]: ValidationResult[];
};

export type StateValidationResult = {
	valid: boolean;
	errors: ErrorData;
};

export default class ValidationHandler<T> {
	private _clazz: Class<T>;
	private _fieldNames: string[];
	private _validationData: ValidationData<T>;
	private _oldState?: Object;
	private _oldHasErrors?: boolean;
	private _oldErrors?: ErrorData;

	constructor(clazz: Class<T>) {
		this._clazz = clazz;
		this._fieldNames = this.buildFieldKeys();
		this._validationData = this.buildValidationData();
	}

	get validationData(): ValidationData<T> {
		return this._validationData;
	}

	hasErrors(state: Object): boolean {
		return this._oldHasErrors === undefined ||
			!deepEquals(this._oldState, state)
			? !this.validate(state).valid
			: this._oldHasErrors;
	}

	getErrors(state: Object): ErrorData {
		return this._oldErrors === undefined || !deepEquals(this._oldState, state)
			? this.validate(state).errors
			: this._oldErrors;
	}

	validate(state: Object): StateValidationResult {
		let valid: boolean = true;
		let errors: ErrorData = {};
		const instance: any = this.buildInstance(state);
		Object.entries(this._validationData).forEach(([key, validators]) => {
			const fieldErrors = validators
				.map((validator) => validator(instance[key]))
				.filter((evaluation) => !evaluation.valid);
			if (fieldErrors.length > 0) {
				valid = false;
			}
			errors[key] = fieldErrors;
		});
		this._oldState = state;
		this._oldHasErrors = !valid;
		this._oldErrors = errors;
		return {
			valid,
			errors,
		};
	}

	buildInstance(state: Object): T {
		const object: any = new this._clazz();
		Object.entries(state).forEach(([key, value]) => (object[key] = value));
		return object as T;
	}

	private getValidationMetadata<T>(property: string): ValidationFn<T>[] {
		return ReflectService.getMetadata(
			MetadataKey.VALIDATOR_FIELD,
			this._clazz,
			property
		);
	}

	private buildFieldKeys(): string[] {
		return [
			...ReflectService.getClassFieldNames(this._clazz),
			...ReflectService.getClassGetterNames(this._clazz),
		];
	}

	private buildValidationData<T>(): ValidationData<T> {
		return this._fieldNames.reduce(
			(obj, property) => ({
				...obj,
				[property]: this.getValidationMetadata<T>(property),
			}),
			{}
		);
	}
}
