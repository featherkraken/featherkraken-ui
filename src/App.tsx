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
  InputGroup,
  ProgressBar
} from "react-bootstrap";
import { SearchRequest } from "./objects/SearchRequest";
import { TripType } from "./objects/TripType";
import { ClassType } from "./objects/ClassType";
import { Trip } from "./objects/Trip";
import { Airport } from "./objects/Airport";
import moment from "moment";
import axios from "axios";
import { ResultTable } from "./components/ResultTable";
import { AsyncTypeahead, Menu, MenuItem } from "react-bootstrap-typeahead";

const apiUrl: string = "http://localhost:8080/featherkraken/rest";

export interface AppState {
  request: SearchRequest;
  searching: boolean;
  trips?: Trip[];
  allowNew: boolean;
  isLoading: boolean;
  multiple: boolean;
  options: Airport[];
}

let tripTypes: string[] = [];
for (var t in TripType) {
  tripTypes.push(TripType[t]);
}
let classTypes: string[] = [];
for (var c in ClassType) {
  classTypes.push(ClassType[c]);
}

export class App extends React.Component<{}, AppState> {
  state: Readonly<AppState> = {
    request: new SearchRequest(),
    searching: false,
    allowNew: false,
    isLoading: false,
    multiple: false,
    options: []
  };

  changeRequest(attr: string, value: any) {
    let temp: SearchRequest = this.state.request;
    temp[attr] = value;
    this.setState({ request: temp });
  }

  performSearch() {
    this.setState({ searching: true });
    axios
      .post(`${apiUrl}/flights`, this.state.request)
      .then(result => {
        this.setState({ trips: result.data });
        this.setState({ searching: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ searching: false });
      });
  }

  filterResult(attr: string, value: any) {
    if (!this.state.trips) {
      return;
    }
  }

  getAirports(value: string) {
    axios
      .get(`${apiUrl}/airports?query=${value}`)
      .then(result => {
        this.setState({ options: result.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  ResultFilters(props: any) {
    if (props.result && props.result.length !== 0) {
      return (
        <Form.Row className="ml-3 mb-3">
          <DropdownButton
            variant="outline"
            id="stops"
            title="Stops"
            className="mr-1"
          >
            <Form.Label className="m-1">Maximum stops</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              min="0"
              defaultValue="0"
              onChange={(event: any) => {
                this.filterResult("stops", event.target.value);
              }}
            />
          </DropdownButton>
          <DropdownButton
            variant="outline"
            className="mr-1"
            id="airline"
            title="Airline"
          >
            {props.result.airlines
              ? props.result.airlines.map((name: string, index: number) => {
                  return (
                    <Form.Check
                      className="m-2"
                      type="checkbox"
                      key={index}
                      label={name}
                      defaultChecked={true}
                    />
                  );
                })
              : ""}
          </DropdownButton>
        </Form.Row>
      );
    }
    return <div></div>;
  }

  render() {
    return (
      <div>
        <Navbar className="shadow">
          <Navbar.Brand href="#home">
            <Row>
              <img
                alt="Featherkraken"
                src="./logo512.png"
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
              variant="outline"
              id="tripType"
              title={this.state.request.tripType}
              className="mr-1"
              onSelect={(eventKey: any) => {
                this.changeRequest("tripType", eventKey);
              }}
            >
              {tripTypes.map(name => {
                return (
                  <Dropdown.Item key={tripTypes.indexOf(name)} eventKey={name}>
                    {name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <DropdownButton
              variant="outline"
              id="passengers"
              title={
                this.state.request.passengers === 1
                  ? this.state.request.passengers + " Passenger"
                  : this.state.request.passengers + " Passengers"
              }
              className="mr-1"
            >
              <Form.Control
                type="number"
                min="1"
                defaultValue="1"
                onChange={(event: any) => {
                  this.changeRequest("passengers", event.target.value);
                }}
              />
            </DropdownButton>
            <DropdownButton
              variant="outline"
              id="classType"
              title={this.state.request.classType}
              onSelect={(eventKey: any) => {
                this.changeRequest("classType", eventKey);
              }}
            >
              {classTypes.map(name => {
                return (
                  <Dropdown.Item key={classTypes.indexOf(name)} eventKey={name}>
                    {name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Form.Row>
          <Form.Row className="mt-3 ml-3 mr-3">
            <Form.Group as={Col} controlId="source" className="mr-3">
              <AsyncTypeahead
                {...this.state}
                id="source"
                labelKey={(airport: Airport) =>
                  `${airport.displayName} ${airport.name}`
                }
                placeholder="Source"
                minLength={2}
                onSearch={(query: string) => this.getAirports(query)}
                onChange={(airports: Airport[]) => {
                  this.changeRequest("source", airports[0]);
                }}
                renderMenu={(airports, menuProps) => (
                  <Menu {...menuProps}>
                    {airports.map((airport, index) => (
                      <MenuItem option={airport} position={index} key={index}>
                        {airport.displayName} {airport.name}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="distance" className="mr-3" lg="1">
              <InputGroup>
                <Form.Control
                  type="number"
                  min="0"
                  defaultValue={this.state.request.radius}
                  onChange={(event: any) => {
                    this.changeRequest("radius", event.target.value);
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="km-addon">km</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="target" className="mr-3">
              <AsyncTypeahead
                {...this.state}
                id="target"
                labelKey={(airport: Airport) =>
                  `${airport.displayName} ${airport.name}`
                }
                placeholder="Target location"
                minLength={2}
                onSearch={(query: string) => this.getAirports(query)}
                onChange={(airports: Airport[]) => {
                  this.changeRequest("target", airports[0]);
                }}
                renderMenu={(airports, menuProps) => (
                  <Menu {...menuProps}>
                    {airports.map((airport, index) => (
                      <MenuItem option={airport} position={index} key={index}>
                        {airport.displayName} {airport.name}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="departure" className="mr-3" lg="2">
              <Form.Control
                type="date"
                defaultValue={
                  this.state.request.departureTime
                    ? this.state.request.departureTime.toDateString()
                    : undefined
                }
                onChange={(event: any) => {
                  const date: Date = new Date(event.target.value);
                  this.changeRequest(
                    "departure",
                    moment(date).format("DD.MM.YYYY")
                  );
                }}
              ></Form.Control>
            </Form.Group>
            {this.state.request.tripType === TripType.RoundTrip ? (
              <Form.Group as={Col} controlId="return" lg="2">
                <Form.Control
                  type="date"
                  defaultValue={
                    this.state.request.returnTime
                      ? this.state.request.returnTime.toDateString()
                      : undefined
                  }
                  onChange={(event: any) => {
                    const date: Date = new Date(event.target.value);
                    this.changeRequest(
                      "return",
                      moment(date).format("DD.MM.YYYY")
                    );
                  }}
                ></Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
          </Form.Row>
          <Row className="justify-content-md-center mt-3">
            <Button variant="primary" onClick={() => this.performSearch()}>
              Search
            </Button>
          </Row>
          {this.state.searching ? (
            <ProgressBar className="m-3" animated now={100} />
          ) : (
            ""
          )}
          <this.ResultFilters result={this.state.trips} />
        </Form>
        <ResultTable trips={this.state.trips} />
      </div>
    );
  }
}
