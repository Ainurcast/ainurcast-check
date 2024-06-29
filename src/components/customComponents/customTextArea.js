import React from "react";
import PropTypes from "prop-types";

const handleInputChange = (event, onChange) => {
    onChange(event, event.target.value);
};

const handleKeyDown = (event, onKeyDown) => {
    onKeyDown(event);
};

const handleFocus = (event, onFocus) => {
    onFocus(event);
};

const handleBlur = (event, onBlur) => {
    onBlur(event);
};

const handlePaste = (event, onPaste) => {
    onPaste(event);
};

const handleCopy = (event, onCopy) => {
    onCopy(event);
};

const CustomTextArea = (props) => {
    const {
        onFocus,
        onBlur,
        onChange,
        onKeyDown,
        onCopy,
        onPaste,
        value,
        label,
        helperText,
        disabled,
        required,
        error,
        name,
        readOnly,
        placeholder,
        ...rest
    } = props;
    const inputBorderColor = error ? "errored-input" : "";
    const selectedValueColor = value ? "bgActiveState" : "";
    return (
        <div className="custom-text-area">
            <textarea
                className={`text-area ${inputBorderColor} ${selectedValueColor}`}
                {...rest}
                tabIndex={0}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(event) => handleInputChange(event, onChange)}
                onKeyDown={(event) => handleKeyDown(event, onKeyDown)}
                onFocus={(event) => handleFocus(event, onFocus)}
                onBlur={(event) => handleBlur(event, onBlur)}
                onCopy={(event) => handleCopy(event, onCopy)}
                onPaste={(event) => handlePaste(event, onPaste)}
            />
            <label>{label}</label>
            <div
                className={`helper-text  ${error ? "errored-helper-text" : ""}`}
            >
                {helperText}
            </div>
        </div>
    );
};

CustomTextArea.propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onCopy: PropTypes.func,
    onPaste: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    autoFocus: PropTypes.bool,
    rows: PropTypes.string,
};

CustomTextArea.defaultProps = {
    onFocus: () => {},
    onBlur: () => {},
    onClick: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onPaste: () => {},
    onCopy: () => {},
    name: "",
    helperText: "",
    label: "",
    value: "",
    disabled: false,
    required: false,
    error: false,
    autoComplete: "off",
    type: "text",
    autoFocus: false,
    rows: "3",
};

export default CustomTextArea;
