import React from "react";
import PropTypes from "prop-types";


export default function IconButton(props) {
    const iconClass = ["icon", props.iconClass].join(" ");
    return (
        <div
            className="icon-button-wrapper"
            onClick={(e) => props.onClick(e)}
            onMouseDown={(e) => props.onMouseDown(e)}
        >
            <div className={iconClass}>{props.children}</div>
        </div>
    );
}

IconButton.propTypes = {
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
};

IconButton.defaultProps = {
    onClick: () => {},
    onMouseDown: () => {},
};