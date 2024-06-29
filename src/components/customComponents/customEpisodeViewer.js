import React from "react";
import CustomAudioPlayer from "./customAudioPlayer";

export default class CustomEpisodeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAudioPlayer: false,
            crossIconClicked: false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.audioPlayerIndex === nextProps.index && !this.state.crossIconClicked) {
            this.setState({
                openAudioPlayer: false,
            });
        }
    }
    render() {
        const {
            episode: {
                name = "",
                season_number = 0,
                episode_number = 0,
                description = "",
                episode_file = "",
                is_published = false,
                episode_file_name = "",
                episode_file_size = "",
            },
            onEpisodeViewerClick,
            index,
            setIndex,
        } = this.props;
        const { openAudioPlayer } = this.state;
        return (
            <>
                {!openAudioPlayer ? (
                    <div
                        className={`custom-episode-viewer ${!is_published ? "not-published" : ""}`}
                        onClick={onEpisodeViewerClick}
                    >
                        <div
                            className="play-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                this.setState({
                                    openAudioPlayer: true,
                                    crossIconClicked: false,
                                });
                                setIndex(index);
                            }}
                        >
                            <img
                                src="/assets/play-button.svg"
                                alt="play-button"
                            />
                        </div>
                        <div className="episode-file-details">
                            <div className="episode-name">{name}</div>
                            <div className="episode-num-live">
                                <div className="episode-num">
                                    S{season_number} . E{episode_number}
                                </div>
                                {is_published ? (
                                    <div className="live-circle">
                                        <div className="live-symbol"> </div>
                                        <div className="circle-symbol"></div>
                                    </div>
                                ) : (
                                    <div className="not-live">NOT LIVE</div>
                                )}
                            </div>
                            <div className="episode-description">
                                {description}
                            </div>
                        </div>
                    </div>
                ) : (
                    <CustomAudioPlayer
                        onClose={() => {
                            this.setState({
                                openAudioPlayer: false,
                                crossIconClicked: true,
                            });
                        }}
                        autoPlay
                        showCloseIcon
                        audioURL={episode_file}
                        episodeView
                        audioName={episode_file_name}
                        audioSize={episode_file_size}
                    />
                )}
            </>
        );
    }
}
