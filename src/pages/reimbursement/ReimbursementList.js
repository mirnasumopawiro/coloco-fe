import React, { Component } from "react";
import { CCard, CCardBody, CButton, CFormGroup, CCol } from "@coreui/react";
import { Table } from "reactstrap";
import FormReimbursement from "./FormReimbursement";
import ReimbursementDetails from "./ReimbursementDetails";
import { connect } from "react-redux";
import { Loading } from "../../components";
import "./styles.scss";
import { utils } from "../../helper";
import {
  getReimbursementDetails,
  getReimbursementList,
  requestReimbursement,
  statusEmployeeSuccess,
} from "../../actions/employee";
import { getFormOptions } from "../../actions/form";
import { ToastContainer, toast } from "react-toastify";

class Reimbursement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: null,
      statusList: null,
      employee_profile: null,
      reimbursementList: null,
      reimbursementId: null,
      isLoading: false,
      isOpenDetails: false,
      isRequestReimbursement: false,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    employee_profile = utils.getEmployeeProfile();

    this.setState({ employee_profile }, () => {
      this.__getReimbursementList();
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
          statusList: res.statusList,
          typeList: res.reimbursementTypeList,
        });
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  __getReimbursementList = () => {
    this.setState({ isLoading: true });

    this.props
      ._getReimbursementList({
        issuer_id: this.state.employee_profile.employee_id,
      })
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          if (res.data.length === 0) {
            this.setState({ reimbursementList: [] });
          } else {
            this.setState({ reimbursementList: res.data });
          }
        } else {
          toast.error("Oops! Server Error. Refresh page.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  requestReimbursement = () => {
    this.setState({ isRequestReimbursement: true });
  };

  openReimbursementDetails = (e) => {
    this.setState({ isOpenDetails: true, reimbursementId: e.target.value });
  };

  closeModal = () => {
    this.setState({ isOpenDetails: false, isRequestReimbursement: false });
  };

  render() {
    return (
      <CCard>
        <ToastContainer />
        <Loading isLoading={this.state.isLoading} />
        {this.state.employee_profile === null ||
        this.state.statusList === null ||
        this.state.typeList === null ? null : (
          <CCardBody>
            <CFormGroup row>
              <CCol xs="6" md="9">
                <CButton
                  className="default-button"
                  color="primary"
                  onClick={this.requestReimbursement}
                >
                  <i className="fa fa-plus" />
                  {"\u00A0"} Add Reimbursement
                </CButton>
              </CCol>
            </CFormGroup>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Create Date</th>
                  <th>Transaction Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Resolver</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.reimbursementList !== null ? (
                  <React.Fragment>
                    {this.state.reimbursementList.length === 0 ? (
                      <tr>
                        <td colSpan={7}>No Data Found</td>
                      </tr>
                    ) : (
                      <React.Fragment>
                        {this.state.reimbursementList.map((r, _) => {
                          return (
                            <tr key={r.id}>
                              <td>{r.id}</td>
                              <td>{r.date_created}</td>
                              <td>{r.transaction_date}</td>
                              <td>{this.state.typeList[r.type]}</td>
                              <td>{this.state.statusList[r.status]}</td>
                              <td>
                                {r.resolver_name === " "
                                  ? "-"
                                  : r.resolver_name}
                              </td>
                              <td>
                                <CButton
                                  color="primary"
                                  value={r.id}
                                  onClick={this.openReimbursementDetails}
                                >
                                  See Details
                                </CButton>
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : null}
              </tbody>
            </Table>
            <ReimbursementDetails
              reimbursementId={this.state.reimbursementId}
              onDismiss={this.closeModal}
              isOpen={this.state.isOpenDetails}
            />
            <FormReimbursement
              onDismiss={this.closeModal}
              isOpen={this.state.isRequestReimbursement}
            />
          </CCardBody>
        )}
      </CCard>
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
    _getReimbursementList: (parameters) => {
      return getReimbursementList(parameters);
    },
    _getReimbursementDetails: (id) => {
      return getReimbursementDetails(id);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Reimbursement);
