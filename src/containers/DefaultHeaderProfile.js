import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, toast } from "react-toastify";
import { Component } from "react";
import { logout, statusEmployeeSuccess } from "../actions/employee";
import { Loading } from "../components";

class DefaultHeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee_profile: null,
      isLoading: false,
      redirecting: false,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    let employee_profile_temp = localStorage.getItem("employee_profile");
    employee_profile = JSON.parse(employee_profile_temp);
    this.setState({ employee_profile });
  }

  logout = () => {
    this.setState({ isLoading: true });
    let errorMessage = this.state.errorMessage;

    this.props
      ._logout()
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("employee_profile");
          localStorage.removeItem("company_details");
          this.setState({
            redirecting: true,
          });
        } else {
          toast.error("Log out failed. Try again.");
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        errorMessage = "Oops! Server Error. Refresh page.";
        this.setState({ errorMessage });
      });
  };

  render() {
    return (
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        {this.state.redirecting ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : null}
        <ToastContainer />
        <Loading isLoading={this.state.isLoading} />
        {this.state.employee_profile == null ? null : (
          <React.Fragment>
            <CDropdownToggle className="c-header-nav-link" caret={false}>
              <div className="c-avatar">
                <CImg
                  src={this.state.employee_profile.profile_picture_url}
                  className="c-avatar-img"
                  alt={this.state.employee_profile.email}
                />
              </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                header
                tag="div"
                color="light"
                className="text-center"
              >
                <strong>Settings </strong>
              </CDropdownItem>
              <CDropdownItem href="/change-password">
                <CIcon name="cil-lock-locked" className="mfe-2" />
                Password
              </CDropdownItem>
              <CDropdownItem onClick={this.logout}>
                <CIcon name="cil-room" className="mfe-2" />
                Log Out
              </CDropdownItem>
            </CDropdownMenu>
          </React.Fragment>
        )}
      </CDropdown>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employee: state.employee.employee,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _statusEmployeeSuccess: (data) => {
      dispatch(statusEmployeeSuccess(data));
    },
    _logout: () => {
      return logout();
    },
  };
};

export default connect(
  mapDispatchToProps,
  mapDispatchToProps
)(DefaultHeaderProfile);
