import logo from "./logo.svg";
import "./App.scss";
import React from "react";

const isOperator = /[x/+-]/,
  endsWithOperator = /[x+-/]$/,
  endsWithNegativeSign = /\d[x/+-]{1}-$/,
  NUMBER = "NUMBER",
  DECIMAL = "DECIMAL",
  INITIALIZE = "INITIALIZE",
  OPERATOR = "OPERATOR",
  CALCULATE = "CALCULATE",
  buttons = [
    // {
    //   symbol: "C",
    //   id: "clear",
    //   cols: 9,
    //   type: "function-button primary",
    //   action: this.reset
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

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`col-${this.props.cols}`}>
        <button
          id={this.props.buttonId}
          className={"calc-button " + this.props.type}
          onClick={this.props.action}
          value={this.props.symbol}
        >
          {this.props.symbol}
        </button>
      </div>
    );
  }
}

class Numpad extends React.Component {
  constructor(props) {
    super(props);
    this.asignAction = this.asignAction.bind(this);
  }

  asignAction(action) {
    switch (action) {
      case NUMBER:
        return this.props.numbers;
        break;
      case DECIMAL:
        return this.props.decimal;
        break;
      case OPERATOR:
        return this.props.operators;
        break;
      case CALCULATE:
        return this.props.evaluate;
        break;
        defaul: return null;
    }
  }

  render() {
    return (
      <div id="numpad">
        <div className="row g-2">
          <div className="col-9">
            <button
              id="clear"
              className={"calc-button function-button primary"}
              onClick={this.props.initialize}
              value="AC"
            >
              AC
            </button>
          </div>
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

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="display-container">
        <p id="equation">{this.props.formula != "" ? this.props.formula : 0}</p>
        <h1 id="display">{this.props.currentValue}</h1>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      prevVal: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: ""
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }

  maxDigitWarning() {
    this.setState({
      currentVal: "Digit Limit Met",
      prevVal: this.state.currentVal
    });
    setTimeout(() => this.setState({ currentVal: this.state.prevVal }), 1000);
  }

  handleEvaluate() {
    if (!this.state.currentVal.includes("Limit")) {
      let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, "*")
        .replace(/‑/g, "-")
        .replace("--", "+0+0+0+0+0+0+");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentVal: answer.toString(),
        formula:
          expression
            .replace(/\*/g, "⋅")
            .replace(/-/g, "‑")
            .replace("+0+0+0+0+0+0+", "‑-")
            .replace(/(x|\/|\+)‑/, "$1-")
            .replace(/^‑/, "-") +
          "=" +
          answer,
        prevVal: answer,
        evaluated: true
      });
    }
  }

  handleOperators(e) {
    if (!this.state.currentVal.includes("Limit")) {
      const value = e.target.value;
      const { formula, prevVal, evaluated } = this.state;
      this.setState({ currentVal: value, evaluated: false });
      if (evaluated) {
        console.log("evaluated");
        this.setState({ formula: prevVal + value });
      } else if (!endsWithOperator.test(formula)) {
        console.log("not end wit operator");
        this.setState({
          prevVal: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeSign.test(formula)) {
        console.log("no end in negative sign");
        this.setState({
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
            value
        });
      } else if (value !== "‑") {
        console.log("is no subtract sign");
        this.setState({
          formula: prevVal + value
        });
      }
    }
  }

  handleNumbers(e) {
    if (!this.state.currentVal.includes("Limit")) {
      const { currentVal, formula, evaluated } = this.state;
      const value = e.target.value;
      this.setState({ evaluated: false });
      if (currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({
          currentVal: value,
          formula: value !== "0" ? value : ""
        });
      } else {
        this.setState({
          currentVal:
            currentVal === "0" || isOperator.test(currentVal)
              ? value
              : currentVal + value,
          formula:
            currentVal === "0" && value === "0"
              ? formula === ""
                ? value
                : formula
              : /([^.0-9]0|^0)$/.test(formula)
              ? formula.slice(0, -1) + value
              : formula + value
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: "0.",
        formula: "0.",
        evaluated: false
      });
    } else if (
      !this.state.currentVal.includes(".") &&
      !this.state.currentVal.includes("Limit")
    ) {
      this.setState({ evaluated: false });
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currentVal === "0" && this.state.formula === "")
      ) {
        this.setState({
          currentVal: "0.",
          formula: this.state.formula + "0."
        });
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: this.state.formula + "."
        });
      }
    }
  }

  initialize() {
    this.setState({
      currentVal: "0",
      prevVal: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false
    });
  }

  render() {
    return (
      <div>
        <div id="calc-container">
          <Display
            currentValue={this.state.currentVal}
            formula={this.state.formula.replace(/x/g, "⋅")}
          />
          <Numpad
            decimal={this.handleDecimal}
            evaluate={this.handleEvaluate}
            initialize={this.initialize}
            numbers={this.handleNumbers}
            operators={this.handleOperators}
          />
        </div>
        <p id="firm">by JArBis</p>
      </div>
    );
  }
}

export default App;
