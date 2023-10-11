import type { Dispatch, SetStateAction } from "react";

namespace UseMutationsHook {
  export type UseMutationsConfig<TBody> = {
    setForm: Dispatch<SetStateAction<TBody>>;
  };
}

export default UseMutationsHook;
