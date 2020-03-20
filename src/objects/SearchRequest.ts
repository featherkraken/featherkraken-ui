import { TripType } from "./TripType";
import { ClassType } from "./ClassType";
import { Airport } from "./Airport";

export class SearchRequest {
  public limit?: number = 10;

  public tripType?: TripType = TripType.RoundTrip;
  public classType?: ClassType = ClassType.Economy;
  public passengers?: number = 1;

  public source?: Airport;
  public radius?: number;
  public target?: Airport;

  public departureTime?: Date;
  public returnTime?: Date;
  // Dates as string
  public departure?: string;
  public return?: string;

  public stops?: number;
}
