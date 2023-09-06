import { validators } from "tdv-core";

const { Required } = validators.string;

export type Location = {
  country: string;
  city: string;
  address: string;
};

export default class LocationForm implements Location {
  @Required({ groups: ["native"] })
  country: string = "";

  @Required({ groups: ["native"] })
  city: string = "";

  @Required({ groups: ["native"] })
  address: string = "";
}
