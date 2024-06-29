import React from "react";
import './snackbar.scss';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as snackbarAction from "./actions";

const ErrorIcon = React.lazy(() => import('@material-ui/icons/Error'));
const CheckCircleIcon = React.lazy(() => import('@material-ui/icons/CheckCircle'));
const WarningIcon = React.lazy(() => import('@material-ui/icons/Warning'));

const SnackBar = (props) => {

  const getBackGroundColor = type => {
    if (type === "warning") {
      return "#FF9F00";
    }
    if (type === "success") {
      return "#43A047";
    }
    if (type === "error") {
      return "#D32F2F";
    }
    if(type === "pending") {
      return "#f3a712";
    }
  };

  const getIcon = type => {
    if (type === "warning") {
      return <WarningIcon />;
    }
    if (type === "success") {
      return <CheckCircleIcon />;
    }
    if (type === "error") {
      return <ErrorIcon />;
    }
  };

  const { showSnackbar, message, type } = props;

  return (
    <div
      className={showSnackbar ? "custom-snackbar show" : "custom-snackbar"}
      style={{ background: getBackGroundColor(type) }}
    >
        {getIcon(type)}
        <span className="message">{message}</span>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    snackBarReducer: { showSnackbar, message, type },
  } = state;
  return { showSnackbar, message, type };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...snackbarAction,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnackBar);
