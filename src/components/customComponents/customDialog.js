import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

export default function CustomDialog(props) {
    const {
        open,
        title,
        children,
        actions,
        onClose,
        fullScreen,
        bodyStyle,
        contentStyle,
        actionStyle,
        titleStyle,
        showCrossIcon,
        mobileDialog,
        mobileView,
    } = props;
    const useStyles = makeStyles({
        root: {
            padding: mobileView || mobileDialog ? 0 : 20,
            minWidth: mobileView || mobileDialog ? "unset" : 600,
        },
        paperFullScreen: {
            borderRadius: 8,
            minWidth: 600,
        },
        mobPaper: {
            borderRadius: "unset",
        },
        paper: {
            overflow: "visible",
            borderRadius: mobileView ? 0 : 8,
            width: "600px",
        },
        dialogActionStyle: {
            height: "44px",
            padding: mobileView
                ? "16px 16px 40px 16px"
                : mobileDialog
                ? "0 16px 16px"
                : "10px 76px 40px 76px",
            boxShadow: mobileView ? "0px -2px 6px #21212114" : "unset",
            borderRadius: mobileView ? "8px 8px 0px 0px" : "unset",
            ...actionStyle,
        },
        title: {
            fontFamily: "Montserrat",
            fontSize: "20px",
            fontWeight: 700,
            height: "20px",
            color: "#212121",
            padding: mobileView
                ? "40px 16px 30px 16px"
                : mobileDialog
                ? "16px"
                : "40px 40px 30px 40px",
            border: "none",
            ...titleStyle,
        },
        dividers: {
            border: "none",
        },
        body: {
            fontSize: "13px",
            fontFamily: "Poppins, sans-serif",
            color: "#16325c",
            padding: mobileView ? "16px" : "10px 76px 40px 76px",
            wordBreak: "break-word",
            ...bodyStyle,
            ...contentStyle,
        },
    });

    const classes = useStyles();
    return (
        <Dialog
            classes={{
                root: classes.root,
                paperFullScreen: mobileView
                    ? classes.mobPaper
                    : classes.paperFullScreen,
                paper: classes.paper,
            }}
            keepMounted
            open={open}
            onClose={onClose}
            scroll="paper"
            fullScreen={fullScreen}
        >
            <DialogTitle
                classes={{ root: classes.title }}
                disableTypography
                id="title"
            >
                <div className="cust-dialog-title">
                    <div className="title"> {title}</div>
                    {showCrossIcon && (
                        <div className="cross-icon-wrapper" onClick={onClose}>
                            <div className="cross-icon">+</div>
                        </div>
                    )}
                </div>
            </DialogTitle>
            <DialogContent
                classes={{
                    root: classes.body,
                    dividers: classes.dividers,
                }}
                dividers
            >
                {children}
            </DialogContent>
            {actions.length > 0 && (
                <DialogActions className={classes.dialogActionStyle}>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
}

CustomDialog.propTypes = {
    open: PropTypes.bool,
    fullScreen: PropTypes.bool,
    title: PropTypes.string,
    actions: PropTypes.array,
    bodyStyle: PropTypes.object,
    actionStyle: PropTypes.object,
    onClose: PropTypes.func,
    showCrossIcon: PropTypes.bool,
    mobileView: PropTypes.bool,
    mobileDialog: PropTypes.bool,
};

CustomDialog.defaultProps = {
    open: false,
    fullScreen: false,
    title: "",
    children: {},
    actions: [],
    bodyStyle: {},
    actionStyle: {},
    onClose: () => {},
    showCrossIcon: false,
    mobileView: false,
    mobileDialog: false,
};
