import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./store/configureStore";
import { icons } from "./assets/icons";

React.icons = icons;
const store = configureStore();

require("dotenv").config();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
