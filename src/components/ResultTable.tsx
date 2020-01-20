import * as React from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { Trip } from "../objects/Trip";
import { FlightPanel } from "./FlightPanel";

export function ResultTable(props: any) {
  if (props.trips) {
    return (
      <Table className="m-5">
        <tbody>
          {props.trips.map((trip: Trip) => {
            return (
              <tr key={trip.link}>
                <td>
                  <Container>
                    <Row>
                      <Col>
                        <FlightPanel flight={trip.outwardFlight} />
                      </Col>
                      <Col>
                        <FlightPanel flight={trip.returnFlight} />
                      </Col>
                      <Col>
                        <Row>
                          <h2>{trip.price} €</h2>
                        </Row>
                        <Row className="mt-3">
                          <a
                            href={trip.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="success">Book</Button>
                          </a>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  return <div></div>;
}
