import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import { DefaultHeaderProfile } from "./index";
import routes from "../routes";
import { updateSidebarShow } from "../actions/sidebar";
import logo from "../assets/img/coloco-logo.png";

const DefaultHeader = (props) => {
  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(props.sidebar.sidebar)
      ? false
      : "responsive";

    props.dispatch(updateSidebarShow(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(props.sidebar.sidebar)
      ? true
      : "responsive";
    props.dispatch(updateSidebarShow(val));
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      <CHeaderBrand className="mx-auto d-lg-none" to="/dashboard">
        <img src={logo} height="48" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

      <CHeaderNav className="px-3">
        <DefaultHeaderProfile />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     _updateSidebarShow: (data) => {
//       dispatch(updateSidebarShow(data));
//     },
//   };
// };

export default connect(mapStateToProps)(DefaultHeader);
