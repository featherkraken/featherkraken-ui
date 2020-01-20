import * as React from "react";
import moment from "moment";
import { ListGroup } from "react-bootstrap";
import { Route } from "../objects/Route";
import { Flight } from "../objects/Flight";

export function FlightPanel(props: any) {
  if (props.flight) {
    const flight: Flight = props.flight;
    return (
      <div>
        <div className="h6">
          {flight.departure ? moment(flight.departure).format("ddd D MMM") : ""}
          {moment(flight.departure).diff(flight.arrival, "days") !== 0
            ? ` - ${moment(flight.arrival).format("ddd D MMM")}`
            : ""}
        </div>
        <ListGroup>
          {flight.route
            ? flight.route.map((route: Route) => {
                return (
                  <ListGroup.Item>
                    <div>
                      <strong
                        title={moment(route.departure).format("ddd D MMM")}
                      >
                        {route.departure
                          ? moment(route.departure).format("HH:mm")
                          : ""}
                      </strong>{" "}
                      {route.source?.displayName} {route.source?.name}
                    </div>
                    <div>
                      <strong title={moment(route.arrival).format("ddd D MMM")}>
                        {route.arrival
                          ? moment(route.arrival).format("HH:mm")
                          : ""}
                      </strong>{" "}
                      {route.target?.displayName} {route.target?.name}
                    </div>
                  </ListGroup.Item>
                );
              })
            : ""}
        </ListGroup>
      </div>
    );
  }
  return <div></div>;
}
