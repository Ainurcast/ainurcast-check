import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import snackbarSlice from "../../pages/root/snackbarSlice";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomSnackbar() {
  const dispatch = useDispatch();
  const { hideSnackbar } = snackbarSlice.actions;
  const { msg, open, type } = useSelector((state) => state.snackbarReducer);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <>
      {type !== "" ? (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={`${type}`}>
            {msg}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}
