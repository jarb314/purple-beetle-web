import * as t from "../types";
// import axios from "axios";
// import { request } from "../../util/request";

// export const setInfo = (name) => (dispatch) => {
//   dispatch({
//     type: t.SET_NAME,
//     payload: name
//   });
// };

export const handleOperation = (value) => (dispatch) => {
  dispatch({
    type: t.OPERATORS,
    payload: value
  });
};

export const evaluate = () => ({
  type: t.EVALUATE
});
