import { useMemo } from "react";
import { Form } from "tdv-core";
export default function useValidationEngine(model, config) {
    return useMemo(() => {
        return new Form(model, config);
    }, [JSON.stringify(config)]);
}
