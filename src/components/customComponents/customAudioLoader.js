import React, { useState, useEffect } from "react";

const CustomAudioLoader = ({
    onCloseEpisodeUpload = () => {},
    customLoaderStyle,
    showCross = true,
    showPublishMsg = false,
}) => {
    return (
        <div className="custom-audio-loader" style={customLoaderStyle}>
            <div className="custom-loader">
                <div className="loader-background"></div>
            </div>
            {showCross && (
                <div className="cross-Button">
                    <div
                        className="cross-icon-wrapper"
                        onClick={() => onCloseEpisodeUpload()}
                    >
                        <div className="cross-icon">+</div>
                    </div>
                </div>
            )}
            {showPublishMsg && <div className="wait-msg">PUBLISHING… WAIT</div>}
        </div>
    );
};

export default CustomAudioLoader;
