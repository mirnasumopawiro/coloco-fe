import React, { Component } from "react";
import {
  CButton,
  CModalHeader,
  CModalTitle,
  CModal,
  CModalBody,
} from "@coreui/react";
import moment from "moment";
import { connect } from "react-redux";
import "./styles.scss";
import CIcon from "@coreui/icons-react";
import {
  getReimbursementDetails,
  statusEmployeeSuccess,
} from "../../actions/employee";
import { getFormOptions } from "../../actions/form";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import { utils } from "../../helper";

class ReimbursementDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: null,
      statusList: null,
      reimbursementDetails: null,
      employee_profile: null,
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.reimbursementId !== prevProps.reimbursementId) {
      let employee_profile = this.state.employee_profile;
      employee_profile = utils.getEmployeeProfile();

      this.setState({ employee_profile }, () => {
        this.__getFormOptions();
        this.__getReimbursementDetails(this.props.reimbursementId);
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
          typeList: res.reimbursementTypeList,
        });
      })
      .catch((err) => {
        toast.error("Oops! Server Error. Refresh page.");
      });
  };

  __getReimbursementDetails = (id) => {
    this.setState({ isLoading: true });

    this.props
      ._getReimbursementDetails(id)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props._statusEmployeeSuccess(res);
        if (res.status === 200) {
          this.setState({ reimbursementDetails: res.data });
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
        {this.state.reimbursementDetails === null ||
        this.state.typeList === null ||
        this.state.statusList === null ? null : (
          <CModal show={this.props.isOpen} style={{ width: "400px" }}>
            <CModalHeader>
              <CModalTitle style={{ paddingTop: "7px" }}>
                Reimbursement Details
              </CModalTitle>
              <CButton onClick={this.handleClose}>
                <CIcon name="cil-x"></CIcon>
              </CButton>
            </CModalHeader>
            <CModalBody>
              <b>Reimbursement ID</b>
              <br />
              <p> {this.state.reimbursementDetails.id}</p>
              <b>Create Date</b>
              <br />
              <p>
                {moment(this.state.reimbursementDetails.date_created).format(
                  "LL"
                )}
              </p>
              <b>Transaction Date</b>
              <br />
              <p>
                {moment(
                  this.state.reimbursementDetails.transaction_date
                ).format("LL")}
              </p>
              <b>Transaction Type</b>
              <br />
              <p>{this.state.typeList[this.state.reimbursementDetails.type]}</p>
              <b>Status</b>
              <br />
              <p>
                {this.state.statusList[this.state.reimbursementDetails.status]}
              </p>
              <b>Resolver</b>
              <br />
              <p>
                {this.state.reimbursementDetails.resolver_name === " "
                  ? "-"
                  : this.state.reimbursementDetails.resolver_name}
              </p>
              <b>Notes</b>
              <br />
              <p> {this.state.reimbursementDetails.notes}</p>
              <b>Proof File </b>
              <CButton
                style={{ padding: "5px" }}
                target="_blank"
                href={this.state.reimbursementDetails.proof_file_url}
              >
                <i className="fa fa-external-link" />
              </CButton>
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
    _getReimbursementDetails: (id) => {
      return getReimbursementDetails(id);
    },
    _getFormOptions: (company_id) => {
      return getFormOptions(company_id);
    },
  };
};

export default connect(
  mapDispatchToProps,
  mapDispatchToProps
)(ReimbursementDetails);
