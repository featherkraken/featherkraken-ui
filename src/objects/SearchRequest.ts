import { TripType } from "./TripType";
import { ClassType } from "./ClassType";
import { Airport } from "./Airport";
import { Timespan } from "./Timespan";

export class SearchRequest {
  public limit?: number = 10;

  public tripType?: TripType = TripType.RoundTrip;
  public classType?: ClassType = ClassType.Economy;
  public passengers?: number = 1;

  public source?: Airport;
  public radius?: number;
  public target?: Airport;

  public departure?: Timespan;
  public return?: Timespan;

  public stops?: number;
}
