import { type Dispatch, type SetStateAction } from "react";

export type UseChangeHandlersConfig<TBody> = {
  setForm: Dispatch<SetStateAction<TBody>>;
};
