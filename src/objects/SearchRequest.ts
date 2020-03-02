import { TripType } from "./TripType";
import { ClassType } from "./ClassType";

export class SearchRequest {
  public limit?: number = 10;

  public tripType?: TripType = TripType.RoundTrip;
  public classType?: ClassType = ClassType.Economy;
  public passengers?: number = 1;

  public source?: string;
  public radius?: number;
  public target?: string;

  public departureTime?: Date;
  public returnTime?: Date;
  // Dates as string
  public departure?: string;
  public return?: string;
}
