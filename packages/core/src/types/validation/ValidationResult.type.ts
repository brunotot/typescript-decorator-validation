export type ValidationResult = {
  key: string;
  message: string;
  valid: boolean;
};

export function buildSimpleErrors(validations: ValidationResult[] = []) {
  const nonNullableValidations = validations ?? [];
  return Array.isArray(nonNullableValidations)
    ? nonNullableValidations.map((e) => e.message)
    : [];
}
