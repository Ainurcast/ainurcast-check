import React, { PureComponent } from "react";

export default class CustomFileUpload extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleUploadFile = (event) => {
        this.props.onChange(event);
    };

    render() {
        return (
            <>
                <div className="custom-file-uploader">
                    <div className="file-input-wrapper">
                        <div className="file-input-text">
                            Upload Episode File (mp3)
                        </div>
                        <input
                            type="file"
                            accept=".mp3"
                            className="file-input"
                            onChange={this.handleUploadFile}
                        />
                    </div>
                </div>
            </>
        );
    }
}
