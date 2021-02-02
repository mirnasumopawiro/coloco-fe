import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { Alert } from "reactstrap";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import "./Login.scss";
import logo from "../../assets/img/coloco-logo.png";
import { login, statusEmployeeSuccess } from "../../actions/employee";
import { Loading } from "../../components";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameters: {
        email: "",
        password: "",
      },
      errorMessage: "",
      isLoading: false,
      redirecting: false,
      redirectUrl: "/login",
    };
  }

  handleInputChange = (e) => {
    let target = e.target;
    let key = target.name;
    let value = target.value;
    let parameters = this.state.parameters;

    parameters[key] = value;

    this.setState({ parameters });
  };

  handleFormValidation = (target, value) => {
    let errorMessage = this.state.errorMessage;
    let requiredMessage = "Please fill out all fields.";
    let content = null;

    if (_.isEmpty(value)) {
      content = requiredMessage;
    }

    errorMessage = content;
    this.setState({ errorMessage });
  };

  handleLoginClick = () => {
    _.forEach(this.state.parameters, (value, key) => {
      this.handleFormValidation(key, value);
    });

    if (
      this.state.parameters.email !== "" &&
      this.state.parameters.password !== ""
    ) {
      let data = _.cloneDeep(this.state.parameters);
      this.__login(data);
    }
  };

  __login = (parameters) => {
    this.setState({ isLoading: true });
    let errorMessage = this.state.errorMessage;

    this.props
      ._login(parameters)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.access_token);
          localStorage.setItem(
            "company_details",
            JSON.stringify(res.data.company_details)
          );
          localStorage.setItem(
            "employee_profile",
            JSON.stringify(res.data.employee_profile)
          );
          this.setState({ redirecting: true, redirectUrl: "/dashboard" });
        } else if (res.status === 401) {
          errorMessage =
            "Oops! Invalid Request — Make sure your username and password are correct.";
          this.setState({ errorMessage });
        }
      })
      .catch((err) => {
        errorMessage =
          "Oops! Invalid Request — Make sure your username and password are correct.";
        this.setState({ isLoading: false, errorMessage });
      });
  };

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center login">
        {this.state.redirecting ? (
          <Redirect to={this.state.redirectUrl} />
        ) : null}
        <CContainer style={{ margin: "auto" }}>
          <CRow className="justify-content-center">
            <CCol md="5">
              <div className="coloco-logo-container">
                <img src={logo} alt="COLOCO Logo" />
              </div>
              {this.state.isInvalidRequest ||
              !_.isEmpty(this.state.errorMessage) ? (
                <Alert color="danger">
                  {window.scrollTo(0, 0)}
                  {this.state.errorMessage}
                </Alert>
              ) : null}
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <i className="icon-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          name="email"
                          type="text"
                          placeholder="E-mail"
                          autoComplete="email"
                          value={this.state.parameters.email}
                          onChange={this.handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <i className="icon-lock" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.parameters.password}
                          onChange={this.handleInputChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="12">
                          <CButton
                            color="primary"
                            className="px-4"
                            block
                            onClick={this.handleLoginClick}
                          >
                            <b>LOGIN</b>
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        <Loading show={this.state.isLoading} />
      </div>
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
    _login: (parameters) => {
      return login(parameters);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Login);
