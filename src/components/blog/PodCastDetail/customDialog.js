import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = (props) => {
  const { open, onClose, children, title, actions } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "252px",
    },
    bodyStyle: {
      padding: 0,
    },
    titleStyle: {
      padding: "42px 0px 19px 40px",
      "& h2": {
        textAlign: "left",
        fontFamily: "Montserrat",
        fontWeight: "800",
        fontSize: "20px",
        letterSpacing: "0.4px",
        color: "#212121",
        textTransform: "capitalize",
        opacity: 1,
      },
    },
    actionsAlignment: {
      justifyContent: "space-between",
      padding: "0px 20px 29px 19px",
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        scroll="paper"
        onClose={onClose}
        className={classes.root}
      >
        <DialogTitle id="dialog-title" className={classes.titleStyle}>
          {title}
        </DialogTitle>
        <DialogContent className={classes.bodyStyle}>{children}</DialogContent>
        <DialogActions className={classes.actionsAlignment}>
          {actions}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
