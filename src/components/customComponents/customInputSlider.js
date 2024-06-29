import React, { PureComponent } from "react";

export default class CustomInputSlider extends PureComponent {
    handleSliderChange = (e) => {
        const fill = document.querySelector(".custom-slider-fill");
        fill.style.width = `${e.target.value}%`;
        this.props.onSliderChange();
    };
    render() {
        return (
            <div className="slider-container">
                <div className="bar">
                    <div
                        className="custom-slider-fill"
                        style={{ width: "0%" }}
                    ></div>
                </div>
                <input
                    id="slider"
                    className="slider"
                    type="range"
                    min="0"
                    defaultValue="0"
                    onChange={this.handleSliderChange}
                />
            </div>
        );
    }
}
