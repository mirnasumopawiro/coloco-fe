import { combineReducers } from "redux";
import app from "./app";
import employee from "./employee";
import sidebar from "./sidebar";
import form from "./form";

const rootReducer = combineReducers({
  app,
  employee,
  sidebar,
  form,
});

export default rootReducer;
