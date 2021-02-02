import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

export default class DefaultRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      type: null,
      component: null,
      path: null,
    };
  }

  componentDidMount() {
    this.checkToken();
  }

  checkToken = () => {
    let token = localStorage.getItem("token");
    let isAuth = !_.isEmpty(token);
    this.setState({
      isAuth,
      type: this.props.type,
      component: this.props.component,
      path: this.props.path,
    });
  };

  render() {
    if (
      (this.state.isAuth && this.state.type === "private") ||
      (!this.state.isAuth && this.state.type === "public")
    ) {
      return <Route path={this.state.path} component={this.state.component} />;
    } else if (this.state.isAuth && this.state.type === "public") {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
          }}
        />
      );
    } else if (!this.state.isAuth && this.state.type === "private") {
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }

    return null;
  }
}
