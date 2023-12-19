import { useMemo } from "react";
import { Validation } from "tdv-core";
export default function useValidationEngine(model, config) {
    return useMemo(() => new Validation.ValidationEngine(model, config), []);
}
