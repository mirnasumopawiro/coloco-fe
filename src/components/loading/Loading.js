import React from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import { CModal, CModalBody } from "@coreui/react";

const Loading = (props) => {
  return (
    <CModal
      {...props}
      style={{
        background: "transparent",
        border: "none",
        alignItems: "center",
      }}
      size="sm"
      backdrop
      fade
      className="loading-wrapper"
    >
      <CModalBody style={{}}>
        <Loader type="TailSpin" color="white" height="100" width="100" />
      </CModalBody>
    </CModal>
  );
};

Loading.propTypes = {
  isOpen: PropTypes.bool,
};

export default Loading;
