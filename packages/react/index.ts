import TdvCoreApi from "tdv-core";
import FormProvider from "./src/contexts/FormContext";
import FormContextNamespace from "./src/contexts/FormContext/types";
import useForm from "./src/hooks/useForm";
import UseFormNamespace from "./src/hooks/useForm/types";
import useValidation from "./src/hooks/useValidation";
import UseValidationNamespace from "./src/hooks/useValidation/types";

/**
 * A namespace which holds shared context-related components
 */
export namespace Contexts {
  export import FormProvider = FormContextNamespace;
}

/**
 * A namespace which holds shared hook-related components
 */
export namespace Hooks {
  export import UseForm = UseFormNamespace;

  export import UseValidation = UseValidationNamespace;
}

export { FormProvider, TdvCoreApi, useForm, useValidation };
