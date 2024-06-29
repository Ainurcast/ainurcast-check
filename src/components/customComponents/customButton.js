import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const primaryButton = {
    width: "100%",
    padding: "12px 30px",
    letterSpacing: "0.16px",
    color: "#F7F7F7",
    height: "44px",
    opacity: 1,
    fontSize: "16px",
    textTransform: "capitalize",
    borderRadius: "8px",
    background: "#212121",
    boxShadow: "0px 2px 6px #00000029",
    fontFamily: "'Roboto', sans-serif",
    transition: "all 0.4s ease",
    border: "1px solid #212121",
    fontWeight: "500",
    "&:hover": {
        background: "#000000",
        boxShadow: "0px 6px 16px #00000029",
        border: "1px solid #000000",
    },
    "&:active": {
        background: "#000000",
        boxShadow: "0px 2px 6px #00000029",
        border: "1px solid #000000",
    },
    "&:disabled": {
        background:
            "repeating-linear-gradient(-45deg, #6B6B6B 0px, #6B6B6B 5px, #999999 5px, #999999 10px)",
        pointerEvents: "unset",
        cursor: "not-allowed",
        color: "#fff",
    },
};

const CustomPrimaryButton = (props) => {
    const { label, primary, secondary, showLoader, yellowBtn, ...rest } = props;
    const yellowButton = {
        ...primaryButton,
        background: "#FFD100",
        boxShadow: "0px 3px 6px #463A005C",
        border: "none",
        color: "#212121",
        "&:hover": {
            ...primaryButton["&:hover"],
            background: "#F0C400",
            boxShadow: "0px 6px 16px #463A005C",
            border: "none",
        },
        "&:active": {
            ...primaryButton["&:active"],
            background: "#E6BB00",
            boxShadow: "0px 2px 6px #463A005C",
            border: "none",
        },
    };
    const useStyles = makeStyles({
        primaryBtn: yellowBtn ? yellowButton : primaryButton,
        secondaryBtn: {
            width: "100%",
            padding: "12px 30px",
            letterSpacing: "0.16px",
            color: "#212121",
            opacity: 1,
            fontSize: "16px",
            height: "44px",
            textTransform: "capitalize",
            borderRadius: "8px",
            background: "#ffffff",
            boxShadow: "0px 2px 6px #00000029",
            fontFamily: "'Roboto', sans-serif",
            transition: "all 0.4s ease",
            border: "1px solid #000000",
            fontWeight: "500",
            "&:hover": {
                background: "##F7F7F7",
                boxShadow: "0px 6px 16px #00000029",
                border: "1px solid #000000",
            },
            "&:active": {
                background: "#D9D9D9",
                boxShadow: "0px 2px 6px #00000029",
                border: "1px solid #000000",
            },
            "&:disabled": {
                background:
                    "repeating-linear-gradient(-45deg, #F7F7F7 0px, #F7F7F7 5px, #D9D9D9 5px, #D9D9D9 10px)",
                pointerEvents: "unset",
                cursor: "not-allowed",
                color: "#999999",
            },
        },
        teritiaryBtn: {
            padding: "12px 16px",
            letterSpacing: "0.16px",
            color: "#212121",
            opacity: 1,
            fontSize: "16px",
            height: "44px",
            textTransform: "capitalize",
            borderRadius: "8px",
            background: "transparent",
            fontFamily: "'Roboto', sans-serif",
            transition: "all 0.1s ease",
            fontWeight: "500",
            "&:hover": {
                background: "##F7F7F7",
            },
            "&:active": {
                background: "#D9D9D9",
            },
            "&:disabled": {
                pointerEvents: "unset",
                cursor: "not-allowed",
                color: "#999999",
            },
        },
    });
    const classes = useStyles();

    return (
        <div className="cust-button" style={props.customButtonStyle}>
            <Button
                {...rest}
                className={
                    primary
                        ? `customButton ${classes.primaryBtn}`
                        : secondary
                        ? `customButton ${classes.secondaryBtn} `
                        : `customButton ${classes.teritiaryBtn}`
                }
                style={props.style}
            >
                {showLoader && (
                    <div className="loader">
                        <CircularProgress size={20} />{" "}
                    </div>
                )}
                {label}
            </Button>
        </div>
    );
};

export default CustomPrimaryButton;
