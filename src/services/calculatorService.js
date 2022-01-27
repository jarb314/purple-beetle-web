const isOperator = /[x/+-]/,
  endsWithOperator = /[x+-/]$/,
  endsWithNegativeSign = /\d[x/+-]{1}-$/;

// TRY NOT TO USE
// const maxDigitWarning = () => {
//   return {
//     currentVal: "Digit Limit Met",
//     prevVal: this.state.currentVal
//   };
//   setTimeout(() => this.setState({ currentVal: this.state.prevVal }), 1000);
// };

export const initialize = () => {
  return {
    currentValue: "0",
    prevValue: "0",
    formula: "",
    currentSign: "pos",
    lastClicked: "",
    evaluated: false
  };
};

export const handleNumbers = (value, state) => {
  if (!state.currentValue.includes("Limit")) {
    const { currentValue, formula, evaluated } = state;
    // const value = e.target.value;
    // this.setState({ evaluated: false });
    state.evaluated = false;
    if (currentValue.length > 13) {
      // this.maxDigitWarning();
      return {
        ...state
      };
    } else if (evaluated) {
      return {
        ...state,
        currentValue: value,
        formula: value !== "0" ? value : ""
      };
    } else {
      return {
        ...state,
        currentValue:
          currentValue === "0" || isOperator.test(currentValue)
            ? value
            : currentValue + value,
        formula:
          currentValue === "0" && value === "0"
            ? formula === ""
              ? value
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value
      };
    }
  }
};

export const handleOperators = (value, state) => {
  if (!state.currentValue.includes("Limit")) {
    // const value = e.target.value;
    const { formula, prevValue, evaluated } = state;
    // this.setState({ currentVal: value, evaluated: false });
    state = {
      ...state,
      currentValue: value,
      evaluated: false
    };
    if (evaluated) {
      // console.log("evaluated");
      return {
        ...state,
        formula: prevValue + value
      };
    } else if (!endsWithOperator.test(formula)) {
      // console.log("not end wit operator");
      return {
        ...state,
        prevValue: formula,
        formula: formula + value
      };
    } else if (!endsWithNegativeSign.test(formula)) {
      // console.log("no end in negative sign");
      return {
        ...state,
        formula:
          (endsWithNegativeSign.test(formula + value) ? formula : prevValue) +
          value
      };
    } else if (value !== "‑") {
      // console.log("is no subtract sign");
      return {
        ...state,
        formula: prevValue + value
      };
    }
  }
};

export const handleDecimal = (state) => {
  if (state.evaluated === true) {
    return {
      currentValue: "0.",
      formula: "0.",
      evaluated: false
    };
  } else if (
    !state.currentValue.includes(".") &&
    !state.currentValue.includes("Limit")
  ) {
    // this.setState({ evaluated: false });
    state.evaluated = false;
    if (state.currentValue.length > 21) {
      // this.maxDigitWarning();
      return {
        ...state
      };
    } else if (
      endsWithOperator.test(state.formula) ||
      (state.currentValue === "0" && state.formula === "")
    ) {
      return {
        ...state,
        currentValue: "0.",
        formula: state.formula + "0."
      };
    } else {
      return {
        ...state,
        currentValue: state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
        formula: state.formula + "."
      };
    }
  }
};

export const handleEvaluate = (state) => {
  if (
    !state.currentValue.includes("Limit") &&
    state.formula !== "" &&
    !state.formula.includes("=")
  ) {
    // console.log(state.formula);
    let expression = state.formula;
    while (endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1);
    }
    expression = expression
      .replace(/x/g, "*")
      .replace(/‑/g, "-")
      .replace("--", "+0+0+0+0+0+0+");
    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
    return {
      currentValue: answer.toString(),
      formula:
        expression
          .replace(/\*/g, "⋅")
          .replace(/-/g, "‑")
          .replace("+0+0+0+0+0+0+", "‑-")
          .replace(/(x|\/|\+)‑/, "$1-")
          .replace(/^‑/, "-") +
        "=" +
        answer,
      prevValue: answer,
      evaluated: true
    };
  }
};
