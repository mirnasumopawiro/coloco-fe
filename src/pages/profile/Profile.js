import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import moment from "moment";
import _ from "lodash";
import validation from "../../helper/validation";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import { utils } from "../../helper";
import "./styles.scss";
import {
  getProfile,
  requestEditProfile,
  statusEmployeeSuccess,
} from "../../actions/employee";
import { getFormOptions } from "../../actions/form";
import HTMLReactParser from "html-react-parser";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee_profile: null,
      jobList: null,
      departmentList: null,
      isEdit: false,
      profile: {
        first_name: "",
        last_name: "",
        phone_number: "",
        place_of_birth: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        religion: "",
        current_address: "",
        identity_type: "",
        identity_number: "",
        identity_exp_date: "",
        identity_address: "",
      },
      employment_details: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    employee_profile = utils.getEmployeeProfile();

    this.setState({ employee_profile }, () => {
      this.__getProfile(employee_profile.employee_id);
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

  __getProfile = (id) => {
    this.setState({ isLoading: true });

    this.props
      ._getProfile(id)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          this.setState({
            profile: res.data.employee_profile,
            employment_details: res.data.employment_details,
          });
        } else {
          toast.error("Oops! Server Error. Refresh page.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  handleInputChange = (e) => {
    let target = e.target;
    let key = target.name;
    let value = target.value;
    let profile = this.state.profile;

    profile[key] = value;

    this.setState({ profile });
  };

  handleRequestEdit = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleFormValidation = () => {
    if (
      this.state.profile.first_name === "" ||
      this.state.profile.last_name === "" ||
      this.state.profile.phone_number === "" ||
      this.state.profile.place_of_birth === "" ||
      this.state.profile.date_of_birth === "" ||
      this.state.profile.gender === "" ||
      this.state.profile.marital_status === "" ||
      this.state.profile.religion === "" ||
      this.state.profile.current_address === "" ||
      this.state.profile.identity_type === "" ||
      this.state.profile.identity_number === "" ||
      this.state.profile.identity_exp_date === "" ||
      this.state.profile.identity_address === ""
    ) {
      toast.error("Please fill out all fields.");
      return false;
    }

    return true;
  };

  handleSubmit = () => {
    if (this.handleFormValidation()) {
      let data = _.cloneDeep(this.state.profile);
      this.__requestEditProfile(data);
    }
  };

  __requestEditProfile = (parameters) => {
    this.setState({ isLoading: true });

    this.props
      ._requestEditProfile(parameters)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          toast.success(
            "Request for Edit Profile has been sent. \nChanges will take effect upon approval."
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Oops! Server Error. Try again.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Try again.");
      });
  };

  render() {
    return (
      <React.Fragment className="profile">
        <ToastContainer />
        <Loading isLoading={this.state.isLoading} />
        {this.state.data === null ||
        this.state.jobList === null ||
        this.state.departmentList === null ? null : (
          <CRow>
            {this.state.isEdit ? (
              <CCol xs="12" md="6">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol md="10" style={{ alignItems: "center" }}>
                        Personal Details
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CForm
                      action=""
                      method="post"
                      encType="multipart/form-data"
                      className="form-horizontal"
                    >
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Employee ID</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="text-input"
                            value={this.state.profile.employee_id}
                            name="employee_id"
                            placeholder="Text"
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Full Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            onChange={this.handleInputChange}
                            value={this.state.profile.first_name}
                            name="first_name"
                          />
                        </CCol>
                        <CCol xs="12" md="5">
                          <CInput
                            id="last-name"
                            onChange={this.handleInputChange}
                            value={this.state.profile.last_name}
                            name="last_name"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Phone Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            onChange={this.handleInputChange}
                            value={this.state.profile.phone_number}
                            name="phone_number"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Place of Birth</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            onChange={this.handleInputChange}
                            value={this.state.profile.place_of_birth}
                            name="place_of_birth"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="date-input">Date of Birth</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="date"
                            id="date-input"
                            onChange={this.handleInputChange}
                            value={moment(
                              this.state.profile.date_of_birth
                            ).format("YYYY-MM-DD")}
                            name="date_of_birth"
                            placeholder="date"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Gender</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            onChange={this.handleInputChange}
                            value={this.state.profile.gender}
                            name="gender"
                            id="select"
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Marital Status</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            onChange={this.handleInputChange}
                            value={this.state.profile.marital_status}
                            name="marital_status"
                            id="select"
                          >
                            <option value="0">Please select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Religion</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            onChange={this.handleInputChange}
                            value={this.state.profile.religion}
                            name="religion"
                            id="select"
                          >
                            <option value="Catholic">Catholic</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Christian">Christian</option>
                            <option value="Buddhist">Buddhist</option>
                            <option value="Konghucu">Konghucuu</option>
                            <option value="Hindu">Hindu</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="textarea-input">
                            Current Address
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            id="textarea-input"
                            onChange={this.handleInputChange}
                            value={this.state.profile.current_address}
                            name="current_address"
                            rows="3"
                          />
                        </CCol>
                      </CFormGroup>
                      <hr />
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Identity Type</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            onChange={this.handleInputChange}
                            value={this.state.profile.identity_type}
                            name="identity_type"
                            id="select"
                          >
                            <option value="KTP">KTP</option>
                            <option value="SIM">SIM</option>
                            <option value="Passport">Passport</option>
                            <option value="KITAS">KITAS</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Identity Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="citizen-id"
                            placeholder="Identity Number"
                            onChange={this.handleInputChange}
                            value={this.state.profile.identity_number}
                            name="identity_number"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">
                            Identity Expiration Date
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="date"
                            id="expired_date_citizen_id"
                            placeholder="Expiry Date"
                            onChange={this.handleInputChange}
                            name="identity_exp_date"
                            value={moment(
                              this.state.profile.identity_exp_date
                            ).format("YYYY-MM-DD")}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="textarea-input">
                            Identity Address
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            name="identity_address"
                            id="textarea-input"
                            onChange={this.handleInputChange}
                            value={this.state.profile.identity_address}
                            rows="3"
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
                      onClick={this.handleRequestEdit}
                    >
                      <CIcon name="cil-ban" /> Cancel
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            ) : (
              <CCol xs="12" md="6">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol md="10" style={{ alignItems: "center" }}>
                        Personal Details
                      </CCol>
                      <CCol
                        md="2"
                        onClick={this.handleRequestEdit}
                        style={{ color: "grey", textAlign: "right" }}
                      >
                        Edit
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CForm
                      action=""
                      method="post"
                      encType="multipart/form-data"
                      className="form-horizontal"
                    >
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="text-input">Employee ID</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="text-input"
                            value={this.state.profile.employee_id}
                            name="employee_id"
                            placeholder="Text"
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Full Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            onChange={this.handleInputChange}
                            value={this.state.profile.first_name}
                            name="first_name"
                            disabled
                          />
                        </CCol>
                        <CCol xs="12" md="5">
                          <CInput
                            id="last-name"
                            onChange={this.handleInputChange}
                            value={this.state.profile.last_name}
                            name="last_name"
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Phone Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            onChange={this.handleInputChange}
                            value={this.state.profile.phone_number}
                            name="phone_number"
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Place of Birth</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            onChange={this.handleInputChange}
                            value={this.state.profile.place_of_birth}
                            name="place_of_birth"
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="date-input">Date of Birth</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="date"
                            id="date-input"
                            onChange={this.handleInputChange}
                            value={moment(
                              this.state.profile.date_of_birth
                            ).format("YYYY-MM-DD")}
                            name="date_of_birth"
                            placeholder="date"
                            disabled
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Gender</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            onChange={this.handleInputChange}
                            value={this.state.profile.gender}
                            name="gender"
                            id="select"
                            disabled
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Marital Status</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            onChange={this.handleInputChange}
                            value={this.state.profile.marital_status}
                            name="marital_status"
                            id="select"
                            disabled
                          >
                            <option value="0">Please select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Religion</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            disabled
                            onChange={this.handleInputChange}
                            value={this.state.profile.religion}
                            name="religion"
                            id="select"
                          >
                            <option value="Catholic">Catholic</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Christian">Christian</option>
                            <option value="Buddhist">Buddhist</option>
                            <option value="Konghucu">Konghucuu</option>
                            <option value="Hindu">Hindu</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="textarea-input">
                            Current Address
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            id="textarea-input"
                            disabled
                            onChange={this.handleInputChange}
                            value={this.state.profile.current_address}
                            name="current_address"
                            rows="3"
                          />
                        </CCol>
                      </CFormGroup>
                      <hr />
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="select">Identity Type</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            custom
                            disabled
                            onChange={this.handleInputChange}
                            value={this.state.profile.identity_type}
                            name="identity_type"
                            id="select"
                          >
                            <option value="KTP">KTP</option>
                            <option value="SIM">SIM</option>
                            <option value="Passport">Passport</option>
                            <option value="KITAS">KITAS</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">Identity Number</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="citizen-id"
                            disabled
                            placeholder="Identity Number"
                            onChange={this.handleInputChange}
                            value={this.state.profile.identity_number}
                            name="identity_number"
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email-input">
                            Identity Expiration Date
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="date"
                            disabled
                            id="expired_date_citizen_id"
                            placeholder="Expiry Date"
                            onChange={this.handleInputChange}
                            name="identity_exp_date"
                            value={moment(
                              this.state.profile.identity_exp_date
                            ).format("YYYY-MM-DD")}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="textarea-input">
                            Identity Address
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            disabled
                            name="identity_address"
                            id="textarea-input"
                            value={this.state.profile.identity_address}
                            rows="3"
                          />
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            )}
            <CCol xs="12" md="6">
              {this.state.employment_details === null ? null : (
                <CCard>
                  <CCardHeader>Employment Details</CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Job Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        {
                          this.state.jobList[
                            this.state.employment_details.job_id
                          ]
                        }
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Department Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        {
                          this.state.departmentList[
                            this.state.employment_details.department_id
                          ]
                        }
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Employment Type</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        {this.state.employment_details.type}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Join Date</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        {moment(this.state.employment_details.join_date).format(
                          "LL"
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">End Date</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        {this.state.employment_details.end_date === null
                          ? "-"
                          : this.state.employment_details.end_date}
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
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
    _getProfile: (id) => {
      return getProfile(id);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
    _requestEditProfile: (parameters) => {
      return requestEditProfile(parameters);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Profile);
