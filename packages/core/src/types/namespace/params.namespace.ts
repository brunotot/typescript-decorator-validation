import Helper from "./helper.namespace";

// prettier-ignore
namespace Params {
  export type partial = {
    disabled: "disabled";
    enabled: "enabled";
  }

  export type valuePartial = 
    Helper.Values<Params.partial>
}

export default Params;
