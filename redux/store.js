import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import todoReducer from "./slice/todoSlice";
import weatherReducer from "./slice/weatherSlice";
import { antDTableReducer } from "./slice/userDataSlice";

const rootReducer = combineReducers({
  todo: todoReducer,
  weather: weatherReducer,
  user:antDTableReducer,
});

const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
export default reduxStore;
