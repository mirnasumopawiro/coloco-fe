import React, { Component } from "react";
import {
  CFormGroup,
  CLabel,
  CSelect,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import NumberFormat from "react-number-format";
import Pdf from "react-to-pdf";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import { utils } from "../../helper";
import "./styles.scss";
import { getPayslip, statusEmployeeSuccess } from "../../actions/employee";

const ref = React.createRef();
const options = {
  orientation: "landscape",
};

class Payslip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameters: {
        month: 2,
        year: 2021,
      },
      payslip: null,
      company_details: null,
      employee_profile: null,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    let company_details = this.state.company_details;
    employee_profile = utils.getEmployeeProfile();
    company_details = utils.getCompanyDetails();

    this.setState({ employee_profile, company_details }, () => {
      this.__getPayslip();
    });
  }

  handleInputChange = (e) => {
    let target = e.target;
    let key = target.name;
    let value = target.value;
    let parameters = this.state.parameters;

    parameters[key] = value;

    this.setState({ parameters }, () => {
      this.__getPayslip();
    });
  };

  __getPayslip = () => {
    this.setState({ isLoading: true });
    let data = _.cloneDeep(this.state.parameters);

    this.props
      ._getPayslip(data, this.state.employee_profile.employee_id)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          if (res.data === null) {
            this.setState({ payslip: "-" });
          } else {
            this.setState({ payslip: res.data });
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
        {this.state.employee_profile === null ||
        this.state.company_details === null ||
        this.state.payslip === null ? null : (
          <React.Fragment>
            <CRow className="payslip">
              <CCol md="12">
                <CCard>
                  <CCardBody>
                    <CRow>
                      <CCol md="3">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">Month</CLabel>
                          <CSelect
                            custom
                            name="month"
                            onChange={this.handleInputChange}
                            value={this.state.parameters.month}
                          >
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol md="3">
                        <CFormGroup>
                          <CLabel htmlFor="ccyear">Year</CLabel>
                          <CSelect
                            custom
                            name="year"
                            onChange={this.handleInputChange}
                            value={this.state.parameters.year}
                          >
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol>
                        <Pdf
                          targetRef={ref}
                          options={options}
                          scale={1.1}
                          filename={`${this.state.employee_profile.first_name}-${this.state.parameters.month}-${this.state.parameters.year}-payslip.pdf`}
                        >
                          {({ toPdf }) => (
                            <CButton
                              onClick={toPdf}
                              color="primary"
                              style={{ height: "80%" }}
                            >
                              <CIcon name="cil-vertical-align-bottom" />{" "}
                              Download
                            </CButton>
                          )}
                        </Pdf>
                      </CCol>
                    </CRow>
                    <hr />
                    <div ref={ref}>
                      <p>
                        <b>
                          Payslip -{" "}
                          {moment()
                            .month(this.state.parameters.month)
                            .format("MMMM")}{" "}
                          {this.state.parameters.year}
                        </b>
                        <br />
                        {this.state.employee_profile.first_name}{" "}
                        {this.state.employee_profile.last_name} |{" "}
                        {this.state.employee_profile.employee_id}
                        <br />
                        {this.state.company_details.name}
                      </p>
                      <hr></hr>
                      {this.state.payslip === "-" ? (
                        <p>Payslip is not ready to view.</p>
                      ) : (
                        <React.Fragment>
                          {" "}
                          <CRow className="basic-salary">
                            <CCol>
                              <p>Basic Salary</p>
                            </CCol>
                            <CCol style={{ textAlign: "right" }}>
                              <NumberFormat
                                value={this.state.payslip.basic_salary}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="6">
                              <div className="allowance">
                                <b>
                                  <p>Allowance</p>
                                </b>
                                {this.state.payslip.allowances.data.map(
                                  (a, _) => {
                                    return (
                                      <CRow key={a.name}>
                                        <CCol>
                                          <p>{a.name}</p>
                                        </CCol>
                                        <CCol style={{ textAlign: "right" }}>
                                          <NumberFormat
                                            value={a.amount}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"IDR "}
                                          />
                                        </CCol>
                                      </CRow>
                                    );
                                  }
                                )}
                                <CRow>
                                  <CCol>
                                    <b>Total</b>
                                  </CCol>
                                  <CCol style={{ textAlign: "right" }}>
                                    <b>
                                      <NumberFormat
                                        value={
                                          this.state.payslip.allowances
                                            .total_amount
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"IDR "}
                                      />
                                    </b>
                                  </CCol>
                                </CRow>
                              </div>
                            </CCol>
                            <CCol md="6">
                              <div className="deduction">
                                <b>
                                  <p>Deduction</p>
                                </b>

                                {this.state.payslip.deductions.data.map(
                                  (d, _) => {
                                    return (
                                      <CRow key={d.name}>
                                        <CCol>
                                          <p>{d.name}</p>
                                        </CCol>
                                        <CCol style={{ textAlign: "right" }}>
                                          <NumberFormat
                                            value={d.amount}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"IDR "}
                                          />
                                        </CCol>
                                      </CRow>
                                    );
                                  }
                                )}
                                <CRow>
                                  <CCol>
                                    <b>Total</b>
                                  </CCol>
                                  <CCol style={{ textAlign: "right" }}>
                                    <b>
                                      <NumberFormat
                                        value={
                                          this.state.payslip.deductions
                                            .total_amount
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"IDR "}
                                      />
                                    </b>
                                  </CCol>
                                </CRow>
                              </div>
                            </CCol>
                          </CRow>
                          <CRow className="take-home-pay">
                            <CCol>
                              <p>Take Home Pay</p>
                            </CCol>
                            <CCol style={{ textAlign: "right" }}>
                              <NumberFormat
                                value={this.state.payslip.take_home_pay}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="6">
                              <div className="benefit">
                                <b>
                                  <p>Benefit</p>
                                </b>
                                {this.state.payslip.benefits.data.map(
                                  (b, _) => {
                                    return (
                                      <CRow key={b.name}>
                                        <CCol>
                                          <p>{b.name}</p>
                                        </CCol>
                                        <CCol style={{ textAlign: "right" }}>
                                          <NumberFormat
                                            value={b.amount}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"IDR "}
                                          />
                                        </CCol>
                                      </CRow>
                                    );
                                  }
                                )}
                                <CRow>
                                  <CCol>
                                    <b>Total</b>
                                  </CCol>
                                  <CCol style={{ textAlign: "right" }}>
                                    <b>
                                      <NumberFormat
                                        value={
                                          this.state.payslip.benefits
                                            .total_amount
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"IDR "}
                                      />
                                    </b>
                                  </CCol>
                                </CRow>
                              </div>
                            </CCol>
                          </CRow>
                        </React.Fragment>
                      )}
                    </div>
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
    _getPayslip: (parameters, employee_id) => {
      return getPayslip(parameters, employee_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Payslip);
