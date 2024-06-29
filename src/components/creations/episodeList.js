import React, { Component } from "react";
import { CustomEpisodeViewer } from "../customComponents";
import history from "../../utils/history";
import EpisodeListShimmer from ".././shimmers/episodeListShimmer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Media from "react-media";

export default class EpisodeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPlayerIndex: -1,
    };
  }
  onEpisodeViewerClick = (episodeId, podcastId) => {
    history.push(`/episodeDetailView/${episodeId}/${podcastId}`);
  };
  setIndex = (i) => {
    this.setState({
      audioPlayerIndex: i,
    });
  };
  render() {
    const { audioPlayerIndex } = this.state;
    const { allEpisodes, onNewEpisodeClick, showLoader, onMobileBackClick } = this.props;
    return showLoader ? (
      <EpisodeListShimmer />
    ) : (
        <>
        <Media query="(max-width: 768px)">
          {(matches) =>
            matches ? (
                <ArrowBackIcon onClick={() => onMobileBackClick()}/>
            ) : null
          }
        </Media>
      <div className="episode-list-wrapper">
        <div className="episodes-list">
          <div className="episode-header">
            <div className="epsiode-hd">Episodes</div>
            <div
              className="add-episode-cta"
              onClick={() => onNewEpisodeClick()}
            >
              +
            </div>
          </div>
          {allEpisodes?.map((episode, index) => {
            return (
              <CustomEpisodeViewer
                index={index}
                setIndex={(i) => this.setIndex(i)}
                audioPlayerIndex={audioPlayerIndex}
                onEpisodeViewerClick={() =>
                  this.onEpisodeViewerClick(
                    episode?.episode_id,
                    episode?.podcast_info?.podcast_id
                  )
                }
                episode={episode}
              />
            );
          })}
        </div>
      </div>
      </>
    );
  }
}
