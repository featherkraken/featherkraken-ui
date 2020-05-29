import axios from "axios";
import moment from "moment";
import * as React from "react";
import { Button, Col, Dropdown, DropdownButton, Form, InputGroup, Navbar, ProgressBar, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { AsyncTypeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { FaCalendar as Calendar, FaCalendarWeek as CalendarSpan } from "react-icons/fa";
import "./App.css";
import { ResultTable } from "./components/ResultTable";
import { Airport } from "./objects/Airport";
import { ClassType } from "./objects/ClassType";
import { SearchRequest } from "./objects/SearchRequest";
import { SearchResult } from "./objects/SearchResult";
import { Timespan } from "./objects/Timespan";
import { TripType } from "./objects/TripType";

const apiUrl: string = "http://localhost:8080/featherkraken/rest";

export interface AppState {
  request: SearchRequest;
  searching: boolean;
  result?: SearchResult;
  allowNew: boolean;
  isLoading: boolean;
  multiple: boolean;
  options: Airport[];
  departureFlexible: boolean;
  departureFocused: boolean | null;
  departureSpanFocused: "startDate" | "endDate" | null;
  returnFlexible: boolean;
  returnFocused: boolean | null;
  returnSpanFocused: "startDate" | "endDate" | null;
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
    options: [],
    departureFlexible: false,
    departureFocused: false,
    departureSpanFocused: null,
    returnFlexible: false,
    returnFocused: false,
    returnSpanFocused: null,
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
      .then((result) => {
        this.setState({ result: result.data });
        this.setState({ searching: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ searching: false });
      });
  }

  getAirports(value: string) {
    axios
      .get(`${apiUrl}/airports?query=${value}`)
      .then((result) => {
        this.setState({ options: result.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getPassengerTitle(): string {
    if (!this.state.request.passengers) {
      return "Passengers";
    }
    const passengers: number = +this.state.request.passengers;
    return `${passengers} Passenger${passengers === 1 ? "" : "s"}`;
  }

  getStopTitle(): string {
    if (!this.state.request.stops) {
      return "Filter stops";
    }
    const stops: number = +this.state.request.stops;
    if (stops === 0) {
      return "Non-stop";
    }
    if (stops === 1) {
      return "1 Stop";
    }
    return `${stops} Stops`;
  }

  dateToMoment(date: string | undefined): moment.Moment {
    return date ? moment(date, "DD.MM.YYYY") : moment(new Date());
  }

  initReturnDate() {
    const departure = this.dateToMoment(this.state.request.departure?.from);
    let returnDate = this.dateToMoment(this.state.request.return?.from);

    if (departure.isAfter(returnDate)) {
      this.changeRequest("return", this.state.request.departure);
    }
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
          <Row className="ml-3">
            <DropdownButton
              variant="outline"
              id="tripType"
              title={this.state.request.tripType}
              className="mr-1"
              onSelect={(eventKey: any) => {
                this.changeRequest("tripType", eventKey);
              }}
            >
              {tripTypes.map((name) => {
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
              title={this.getPassengerTitle()}
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
              {classTypes.map((name) => {
                return (
                  <Dropdown.Item key={classTypes.indexOf(name)} eventKey={name}>
                    {name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <DropdownButton
              variant="outline"
              id="stops"
              title={this.getStopTitle()}
              className="mr-1"
            >
              <Form.Control
                type="number"
                min="0"
                defaultValue="0"
                onChange={(event: any) => {
                  this.changeRequest("stops", event.target.value);
                }}
              />
            </DropdownButton>
            <DropdownButton
              variant="outline"
              id="stops"
              title={`${this.state.request.limit} Results`}
              className="mr-1"
            >
              <Form.Control
                type="number"
                min="0"
                max="1000"
                step={25}
                defaultValue={this.state.request.limit}
                onChange={(event: any) => {
                  this.changeRequest("limit", event.target.value);
                }}
              />
            </DropdownButton>
          </Row>
          <Row className="mt-3 ml-3 mr-3">
            <Form.Group as={Col} controlId="source">
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
            <Form.Group as={Col} controlId="distance" lg="2">
              <InputGroup>
                <Form.Control
                  type="number"
                  min="0"
                  step={100}
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
            <Form.Group as={Col} controlId="target">
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
            <Form.Group
              as={Col}
              controlId="departure"
              className="mr-3 border rounded"
              lg="2"
            >
              <ToggleButtonGroup
                type="checkbox"
                onChange={(event: any) => {
                  this.setState({
                    departureFlexible: event.indexOf("departureFlexible") > -1,
                  });
                }}
              >
                <ToggleButton
                  variant="light"
                  type="checkbox"
                  value="departureFlexible"
                >
                  {this.state.departureFlexible ? (
                    <Calendar title="Exact date" />
                  ) : (
                    <CalendarSpan title="Flexible date" />
                  )}
                </ToggleButton>
              </ToggleButtonGroup>
              {this.state.departureFlexible ? (
                <DateRangePicker
                  startDate={this.dateToMoment(
                    this.state.request?.departure?.from
                  )}
                  startDateId="departureFrom"
                  endDate={this.dateToMoment(this.state.request?.departure?.to)}
                  endDateId="departureTo"
                  onDatesChange={({ startDate, endDate }) => {
                    const departure: Timespan = {
                      from: startDate?.format("DD.MM.YYYY"),
                      to: endDate?.format("DD.MM.YYYY"),
                    };
                    this.changeRequest("departure", departure);
                  }}
                  focusedInput={this.state.departureSpanFocused}
                  onFocusChange={(focused) =>
                    this.setState({ departureSpanFocused: focused })
                  }
                  displayFormat="DD.MM.YYYY"
                  noBorder={true}
                ></DateRangePicker>
              ) : (
                <SingleDatePicker
                  id="departure"
                  date={this.dateToMoment(this.state.request?.departure?.from)}
                  focused={this.state.departureFocused}
                  onFocusChange={(focused) =>
                    this.setState({ departureFocused: focused.focused })
                  }
                  onDateChange={(date) => {
                    const departure: Timespan = {
                      from: date?.format("DD.MM.YYYY"),
                    };
                    this.changeRequest("departure", departure);
                  }}
                  displayFormat="DD.MM.YYYY"
                  noBorder={true}
                ></SingleDatePicker>
              )}
            </Form.Group>
            {this.state.request.tripType === TripType.RoundTrip ? (
              <Form.Group
                as={Col}
                controlId="return"
                lg="2"
                className="mr-3 border rounded"
              >
                <ToggleButtonGroup
                  type="checkbox"
                  onChange={(event: any) => {
                    this.setState({
                      returnFlexible: event.indexOf("returnFlexible") > -1,
                    });
                  }}
                >
                  <ToggleButton
                    variant="light"
                    type="checkbox"
                    value="returnFlexible"
                  >
                    {this.state.returnFlexible ? (
                      <Calendar title="Exact date" />
                    ) : (
                      <CalendarSpan title="Flexible date" />
                    )}
                  </ToggleButton>
                </ToggleButtonGroup>
                {this.state.returnFlexible ? (
                  <DateRangePicker
                    startDate={this.dateToMoment(
                      this.state.request?.return?.from
                    )}
                    startDateId="returnFrom"
                    endDate={this.dateToMoment(this.state.request?.return?.to)}
                    endDateId="returnTo"
                    onDatesChange={({ startDate, endDate }) => {
                      const returnTime: Timespan = {
                        from: startDate?.format("DD.MM.YYYY"),
                        to: endDate?.format("DD.MM.YYYY"),
                      };
                      this.changeRequest("return", returnTime);
                    }}
                    focusedInput={this.state.returnSpanFocused}
                    onFocusChange={(focused) => {
                      if (focused) {
                        this.initReturnDate();
                      }
                      this.setState({ returnSpanFocused: focused });
                    }}
                    displayFormat="DD.MM.YYYY"
                    noBorder={true}
                  ></DateRangePicker>
                ) : (
                  <SingleDatePicker
                    id="return"
                    date={this.dateToMoment(this.state.request?.return?.from)}
                    focused={this.state.returnFocused}
                    onFocusChange={(focused) => {
                      if (focused.focused) {
                        this.initReturnDate();
                      }
                      this.setState({ returnFocused: focused.focused });
                    }}
                    onDateChange={(date) => {
                      const returnTime: Timespan = {
                        from: date?.format("DD.MM.YYYY"),
                      };
                      this.changeRequest("return", returnTime);
                    }}
                    displayFormat="DD.MM.YYYY"
                    noBorder={true}
                  ></SingleDatePicker>
                )}
              </Form.Group>
            ) : (
              ""
            )}
          </Row>
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
          {this.state.result?.sourceAirports &&
          this.state.result.sourceAirports.length > 1 ? (
            <DropdownButton
              variant="outline"
              id="sourceAirports"
              title="Found airports"
              className="ml-3"
            >
              {this.state.result.sourceAirports?.map((airport, index) => {
                return (
                  <Dropdown.Item eventKey={airport.name} key={index}>
                    {airport.displayName} {airport.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          ) : (
            ""
          )}
        </Form>
        <ResultTable trips={this.state.result?.trips} />
      </div>
    );
  }
}
