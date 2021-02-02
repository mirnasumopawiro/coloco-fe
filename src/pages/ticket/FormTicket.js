import React, { Component } from "react";
import {
  CButton,
  CLabel,
  CFormGroup,
  CModalHeader,
  CModalTitle,
  CInput,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CSelect,
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { utils } from "../../helper";
import { connect } from "react-redux";
import _ from "lodash";
import "./styles.scss";
import { Loading } from "../../components";
import { toast, ToastContainer } from "react-toastify";
import { getFormOptions } from "../../actions/form";
import { requestTicket, statusEmployeeSuccess } from "../../actions/employee";

class FormTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urgencyList: null,
      departmentList: null,
      typeList: null,
      parameters: {
        issuer_id: "",
        department_id: "0",
        type: "0",
        urgency: "-",
        title: "",
        notes: "",
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    let parameters = this.state.parameters;
    employee_profile = utils.getEmployeeProfile();

    this.setState({ employee_profile }, () => {
      parameters.issuer_id = employee_profile.employee_id;
      this.setState({ parameters });
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
          typeList: res.ticketTypeList,
          urgencyList: res.urgencyList,
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

  handleFormValidation = () => {
    if (
      this.state.parameters.department_id === "0" ||
      this.state.parameters.type === "0" ||
      this.state.parameters.urgency === "-" ||
      this.state.parameters.title === "" ||
      this.state.parameters.notes === ""
    ) {
      toast.error("Please fill out all fields.");
      return false;
    }

    return true;
  };

  handleSubmit = () => {
    if (this.handleFormValidation()) {
      let data = _.cloneDeep(this.state.parameters);
      this.__requestTicket(data);
    }
  };

  __requestTicket = (parameters) => {
    this.setState({ isLoading: true });

    this.props
      ._requestTicket(parameters)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 201) {
          window.location.reload();
        } else {
          toast.error("Oops! Server Error. Try again.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Try again.");
      });
  };

  handleClose = (e) => {
    this.props.onDismiss();
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Loading isLoading={this.state.isLoading} />
        {this.state.typeList === null ? null : (
          <CModal show={this.props.isOpen} style={{ width: "500px" }}>
            <CModalHeader>
              <CModalTitle style={{ paddingTop: "7px" }}>
                Request Ticket
              </CModalTitle>
              <CButton onClick={this.handleClose}>
                <CIcon name="cil-x"></CIcon>
              </CButton>
            </CModalHeader>
            <CModalBody>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Department</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect
                    onChange={this.handleInputChange}
                    name="department_id"
                    value={this.state.parameters.department_id}
                  >
                    <option value="0">Select...</option>
                    {Object.entries(this.state.departmentList).map((t, k) => (
                      <option key={k} value={t[0]}>
                        {t[1]}
                      </option>
                    ))}{" "}
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Type</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect
                    onChange={this.handleInputChange}
                    name="type"
                    value={this.state.parameters.type}
                  >
                    <option value="0">Select...</option>
                    {Object.entries(this.state.typeList).map((t, k) => (
                      <option key={k} value={t[0]}>
                        {t[1]}
                      </option>
                    ))}{" "}
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Urgency</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect
                    onChange={this.handleInputChange}
                    name="urgency"
                    value={this.state.parameters.urgency}
                  >
                    <option value="-">Select...</option>
                    {Object.entries(this.state.urgencyList).map((t, k) => (
                      <option key={k} value={t[0]}>
                        {t[1]}
                      </option>
                    ))}{" "}
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Title</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput
                    id="text-input"
                    name="title"
                    onChange={this.handleInputChange}
                    value={this.state.parameters.title}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Notes</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CTextarea
                    name="notes"
                    onChange={this.handleInputChange}
                    value={this.state.parameters.notes}
                    id="textarea-input"
                    rows="3"
                  />
                </CCol>
              </CFormGroup>
            </CModalBody>
            <CModalFooter>
              <CButton
                type="submit"
                size="sm"
                onClick={this.handleSubmit}
                color="primary"
              >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
            </CModalFooter>
          </CModal>
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
    _requestTicket: (parameters) => {
      return requestTicket(parameters);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(FormTicket);
