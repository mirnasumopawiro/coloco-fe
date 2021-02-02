import React, { Component } from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import { updateSidebarShow } from "../actions/sidebar";

import logo from "../assets/img/coloco-logo.png";
import navigation from "./_nav";

class DefaultSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_details: null,
    };
  }

  componentDidMount() {
    let company_details = this.state.company_details;
    let company_details_temp = localStorage.getItem("company_details");
    company_details = JSON.parse(company_details_temp);
    this.setState({ company_details });
  }

  render() {
    return (
      <CSidebar
        show={this.props.sidebar.sidebar}
        onShowChange={(val) => this.props.dispatch(updateSidebarShow(val))}
      >
        {this.state.company_details == null ? null : (
          <React.Fragment>
            <CSidebarBrand className="d-md-down-none" to="/">
              <img
                style={{ margin: "10px" }}
                className="c-sidebar-brand-full"
                name="logo-negative"
                height={50}
                src={this.state.company_details.icon_url}
              />

              <img
                className="c-sidebar-brand-minimized"
                name="sygnet"
                height={20}
                src={this.state.company_details.icon_url}
              />
            </CSidebarBrand>
            <CSidebarNav>
              <CCreateElement
                items={navigation}
                components={{
                  CSidebarNavDivider,
                  CSidebarNavDropdown,
                  CSidebarNavItem,
                  CSidebarNavTitle,
                }}
              />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
          </React.Fragment>
        )}
      </CSidebar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
  };
};

export default connect(mapStateToProps)(DefaultSidebar);
