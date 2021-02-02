import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DefaultLayout } from "./containers";
import { Login, Page404 } from "./pages";
import "flag-icon-css/css/flag-icon.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import "simple-line-icons/css/simple-line-icons.css";
import "./scss/style.scss";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/dashboard" name="Dashboard" component={DefaultLayout} />
          <Route
            path="/attendance"
            name="Attendance"
            component={DefaultLayout}
          />
          <Route
            path="/payroll-info"
            name="Payroll Info"
            component={DefaultLayout}
          />
          <Route path="/payslip" name="Payslip" component={DefaultLayout} />
          <Route path="/profile" name="Profile" component={DefaultLayout} />
          <Route
            path="/employee-directory"
            name="Employee Directory"
            component={DefaultLayout}
          />
          <Route
            path="/change-password"
            name="Change Password"
            component={DefaultLayout}
          />
          <Route
            path="/reimbursement"
            name="Reimbursement"
            component={DefaultLayout}
          />
          <Route path="/ticket" name="Ticket" component={DefaultLayout} />
          <Route path="/log-out" component={Login} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
