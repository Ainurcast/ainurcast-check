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

const CustomTextInput = (props) => {
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
        autoComplete,
        passwordField,
        showPassword,
        inputProps,
        type,
        autoFocus,
        iconClass,
        ...rest
    } = props;
    const inputBorderColor = error ? "errored-input" : "";
    const selectedValueColor = value ? "bgActiveState" : "";
    return (
        <div className="custom-txt-input">
            <div className="text-input">
                <input
                    {...rest}
                    type={type}
                    className={`custom-input ${inputBorderColor} ${selectedValueColor}`}
                    name={name}
                    label={label}
                    value={value}
                    autoFocus={autoFocus}
                    required={required}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={(event) => handleInputChange(event, onChange)}
                    onKeyDown={(event) => handleKeyDown(event, onKeyDown)}
                    onFocus={(event) => handleFocus(event, onFocus)}
                    onBlur={(event) => handleBlur(event, onBlur)}
                    onCopy={(event) => handleCopy(event, onCopy)}
                    onPaste={(event) => handlePaste(event, onPaste)}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                    tabIndex={0}
                />
                <label>{required?`${label}*` :label}</label>
                <div className={iconClass ? iconClass : "text-input-icon"}>
                    {inputProps}
                </div>
                <div
                    className={`helper-text ${
                        error ? "errored-helper-text" : ""
                    }`}
                >
                    {helperText}
                </div>
            </div>
        </div>
    );
};

CustomTextInput.propTypes = {
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
    passwordField: PropTypes.bool,
    autoComplete: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    inputProps: PropTypes.node,
    autoFocus: PropTypes.bool,
};

CustomTextInput.defaultProps = {
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
    passwordField: false,
    error: false,
    autoComplete: "off",
    type: "text",
    inputProps: React.Node,
    autoFocus: false,
};

export default CustomTextInput;
