import React, { Component } from "react";
import {
  CInputGroup,
  CInputGroupAppend,
  CButton,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CCol,
  CRow,
  CImg,
} from "@coreui/react";
import { utils } from "../../helper";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import _ from "lodash";
import "./styles.scss";
import icon from "../../assets/img/default-icon.jpg";
import {
  getEmployeeDirectory,
  statusEmployeeSuccess,
} from "../../actions/employee";
import { getFormOptions } from "../../actions/form";

class EmployeeDirectory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee_profile: null,
      employeeList: null,
      jobList: null,
      departmentList: null,
      parameters: {
        name: "",
        company_id: "",
      },
    };
  }

  componentDidMount() {
    let parameters = this.state.parameters;
    let employee_profile = this.state.employee_profile;
    employee_profile = utils.getEmployeeProfile();
    this.setState({ employee_profile }, () => {
      parameters.company_id = employee_profile.company_id;
      this.setState({ parameters });
      this.__getEmployeeDirectory();
      this.__getFormOptions();
    });
  }

  __getFormOptions = () => {
    this.setState({ isLoading: true });

    this.props
      ._getFormOptions(this.state.employee_profile.company_id)
      .then((res) => {
        this.props._statusEmployeeSuccess(res);
        this.setState({
          isLoading: false,
          jobList: res.jobList,
          departmentList: res.departmentList,
        });
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  handleInputChange = (e) => {
    let target = e.target;
    let key = target.name;
    let value = target.value;
    let parameters = this.state.parameters;

    parameters[key] = value;

    this.setState({ parameters });
  };

  __getEmployeeDirectory = () => {
    let data = _.cloneDeep(this.state.parameters);
    this.setState({ isLoading: true });

    this.props
      ._getEmployeeDirectory(data)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          if (res.employee_list.length === 0) {
            this.setState({ employeeList: [] });
          } else {
            this.setState({ employeeList: res.employee_list });
          }
        } else {
          toast.error("Oops! Server Error. Refresh page.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Loading isLoading={this.state.isLoading} />
        {this.state.employeeList === null ||
        this.state.departmentList === null ||
        this.state.jobList === null ? null : (
          <CRow className="employee-directory">
            <CCol md="12">
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol md="5">
                      <CFormGroup>
                        <CInputGroup>
                          <CInput
                            id="appendedInputButton"
                            style={{ width: "20%" }}
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.parameters.name}
                            name="name"
                          />
                          <CInputGroupAppend>
                            <CButton
                              color="secondary"
                              onClick={this.__getEmployeeDirectory}
                            >
                              Search
                            </CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    {this.state.employeeList.length === 0 ? (
                      <p style={{ marginLeft: "17px" }}>No result found.</p>
                    ) : (
                      <React.Fragment>
                        {this.state.employeeList.map((e, _) => {
                          return (
                            <CCol md="4" key={e.id}>
                              <div className="container">
                                <div
                                  className="child"
                                  style={{
                                    textAlign: "center",
                                    display: "grid",
                                  }}
                                >
                                  <div
                                    className="c-avatar"
                                    style={{
                                      width: "70px",
                                      margin: "0 auto 5px",
                                    }}
                                  >
                                    <CImg
                                      src={
                                        e.profile_picture_url === null
                                          ? icon
                                          : e.profile_picture_url
                                      }
                                      className="c-avatar-img"
                                      alt="admin@bootstrapmaster.com"
                                    />
                                  </div>
                                  <br />
                                  <b>
                                    {e.first_name} {e.last_name}
                                  </b>
                                  {e.id}
                                  <br />
                                  {this.state.jobList[e.job_id]}
                                  <br />
                                  {this.state.departmentList[e.department_id]}
                                  <br />
                                  {e.email}
                                </div>
                              </div>
                            </CCol>
                          );
                        })}
                      </React.Fragment>
                    )}
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}
      </React.Fragment>
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
    _getEmployeeDirectory: (parameters) => {
      return getEmployeeDirectory(parameters);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
  };
};

export default connect(
  mapDispatchToProps,
  mapDispatchToProps
)(EmployeeDirectory);
