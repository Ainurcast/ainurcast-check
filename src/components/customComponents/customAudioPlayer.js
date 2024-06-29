import React, { Component } from "react";
import CustomInputSlider from "./customInputSlider";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import Media from "react-media";
class CustomAudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPauseStopBtns: false,
      showStop: false,
      isPlaying: false,
    };
    //if any url comes as a props goes in place of hardcoded url
    this.audio = new Audio(
      this.props.audioURL ||
        "https://d1c96ibfqnjdes.cloudfront.net/uploads/file_example_MP3_700KB.mp3"
    );
  }

  componentDidMount() {
    this.audio.addEventListener("ended", this.stopAudioPlaying);
    this.audio.addEventListener("loadedmetadata", this.setDuration);
    this.audio.addEventListener("timeupdate", this.onUpdateAudioTime);
  }

  componentWillUnmount() {
    this.audio.removeEventListener("ended", this.stopAudioPlaying);
    this.audio.removeEventListener("loadedmetadata", this.setDuration);
    this.audio.removeEventListener("timeupdate", this.onUpdateAudioTime);
    this.stopAudioPlaying();
  }

  setDuration = () => {
    const maxTime = document.querySelector(".max-length");
    const minTime = document.querySelector(".min-time");
    maxTime.innerHTML = this.formatTime(this.audio.duration);
    minTime.innerHTML = this.formatInitialMinTime(this.audio.duration);
    if (this.props.autoPlay) {
      this.togglePauseStopBtns();
    }
  };

  formatInitialMinTime = (time) => {
    let h = Math.floor(time / 3600);
    if (h > 0) {
      return "00:00:00";
    } else {
      return "00:00";
    }
  };

  formatTime = (time) => {
    let h = Math.floor(time / 3600);
    if (h < 10) {
      h = "0" + h;
    }
    let s = parseInt(time % 60);
    if (s < 10) {
      s = "0" + s;
    }
    let m = parseInt((time / 60) % 60);
    if (m < 10) {
      m = "0" + m;
    }
    return h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
  };

  onUpdateAudioTime = () => {
    const range = document.querySelector(".slider");
    const fill = document.querySelector(".custom-slider-fill");
    const minTime = document.querySelector(".min-time");
    range.value = this.audio.currentTime;
    fill.style.width = `${(range.value / this.audio.duration) * 100}%`;
    minTime.innerHTML = this.formatTime(this.audio.currentTime);
  };

  stopAudioPlaying = () => {
    const range = document.querySelector(".slider");
    const fill = document.querySelector(".custom-slider-fill");
    this.audio.currentTime = 0;
    this.audio.pause();
    range.value = 0;
    fill.style.width = "0px";
    this.setState({
      isPlaying: false,
      showPauseStopBtns: false,
      showStop: false,
    });
  };

  playAudio = () => {
    const { isPlaying } = this.state;
    const maxTime = document.querySelector(".max-length");
    let range = document.querySelector(".slider");
    let totalTime = 0;
    maxTime.innerHTML = totalTime || "0:00";
    if (!isPlaying) {
      this.audio.play();
      totalTime = this.audio.duration;
      range.max = totalTime;
      maxTime.innerHTML = this.formatTime(totalTime);
      this.setState({
        isPlaying: true,
      });
    } else {
      this.audio.pause();
      maxTime.innerHTML = this.formatTime(this.audio.duration);
      this.setState({
        isPlaying: false,
      });
    }
  };

  backwardAudio = () => {
    let range = document.querySelector(".slider");
    range.max = this.audio.duration;
    if (this.audio.currentTime - 5 < 0) {
      this.audio.currentTime = 0;
      range.value = 0;
    } else {
      this.audio.currentTime = this.audio.currentTime - 5;
      range.value = this.audio.currentTime;
    }
  };

  forwardAudio = () => {
    let range = document.querySelector(".slider");
    range.max = this.audio.duration;
    if (this.audio.currentTime + 5 > this.audio.duration) {
      this.audio.currentTime = this.audio.duration;
      range.value = this.audio.currentTime;
    } else {
      this.audio.currentTime = this.audio.currentTime + 5;
      range.value = this.audio.currentTime;
    }
  };

  togglePauseStopBtns = () => {
    this.setState({
      showPauseStopBtns: !this.state.showPauseStopBtns,
      showStop: true,
    });
    this.playAudio();
  };

  stopAudioSong = () => {
    this.audio.pause();
    this.audio.currentTime = 0;
  };

  toggleStop = () => {
    this.setState({
      showStop: false,
      showPauseStopBtns: false,
    });
    this.stopAudioSong();
  };

  onSliderChange = () => {
    const range = document.querySelector(".slider");
    this.audio.currentTime = range.value;
  };
  onDelete = () => {
    this.props.onDelete();
  };

  renderAudioTimings = () => {
    return (
      <div className="audio-timings">
        <div
          className="backword-icon fb-minus-five"
          onClick={this.backwardAudio}
        >
          <img src="/assets/backward.svg" alt="backward-button" />
          <span className="fb-control">5s</span>
        </div>
        <div className="timings">
          <div className="min-time">0:00</div>
          <div className="bar-seperator">/</div>
          <div className="max-time">
            <span className="max-length">0:00</span>
            <span className="min-text">min</span>
          </div>
        </div>
        <div className="forward-icon fb-plus-five" onClick={this.forwardAudio}>
          <span className="fb-control">5s</span>
          <img src="/assets/forward.svg" alt="forward-button" />
        </div>
      </div>
    );
  };

  render() {
    const { showPauseStopBtns, showStop } = this.state;
    const {
      audioName,
      audioSize,
      showCloseIcon,
      onClose,
      hideCloseIcon,
      episodeView,
    } = this.props;
    return (
      <div
        className="cust-audio-player"
        style={{ marginBottom: episodeView ? "16px" : "" }}
      >
        <div className="audio-controls">
          <div className="pause-stop-btns">
            {!showPauseStopBtns ? (
              <div className="play-icon" onClick={this.togglePauseStopBtns}>
                <img src="/assets/play-button.svg" alt="play-button" />
              </div>
            ) : (
              <div className="pause-icon" onClick={this.togglePauseStopBtns}>
                <img src="/assets/pause.svg" alt="pause-button" />
              </div>
            )}
            <div
              style={{ opacity: !showStop ? "0" : "1" }}
              className="stop-icon"
              onClick={this.toggleStop}
            >
              <img src="/assets/stop.svg" alt="stop-button" />
            </div>
          </div>
          <Media query="(max-width: 425px)">
            {(matches) => (matches ? null : this.renderAudioTimings())}
          </Media>
          <div
            className="delete-icon"
            style={{
              opacity: !hideCloseIcon ? "1" : "0",
              cursor: !hideCloseIcon ? "pointer" : "auto",
            }}
          >
            {showCloseIcon ? (
              <CloseIcon
                onClick={() => {
                  this.stopAudioPlaying();
                  onClose();
                }}
              />
            ) : (
              <img
                src="/assets/delete.svg"
                alt="delete-button"
                onClick={!hideCloseIcon && this.onDelete}
              />
            )}
          </div>
        </div>
        {
          <Media query="(max-width: 425px)">
            {(matches) => (matches ? this.renderAudioTimings() : null)}
          </Media>
        }
        <div className="mp3-slider">
          <CustomInputSlider onSliderChange={this.onSliderChange} />
        </div>
        <div className="audio-details">
          <div className="audio-name">{audioName}</div>
          <div className="audio-size">{audioSize}</div>
        </div>
      </div>
    );
  }
}

CustomAudioPlayer.propTypes = {
  url: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  audioSize: PropTypes.string,
  audioName: PropTypes.string,
  autoPlay: PropTypes.bool,
  hideCloseIcon: PropTypes.bool,
  episodeView: PropTypes.bool,
};

CustomAudioPlayer.defaultProps = {
  url: "",
  showCloseIcon: false,
  audioSize: "24 MB",
  audioName: "Mypodcast.mp3",
  autoPlay: false,
  hideCloseIcon: false,
  episodeView: false,
};

export default CustomAudioPlayer;
