import {
  initialize,
  handleNumbers,
  handleOperators,
  handleDecimal,
  handleEvaluate
} from "../services/calculatorService";

describe("Initialize", () => {
  test("Initialize should clear the state", () => {
    let result = initialize();
    expect(result).toStrictEqual({
      currentValue: "0",
      prevValue: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false
    });
  });
});

describe("Handle Numbers", () => {
  let state = {
    currentValue: "5",
    prevValue: "0",
    formula: "",
    currentSign: "pos",
    lastClicked: "",
    evaluated: false
  };

  test("Should add a number", () => {
    let result = handleNumbers("5", state);
    expect(result["formula"]).toBe("5");
  });
});

describe("Handle Operators", () => {
  let state = {
    currentValue: "5",
    prevValue: "0",
    formula: "5",
    currentSign: "pos",
    lastClicked: "",
    evaluated: false
  };

  test("Should add an substract operator", () => {
    let result = handleOperators("-", state);
    expect(result["formula"]).toBe("5-");
  });

  test("Should add an replace last operator", () => {
    let result = handleOperators("x", state);
    expect(result["formula"]).toBe("5x");
  });
});

describe("Handle Decilmals", () => {
  let state = {
    currentValue: "5",
    prevValue: "0",
    formula: "5",
    currentSign: "pos",
    lastClicked: "",
    evaluated: false
  };

  test("Should add a decimal point", () => {
    let result = handleDecimal(state);
    expect(result["currentValue"]).toBe("5.");
  });
});

describe("Handle Evaluate", () => {
  let state = {
    currentValue: "7",
    prevValue: "5",
    formula: "5+7",
    currentSign: "pos",
    lastClicked: "",
    evaluated: false
  };

  let result = handleEvaluate(state);

  test("Should set the currentValue to the result of the formula", () => {
    expect(result["currentValue"]).toBe("12");
    // expect(result["formula"]).toBe("5+7=12");
  });

  test("Should evaluate the current formula", () => {
    expect(result["formula"]).toBe("5+7=12");
  });
});
