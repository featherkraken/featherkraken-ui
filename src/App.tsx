import * as React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

export interface AppProps {
  compiler: string;
  framework: string;
}

export const App = (props: AppProps) => (
  <div className="App-Container">
    <h1>
      Hello from {props.compiler} and {props.framework}!
    </h1>
    <div className="App">
      <Button variant="primary">Search</Button>
      <label>
        Quak?
        <input></input>
      </label>
    </div>
  </div>
);
