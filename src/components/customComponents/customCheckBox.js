import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import PropTypes from "prop-types";

export default function CustomCheckBox(props) {
    const { checked, onChange, label, ...rest } = props;
    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        {...rest}
                        checked={checked}
                        onChange={onChange}
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                }
                label={label}
                labelPlacement="right"
            />
        </div>
    );
}

CustomCheckBox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

CustomCheckBox.defaultProps = {
    checked: false,
    onChange: () => {},
};
