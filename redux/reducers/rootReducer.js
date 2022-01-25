import { combineReducers } from "redux";
import main from "./main";

const rootRecuder = combineReducers({
  main: main,
});

export default rootRecuder;
