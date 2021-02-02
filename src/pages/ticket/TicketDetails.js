import React, { Component } from "react";
import {
  CButton,
  CModalHeader,
  CModalTitle,
  CModal,
  CModalBody,
} from "@coreui/react";
import { utils } from "../../helper";
import "./styles.scss";
import CIcon from "@coreui/icons-react";
import {
  getTicketDetails,
  statusEmployeeSuccess,
} from "../../actions/employee";
import { getFormOptions } from "../../actions/form";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import { connect } from "react-redux";

class TicketDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: null,
      statusList: null,
      urgencyList: null,
      employee_profile: null,
      ticketDetails: null,
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ticketId !== prevProps.ticketId) {
      let employee_profile = this.state.employee_profile;
      employee_profile = utils.getEmployeeProfile();

      this.setState({ employee_profile }, () => {
        this.__getFormOptions();
        this.__getTicketDetails(this.props.ticketId);
      });
    }
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

  __getTicketDetails = (id) => {
    this.setState({ isLoading: true });

    this.props
      ._getTicketDetails(id)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          this.setState({ ticketDetails: res.data });
        } else {
          toast.error("Oops! Server Error. Refresh page.");
        }
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
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
        {this.state.ticketDetails === null ||
        this.state.typeList === null ||
        this.state.urgencyList === null ||
        this.state.statusList === null ? null : (
          <CModal show={this.props.isOpen} style={{ width: "400px" }}>
            <CModalHeader>
              <CModalTitle style={{ paddingTop: "7px" }}>
                Ticket Details
              </CModalTitle>
              <CButton onClick={this.handleClose}>
                <CIcon name="cil-x"></CIcon>
              </CButton>
            </CModalHeader>
            <CModalBody>
              <b>Ticket ID</b>
              <br />
              <p> {this.state.ticketDetails.id}</p>
              <b>Create Date</b>
              <br />
              <p> {this.state.ticketDetails.date_created}</p>
              <b>Title</b>
              <br />
              <p> {this.state.ticketDetails.title}</p>
              <b>Notes</b>
              <br />
              <p> {this.state.ticketDetails.notes}</p>
              <b>Request Type</b>
              <br />
              <p> {this.state.typeList[this.state.ticketDetails.type]}</p>
              <b>Department</b>
              <br />
              <p>{this.state.ticketDetails.name} </p>
              <b>Status</b>
              <br />
              <p> {this.state.statusList[this.state.ticketDetails.status]}</p>
              <b>Urgency</b>
              <br />
              <p> {this.state.urgencyList[this.state.ticketDetails.urgency]}</p>
              <b>Resolver</b>
              <br />
              <p>
                {this.state.ticketDetails.resolver_name === " "
                  ? "-"
                  : this.state.ticketDetails.resolver_name}
              </p>
            </CModalBody>
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
    _getTicketDetails: (id) => {
      return getTicketDetails(id);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(TicketDetails);
