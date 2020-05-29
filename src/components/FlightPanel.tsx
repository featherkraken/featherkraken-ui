import moment from "moment";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosAirplane as Airplane, IoMdCalendar as Calendar } from "react-icons/io";
import { Flight } from "../objects/Flight";
import { Route } from "../objects/Route";

export function FlightPanel(props: any) {
  if (props.flight) {
    const flight: Flight = props.flight;
    return (
      <div>
        {flight.route
          ? flight.route.map((route: Route, index: number) => {
              return (
                <Container key={index}>
                  <Row className="mb-1">
                    <div>
                      <big>
                        <Calendar />{" "}
                      </big>
                      {route.departure
                        ? moment(route.departure).format("ddd D MMM")
                        : ""}
                      {moment(route.departure).diff(route.arrival, "days") !== 0
                        ? ` - ${moment(route.arrival).format("ddd D MMM")}`
                        : ""}
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={1}>
                      <Airplane />
                    </Col>
                    <Col className="border rounded">
                      <div className="p-2">
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
                          <strong
                            title={moment(route.arrival).format("ddd D MMM")}
                          >
                            {route.arrival
                              ? moment(route.arrival).format("HH:mm")
                              : ""}
                          </strong>{" "}
                          {route.target?.displayName} {route.target?.name}
                        </div>
                      </div>
                    </Col>
                    <Col sm={3}>
                      <img
                        className="border rounded"
                        alt={`Airline ${route.airline}`}
                        src={`https://images.kiwi.com/airlines/64/${route.airline}.png`}
                      />
                    </Col>
                  </Row>
                </Container>
              );
            })
          : ""}
      </div>
    );
  }
  return <div></div>;
}
