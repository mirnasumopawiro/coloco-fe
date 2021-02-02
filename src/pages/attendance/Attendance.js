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
import { Table } from "reactstrap";
import moment from "moment";
import Pdf from "react-to-pdf";
import _ from "lodash";
import { utils } from "../../helper";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import "./styles.scss";
import CIcon from "@coreui/icons-react";
import { statusEmployeeSuccess, getAttendance } from "../../actions/employee";

const ref = React.createRef();
const options = {
  orientation: "potrait",
};

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameters: {
        month: 2,
        year: "2021",
      },
      attendance: null,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    employee_profile = utils.getEmployeeProfile();

    this.setState({ employee_profile }, () => {
      this.__getAttendance();
    });
  }

  handleInputChange = (e) => {
    let target = e.target;
    let key = target.name;
    let value = target.value;
    let parameters = this.state.parameters;

    parameters[key] = value;

    this.setState({ parameters }, () => {
      this.__getAttendance();
    });
  };

  __getAttendance = () => {
    this.setState({ isLoading: true });
    let data = _.cloneDeep(this.state.parameters);

    this.props
      ._getAttendance(data, this.state.employee_profile.employee_id)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          this.setState({ attendance: res.data });
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
      <CRow className="attendance">
        <ToastContainer />
        <Loading isLoading={this.state.isLoading} />
        {this.state.employee_profile === null ||
        this.state.attendance === null ? null : (
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
                      filename={`${this.state.employee_profile.first_name}-${this.state.parameters.month}-${this.state.parameters.year}-attendance.pdf`}
                      options={options}
                      scale={0.74}
                    >
                      {({ toPdf }) => (
                        <CButton
                          onClick={toPdf}
                          color="primary"
                          style={{ height: "80%" }}
                        >
                          <CIcon name="cil-vertical-align-bottom" /> Download
                        </CButton>
                      )}
                    </Pdf>
                  </CCol>
                </CRow>
                <hr />
                <div ref={ref}>
                  <p>
                    <b>
                      Attendance Record -{" "}
                      {moment(this.state.attendance[0].date).format(
                        "MMMM YYYY"
                      )}{" "}
                      - {this.state.employee_profile.first_name}{" "}
                      {this.state.employee_profile.last_name}
                    </b>
                  </p>
                  <Table responsive striped bordered>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Schedule In</th>
                        <th>Schedule Out</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                        <th>Overtime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.attendance.map((r, _) => {
                        return (
                          <tr key={r.date}>
                            <td>{r.date}</td>
                            <td>
                              {r.schedule_in === null
                                ? "-"
                                : moment(r.schedule_in).format("HH:mm:ss")}
                            </td>
                            <td>
                              {r.schedule_out === null
                                ? "-"
                                : moment(r.schedule_out).format("HH:mm:ss")}
                            </td>
                            <td>
                              {r.clock_in === null
                                ? "-"
                                : moment(r.clock_in).format("HH:mm:ss")}
                            </td>
                            <td>
                              {r.clock_out === null
                                ? "-"
                                : moment(r.clock_out).format("HH:mm:ss")}
                            </td>
                            <td>{r.overtime === null ? "-" : r.overtime}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        )}
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
    _getAttendance: (parameters, employee_id) => {
      return getAttendance(parameters, employee_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Attendance);
