import { Route } from "./Route";

export class Flight {
  departure?: Date;
  arrival?: Date;
  duration?: string;
  stops?: number;
  route?: Route[];
}
