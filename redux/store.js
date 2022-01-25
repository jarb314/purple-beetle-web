import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootRecuder from "./reducers/rootReducer";

const middleware = [thunk];

const makeStore = () =>
  createStore(rootRecuder, compose(applyMiddleware(...middleware)));

export default wrapper = createWrapper(makeStore);
