import { Flight } from "./Flight";

export class Trip {
  price?: number;
  airlines?: string[];
  link?: string;
  outwardFlight?: Flight;
  returnFlight?: Flight;
}
