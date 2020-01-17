import { TripType } from "./TripType";
import { ClassType } from "./ClassType";

export class SearchRequest {
  public tripType: TripType = TripType.RoundTrip;
  public classType: ClassType = ClassType.Economy;
  public passengers: number = 1;

  public source: string | undefined;
  public radius: number | undefined;
  public target: string | undefined;

  public departure: Date = new Date();
  public arrival: Date = new Date();
}
