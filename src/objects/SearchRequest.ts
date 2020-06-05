import { Airport } from "./Airport";
import { ClassType } from "./ClassType";
import { Timespan } from "./Timespan";
import { TripType } from "./TripType";

export class SearchRequest {
  public limit?: number = 10;

  public tripType?: TripType = TripType.RoundTrip;
  public classType?: ClassType = ClassType.Economy;
  public mixClasses?: Boolean = true;
  public passengers?: number = 1;

  public source?: Airport;
  public radius?: number;
  public target?: Airport;

  public departure?: Timespan;
  public return?: Timespan;

  public stops?: number;
}
