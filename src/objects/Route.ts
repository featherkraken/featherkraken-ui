import { Airport } from "./Airport";

export class Route {
  source?: Airport;
  target?: Airport;
  airline?: string;
  duration?: number;
  departure?: Date;
  arrival?: Date;
}
