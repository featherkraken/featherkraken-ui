import * as React from "react";
import "./App.css";
import {
  Navbar,
  Row,
  Form,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  InputGroup
} from "react-bootstrap";
import { SearchRequest } from "./objects/SearchRequest";
import { TripType } from "./objects/TripType";
import { ClassType } from "./objects/ClassType";
import { SearchResult } from "./objects/SearchResult";

export interface AppState {
  request: SearchRequest;
  result: SearchResult;
}

let tripTypes: string[] = [];
for (var t in TripType) {
  tripTypes.push(t);
}
let classTypes: string[] = [];
for (var c in ClassType) {
  classTypes.push(c);
}

export class App extends React.Component<{}, AppState> {
  state: Readonly<AppState> = {
    request: new SearchRequest(),
    result: {
      // mock data
      airlines: ["Lufthansa", "Emirates", "Russian airlines"]
    }
  };

  render() {
    return (
      <div>
        <Navbar className="shadow">
          <Navbar.Brand href="#home">
            <Row>
              <img
                alt="Featherkraken"
                src="/logo512.png"
                width="50"
                height="50"
                className="d-inline-block align-top ml-3 mr-3"
              />
              <h2>Featherkraken</h2>
            </Row>
          </Navbar.Brand>
        </Navbar>
        <Form className="m-5">
          <Form.Row className="ml-3">
            <DropdownButton
              size="sm"
              variant="outline"
              id="tripType"
              title={this.state.request.tripType}
              className="mr-1"
            >
              {tripTypes.map(name => {
                return (
                  <Dropdown.Item key={tripTypes.indexOf(name)}>
                    {name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <DropdownButton
              size="sm"
              variant="outline"
              id="passengers"
              title={
                this.state.request.passengers === 1
                  ? this.state.request.passengers + " Passenger"
                  : this.state.request.passengers + " Passengers"
              }
              className="mr-1"
            >
              <Form.Control type="number" min="1" defaultValue="1" />
            </DropdownButton>
            <DropdownButton
              size="sm"
              variant="outline"
              id="classType"
              title={this.state.request.classType}
            >
              {classTypes.map(name => {
                return (
                  <Dropdown.Item key={classTypes.indexOf(name)}>
                    {name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Form.Row>
          <Form.Row className="mt-3 ml-3 mr-3">
            <Form.Group as={Col} controlId="source" className="mr-3">
              <Form.Control min="0" placeholder="Source" />
            </Form.Group>
            <Form.Group as={Col} controlId="distance" className="mr-3" lg="1">
              <InputGroup>
                <Form.Control
                  type="number"
                  min="0"
                  defaultValue={this.state.request.radius}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="km-addon">km</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="target" className="mr-3">
              <Form.Control min="0" placeholder="Target airport" />
            </Form.Group>
            <Form.Group as={Col} controlId="startDate" className="mr-3" lg="2">
              <Form.Control
                type="date"
                defaultValue={this.state.request.departure.toDateString()}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="endDate" lg="2">
              <Form.Control
                type="date"
                defaultValue={this.state.request.arrival.toDateString()}
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Row className="justify-content-md-center mt-3">
            {" "}
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Row>
          <Form.Row className="ml-3 mb-3">
            <DropdownButton
              size="sm"
              variant="outline"
              id="stops"
              title="Stops"
              className="mr-1"
            >
              <Form.Label className="m-1">Maximum stops</Form.Label>
              <Form.Control size="sm" type="number" min="0" defaultValue="0" />
            </DropdownButton>
            <DropdownButton
              size="sm"
              variant="outline"
              className="mr-1"
              id="airline"
              title="Airline"
            >
              {this.state.result.airlines.map(name => {
                return (
                  <Form.Check
                    className="m-2"
                    type="checkbox"
                    key={this.state.result.airlines.indexOf(name)}
                    label={name}
                    defaultChecked={true}
                  />
                );
              })}
            </DropdownButton>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
