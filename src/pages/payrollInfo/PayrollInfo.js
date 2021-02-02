import React, { Component } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { utils } from "../../helper";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import { getPayrollInfo, statusEmployeeSuccess } from "../../actions/employee";

class PayrollInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee_profile: null,
      payroll_info: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    employee_profile = utils.getEmployeeProfile();
    this.setState({ employee_profile }, () => {
      this.__getPayrollInfo();
    });
  }

  __getPayrollInfo = () => {
    this.setState({ isLoading: true });

    this.props
      ._getPayrollInfo(this.state.employee_profile.employee_id)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          this.setState({ payroll_info: res.data });
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
        {this.state.employee_profile === null ||
        this.state.payroll_info === null ? null : (
          <React.Fragment className="payroll-info">
            <CRow>
              <CCol md="7">
                <CCard>
                  <CCardBody>
                    <CRow>
                      <CCol md="5">
                        <p>
                          <b>Bank Account Name</b>
                        </p>
                      </CCol>
                      <CCol md="7">{this.state.payroll_info.account_name}</CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <p>
                          <b>Bank Account No.</b>
                        </p>
                      </CCol>
                      <CCol md="7">{this.state.payroll_info.account_no}</CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <p>
                          <b>NPWP</b>
                        </p>
                      </CCol>
                      <CCol md="7">{this.state.payroll_info.npwp}</CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <p>
                          <b>BPJS Kesehatan</b>
                        </p>
                      </CCol>
                      <CCol md="7">
                        {this.state.payroll_info.bpjs_kesehatan_no}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <b>BPJS Ketenagakerjaan</b>
                      </CCol>
                      <CCol md="7">
                        {this.state.payroll_info.bpjs_ketenagakerjaan_no}
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </React.Fragment>
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
    _getPayrollInfo: (employee_id) => {
      return getPayrollInfo(employee_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(PayrollInfo);
