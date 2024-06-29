import React, { Component } from "react";

export default class GenericShimmer extends Component {
    render() {
        const { shimmerStyle } = this.props;
        return (
            <div className="shimmer-container">
                <div
                    style={{ ...shimmerStyle }}
                    className="gen-shimmer-card"
                ></div>
            </div>
        );
    }
}
