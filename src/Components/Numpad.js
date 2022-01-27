import React from "react";
import Button from "./Button";
import { evaluate } from "../redux/actions/main";
import { connect } from "react-redux";
import * as t from "../redux/types";

const NUMBER = "NUMBER",
  DECIMAL = "DECIMAL",
  INITIALIZE = "INITIALIZE",
  OPERATOR = "OPERATOR",
  CALCULATE = "CALCULATE",
  buttons = [
    {
      symbol: "AC",
      id: "clear",
      cols: 9,
      type: "function-button",
      action: INITIALIZE
    },
    // {
    //   symbol: "-/+",
    //   id: "divide",
    //   cols: 3,
    //   type: "function-button",
    //   action: OPERATOR
    // },
    {
      symbol: "/",
      id: "divide",
      cols: 3,
      type: "function-button",
      action: OPERATOR
    },
    {
      symbol: "7",
      id: "seven",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "8",
      id: "eight",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "9",
      id: "nine",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "x",
      id: "multiply",
      cols: 3,
      type: "function-button",
      action: OPERATOR
    },
    {
      symbol: "4",
      id: "four",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "5",
      id: "five",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "6",
      id: "six",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "-",
      id: "subtract",
      cols: 3,
      type: "function-button",
      action: OPERATOR
    },
    {
      symbol: "1",
      id: "one",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "2",
      id: "two",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "3",
      id: "three",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: "+",
      id: "add",
      cols: 3,
      type: "function-button",
      action: OPERATOR
    },
    {
      symbol: "0",
      id: "zero",
      cols: 3,
      type: "num-button",
      action: NUMBER
    },
    {
      symbol: ".",
      id: "decimal",
      cols: 3,
      type: "num-button",
      action: DECIMAL
    },
    {
      symbol: "=",
      id: "equals",
      cols: 6,
      type: "function-button primary",
      action: CALCULATE
    }
  ];

class Numpad extends React.Component {
  constructor(props) {
    super(props);
    this.asignAction = this.asignAction.bind(this);
  }

  asignAction(action) {
    switch (action) {
      case INITIALIZE:
        return this.props.initialize;
      case NUMBER:
        return this.props.numbers;
      // break;
      case DECIMAL:
        return this.props.decimal;
      // break;
      case OPERATOR:
        return this.props.operators;
      // break;
      case CALCULATE:
        return this.props.evaluate;
      // break;
      // no default
    }
  }

  render() {
    return (
      <div id="numpad">
        <div className="row g-2">
          {/* <div className="col-9">
            <button
              id="clear"
              className={"calc-button function-button"}
              onClick={this.props.initialize}
              value="AC"
            >
              AC
            </button>
          </div> */}
          {buttons.map((btn, i) => {
            return (
              <Button
                key={i}
                buttonId={btn.id}
                symbol={btn.symbol}
                cols={btn.cols}
                type={btn.type}
                action={this.asignAction(btn.action)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    evaluate: () => {
      dispatch({ type: t.EVALUATE });
    },
    numbers: (value) => {
      dispatch({ type: t.NUMBERS, payload: value.target.value });
    },
    operators: (value) => {
      dispatch({ type: t.OPERATORS, payload: value.target.value });
    },
    initialize: () => {
      dispatch({ type: t.INITIALIZE });
    },
    decimal: () => {
      dispatch({ type: t.DECIMAL });
    }
  };
};

export default connect(null, mapDispatchToProps)(Numpad);
