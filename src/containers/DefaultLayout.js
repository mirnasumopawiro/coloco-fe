import React, { Component } from "react";
import {
  DefaultContent,
  DefaultFooter,
  DefaultHeader,
  DefaultSidebar,
} from "./index";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      redirecting: false,
      redirectUrl: window.location.pathname,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="app c-app c-default-layout">
        <DefaultSidebar />
        <div className="app-wrapper c-wrapper">
          <DefaultHeader />
          <div className="app-body c-body">
            <DefaultContent />
          </div>
          <DefaultFooter />
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
