import React, { Component } from "react";
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import moment from "moment";
import { connect } from "react-redux";
import { Loading } from "../../components";
import Parser from "html-react-parser";
import { getAnnouncement, statusEmployeeSuccess } from "../../actions/employee";
import { utils } from "../../helper";
import "./styles.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee_profile: null,
      announcements: null,
      isLoading: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    employee_profile = utils.getEmployeeProfile();
    this.setState({ employee_profile }, () => {
      this.__getAnnouncement();
    });
  }

  __getAnnouncement = () => {
    this.setState({ isLoading: true });
    let errorMessage = this.state.errorMessage;

    this.props
      ._getAnnouncement(this.state.employee_profile.company_id)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          if (res.announcements.length === 0) {
            this.setState({ announcements: [] });
          } else {
            this.setState({ announcements: res.announcements });
          }
        }
      })
      .catch((err) => {
        errorMessage = "Oops! Server Error. Refresh page.";
        this.setState({ isLoading: false, errorMessage });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Loading isLoading={this.state.isLoading} />
        {this.state.employee_profile === null ? null : (
          <React.Fragment className="dashboard">
            <CRow>
              <CCol md="6">
                <CCard>
                  <CCardBody>
                    <div style={{ fontSize: "1.3125rem", fontWeight: "500" }}>
                      Welcome, {this.state.employee_profile.first_name}{" "}
                      {this.state.employee_profile.last_name}!
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            {this.state.announcements !== null ? (
              <React.Fragment>
                {this.state.announcements.length === 0 ? (
                  <CRow>
                    <CCol md="6">
                      <CCard>
                        <CCardHeader>Announcements</CCardHeader>
                        <CCardBody>
                          <i>No new announcements, have a good day!</i>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                ) : (
                  <CRow>
                    <CCol md="6">
                      <CCard>
                        <CCardHeader>Announcements</CCardHeader>
                        <CCardBody>
                          {this.state.announcements.map((a, i, arr) => {
                            return (
                              <React.Fragment key={a.id}>
                                <b
                                  style={{
                                    fontSize: "14px",
                                    marginBottom: "2px",
                                  }}
                                >
                                  <u> {a.subject}</u>
                                </b>
                                <div
                                  style={{ fontSize: "12px", color: "grey" }}
                                >
                                  {moment(a.date_created).format(
                                    "MMMM Do YYYY, h:mm a"
                                  )}{" "}
                                </div>
                                <p />
                                <div style={{ fontSize: "13px" }}>
                                  {Parser(a.content)}
                                </div>
                                {arr.length - 1 === i ? null : <hr />}
                              </React.Fragment>
                            );
                          })}
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                )}
              </React.Fragment>
            ) : null}
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
    _getAnnouncement: (company_id) => {
      return getAnnouncement(company_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Dashboard);
