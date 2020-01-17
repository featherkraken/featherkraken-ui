import { TripType } from "./TripType";
import { ClassType } from "./ClassType";

export class SearchRequest {
  public tripType?: TripType = TripType.RoundTrip;
  public classType?: ClassType = ClassType.Economy;
  public passengers?: number = 1;

  public source?: string;
  public radius?: number;
  public target?: string;

  public departure?: Date = new Date();
  public arrival?: Date = new Date();
}
