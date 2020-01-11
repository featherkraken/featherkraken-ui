import * as React from "react";

type SelectionProps = {
  className: string;
  items: string[];
};

type SelectionState = {
  selected: string;
};

export class Selection extends React.Component<SelectionProps, SelectionState> {
  constructor(props: SelectionProps) {
    super(props);
    this.state = {
      selected: this.props.items[0]
    };
  }

  render() {
    return (
      <div>
        <select
          className={this.props.className}
          value={this.state.selected}
          onChange={e =>
            this.setState({
              selected: e.target.value
            })
          }
        >
          {this.props.items.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
