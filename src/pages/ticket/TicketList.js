import React, { Component } from "react";
import { CCard, CCardBody, CButton, CFormGroup, CCol } from "@coreui/react";
import { Table } from "reactstrap";
import FormTicket from "./FormTicket";
import TicketDetails from "./TicketDetails";
import { utils } from "../../helper";
import "./styles.scss";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import { getFormOptions } from "../../actions/form";
import {
  getTicketDetails,
  getTicketList,
  requestTicket,
  statusEmployeeSuccess,
} from "../../actions/employee";

class TicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: null,
      statusList: null,
      urgencyList: null,
      employee_profile: null,
      ticketList: null,
      ticketId: null,
      isLoading: false,
      isOpenDetails: false,
      isRequestTicket: false,
    };
  }

  componentDidMount() {
    let employee_profile = this.state.employee_profile;
    employee_profile = utils.getEmployeeProfile();

    this.setState({ employee_profile }, () => {
      this.__getTicketList();
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
          typeList: res.ticketTypeList,
          urgencyList: res.urgencyList,
        });
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  __getTicketList = () => {
    this.setState({ isLoading: true });

    this.props
      ._getTicketList({
        issuer_id: this.state.employee_profile.employee_id,
      })
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          if (res.data.length === 0) {
            this.setState({ ticketList: [] });
          } else {
            this.setState({ ticketList: res.data });
          }
        } else {
          toast.error("Oops! Server Error. Refresh page.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  requestTicket = () => {
    this.setState({ isRequestTicket: true });
  };

  openTicketDetails = (e) => {
    this.setState({ isOpenDetails: true, ticketId: e.target.value });
  };

  closeModal = () => {
    this.setState({ isOpenDetails: false, isRequestTicket: false });
  };

  render() {
    return (
      <CCard>
        <ToastContainer />
        <Loading isLoading={this.state.isLoading} />
        {this.state.employee_profile === null ||
        this.state.statusList === null ||
        this.state.urgencyList === null ||
        this.state.typeList === null ? null : (
          <CCardBody>
            <CFormGroup row>
              <CCol xs="6" md="9">
                <CButton
                  className="default-button"
                  color="primary"
                  onClick={this.requestTicket}
                >
                  <i className="fa fa-plus" />
                  {"\u00A0"} Add Ticket
                </CButton>
              </CCol>
            </CFormGroup>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Create Date</th>
                  <th>Type</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Urgency</th>
                  <th>Resolver</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ticketList !== null ? (
                  <React.Fragment>
                    {this.state.ticketList.length === 0 ? (
                      <tr>
                        <td colSpan={8}>No Data Found</td>
                      </tr>
                    ) : (
                      <React.Fragment>
                        {this.state.ticketList.map((r, _) => {
                          return (
                            <tr key={r.id}>
                              <td>{r.id}</td>
                              <td>{r.date_created}</td>
                              <td>{this.state.typeList[r.type]}</td>
                              <td>{r.name}</td>
                              <td>{this.state.statusList[r.status]}</td>
                              <td>{this.state.urgencyList[r.urgency]}</td>
                              <td>
                                {r.resolver_name === " "
                                  ? "-"
                                  : r.resolver_name}
                              </td>
                              <td>
                                <CButton
                                  color="primary"
                                  value={r.id}
                                  onClick={this.openTicketDetails}
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
            <TicketDetails
              ticketId={this.state.ticketId}
              onDismiss={this.closeModal}
              isOpen={this.state.isOpenDetails}
            />
            <FormTicket
              onDismiss={this.closeModal}
              isOpen={this.state.isRequestTicket}
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
    _requestTicket: (parameters) => {
      return requestTicket(parameters);
    },
    _getTicketList: (parameters) => {
      return getTicketList(parameters);
    },
    _getTicketDetails: (id) => {
      return getTicketDetails(id);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(TicketList);
