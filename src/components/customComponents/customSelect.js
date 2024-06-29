import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const handleChange = (event, value, onChange) => {
    onChange(event, value);
};
const CustomSelect = (props) => {
    const {
        options,
        label,
        onChange,
        defaultValue,
        error,
        helperText,
        value,
        required,
    } = props;

    return (
        <>
            <Autocomplete
                {...props}
                options={options}
                value={value}
                getOptionLabel={(option) => option.text}
                defaultValue={defaultValue && defaultValue}
                renderInput={(params) => (
                    <TextField
                        required={required}
                        error={error}
                        helperText={helperText}
                        {...params}
                        label={label}
                        variant="outlined"
                    />
                )}
                onChange={(event, value) =>
                    handleChange(event, value, onChange)
                }
            />
        </>
    );
};

CustomSelect.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array,
    label: PropTypes.string,
};

CustomSelect.defaultProps = {
    onChange: () => {},
    options: [],
    label: "",
};

export default CustomSelect;
