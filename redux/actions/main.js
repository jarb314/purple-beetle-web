import * as t from "../types";
import axios from "axios";
import request from "../../util/request";

export const setInfo = (name) => (distpatch) => {
  distpatch({
    type: t.SET_NAME,
    payload: name,
  });
};
