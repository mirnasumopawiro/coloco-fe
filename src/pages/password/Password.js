import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { utils } from "../../helper";
import _ from "lodash";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import "./styles.scss";
import { statusEmployeeSuccess, changePassword } from "../../actions/employee";

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parameters: {
        id: "",
        current_password: "",
        new_password: "",
      },
      temp_password: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    let employee_profile = utils.getEmployeeProfile();
    let parameters = this.state.parameters;
    parameters.id = employee_profile.employee_id;
    this.setState({ parameters });
  }

  handleFormValidation = () => {
    if (
      this.state.parameters.current_password === "" ||
      this.state.parameters.new_password === "" ||
      this.state.temp_password === ""
    ) {
      toast.error("Please fill out all fields.");
      return false;
    }

    if (this.state.parameters.new_password !== this.state.temp_password) {
      toast.error("Passwords don't match. Try again.");
      return false;
    }

    return true;
  };

  handleInputChange = (e) => {
    let target = e.target;
    let key = target.name;
    let value = target.value;
    let parameters = this.state.parameters;

    if (e.target.name === "temp_password") {
      this.setState({ temp_password: e.target.value }, () => {
        return;
      });
    }

    parameters[key] = value;
    this.setState({ parameters });
  };

  handleSubmit = () => {
    if (this.handleFormValidation()) {
      let data = _.cloneDeep(this.state.parameters);
      this.__changePassword(data);
    }
  };

  __changePassword = (parameters) => {
    this.setState({ isLoading: true });

    this.props
      ._changePassword(parameters)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          toast.success("Password is successfully changed! 🎉");
          let parameters = this.state.parameters;
          parameters.current_password = "";
          parameters.new_password = "";

          this.setState({
            temp_password: "",
            parameters,
          });
        } else {
          toast.error("Current password is invalid. Try again.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Try again.");
      });
  };

  render() {
    return (
      <CRow className="dashboard">
        <CCol md="8">
          <ToastContainer />
          <Loading isLoading={this.state.isLoading} />
          {this.state.parameters.id === "" ? null : (
            <CCard>
              <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row style={{ marginTop: "15px" }}>
                    <CCol md="4">
                      <CLabel htmlFor="hf-password">Current Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CInput
                        type="password"
                        name="current_password"
                        onChange={this.handleInputChange}
                        value={this.state.parameters.current_password}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="hf-password">New Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CInput
                        type="password"
                        name="new_password"
                        onChange={this.handleInputChange}
                        value={this.state.parameters.new_password}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="hf-password">Confirm Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CInput
                        type="password"
                        name="temp_password"
                        onChange={this.handleInputChange}
                        value={this.state.temp_password}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="submit"
                  size="sm"
                  onClick={this.handleSubmit}
                  color="success"
                >
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>{" "}
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={(e) => (window.location.href = "/dashboard")}
                >
                  <CIcon name="cil-ban" /> Cancel
                </CButton>
              </CCardFooter>
            </CCard>
          )}
        </CCol>
      </CRow>
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
    _changePassword: (parameters) => {
      return changePassword(parameters);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Password);
