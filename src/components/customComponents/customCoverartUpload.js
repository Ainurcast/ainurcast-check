import React, { PureComponent } from "react";
import { isMobile } from "react-device-detect";

export default class customCoverartUpload extends PureComponent {
  handleUploadFile = (event) => {
    this.props.onChange(event);
  };
  render() {
    const { imageURL, coverArtName, coverArtSizeErr = false } = this.props;
    return (
      <div className="custom-cover-art-uploader">
        <div className="cover-art-input-wrapper">
          <img
            src={imageURL ? imageURL : "/assets/mypodcastcoverart.png"}
            alt="mypodcastcoverart"
            className="cover-input-img"
            style={{ border: coverArtSizeErr && "1px solid #E60000" }}
          />
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="cover-art-input"
            multiple
            onChange={this.handleUploadFile}
          />
        </div>
        {!isMobile && (
          <div className="edit-cover-art">
            <img src="/assets/edit.svg" alt="modify-cover-art" />
            <span className="modify-btn">Modify</span>
          </div>
        )}
        {coverArtSizeErr && (
          <div className="image-size-error">
            Upload image size doesn’t seem to fit the criteria.
          </div>
        )}
        <div className="file-name">{coverArtName || ""}</div>
      </div>
    );
  }
}
