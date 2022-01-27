import * as t from "../types";
import {
  handleEvaluate,
  handleNumbers,
  initialize,
  handleOperators,
  handleDecimal
} from "../../services/calculatorService";

const initState = {
  currentValue: "0",
  prevValue: "0",
  formula: "",
  currentSign: "pos",
  lastClicked: ""
};

const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case t.EVALUATE: {
      let result = handleEvaluate(state);
      return {
        ...state,
        ...result
      };
    }
    case t.INITIALIZE: {
      let result = initialize();
      return {
        ...state,
        ...result
      };
    }
    case t.NUMBERS: {
      let result = handleNumbers(action.payload, state);
      return {
        ...state,
        ...result
      };
    }
    case t.OPERATORS: {
      let result = handleOperators(action.payload, state);
      return {
        ...state,
        ...result
      };
    }
    case t.DECIMAL: {
      let result = handleDecimal(state);
      return {
        ...state,
        ...result
      };
    }
    default:
      return { ...state };
  }
};

export default mainReducer;
