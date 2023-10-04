type $<T> = {
  [K in keyof T]: T[K];
} & {};

export default $;
