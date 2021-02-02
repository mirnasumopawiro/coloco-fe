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
  CInputFile,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import _ from "lodash";
import { utils } from "../../helper";
import "./styles.scss";
import { v4 as uuidv4 } from "uuid";
import {
  requestReimbursement,
  statusEmployeeSuccess,
} from "../../actions/employee";
import { getFormOptions } from "../../actions/form";
import { Loading } from "../../components";
import { toast, ToastContainer } from "react-toastify";
import { storage } from "../../config/firebase";

class FormReimbursement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: null,
      parameters: {
        issuer_id: "",
        transaction_date: "",
        type: "0",
        notes: "",
        proof_file_url: "",
      },
      isLoading: false,
      isError: false,
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
          typeList: res.reimbursementTypeList,
        });
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  handleUploadFile = (e) => {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      let imageName = uuidv4();
      let uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          this.setState({ isError: true });
        },
        () => {
          storage
            .ref("images")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              let parameters = this.state.parameters;
              parameters.proof_file_url = url;
              toast.success("Proof File is uploaded 🎉");
              this.setState({ parameters });
            });
          this.setState({ isError: false });
        }
      );
    }
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
      this.state.parameters.transaction_date === "" ||
      this.state.parameters.type === "0" ||
      this.state.parameters.notes === "" ||
      this.state.parameters.proof_file_url === ""
    ) {
      toast.error("Please fill out all fields.");
      return false;
    }

    return true;
  };

  handleSubmit = () => {
    if (this.handleFormValidation()) {
      let data = _.cloneDeep(this.state.parameters);
      this.__requestReimbursement(data);
    }
  };

  __requestReimbursement = (parameters) => {
    this.setState({ isLoading: true });

    this.props
      ._requestReimbursement(parameters)
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
        {this.state.typeList === null ? null : (
          <CModal show={this.props.isOpen}>
            <Loading isLoading={this.state.isLoading} />
            <CModalHeader>
              <CModalTitle style={{ paddingTop: "7px" }}>
                Request Reimbursement
              </CModalTitle>
              <CButton onClick={this.handleClose}>
                <CIcon name="cil-x"></CIcon>
              </CButton>
            </CModalHeader>
            <CModalBody>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Transaction Date</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput
                    type="date"
                    id="date-input"
                    placeholder="date"
                    name="transaction_date"
                    onChange={this.handleInputChange}
                    value={this.state.parameters.transaction_date}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Transaction Type</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect
                    custom
                    onChange={this.handleInputChange}
                    name="type"
                    value={this.state.parameters.type}
                  >
                    <option value="0">Select...</option>
                    {Object.entries(this.state.typeList).map((t, k) => (
                      <option key={k} value={t[0]}>
                        {t[1]}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="date-input">Proof File</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInputFile
                    id="file-input"
                    name="proof_file_url"
                    onChange={this.handleUploadFile}
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
                color="primary"
                onClick={this.handleSubmit}
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
    _requestReimbursement: (parameters) => {
      return requestReimbursement(parameters);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
  };
};

export default connect(
  mapDispatchToProps,
  mapDispatchToProps
)(FormReimbursement);
