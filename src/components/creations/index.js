import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import CreatePodcast from "./createPodcast";
import * as creationActions from "./actions";
import * as profileActions from "../profile/actions";
// import CreateEpisode from "./createEpisode";
import StepwiseCreation from "./stepwiseCreation";

function mapStateToProperties(state, ownProps) {
    const {
        creationReducer: {
            dropDownData,
            imageData,
            audioLoader,
            episodeMediaMetaData,
            podcastData,
            podcastId,
            allEpisodes,
            showRssProgressBar,
            rssFeedUrl,
        },
        loaderReducer,
        authReducer,
        profileReducer: { userDetails }
    } = state;
    return {
        // Data related to create podcast
        dropDownData,
        imageData,
        audioLoader,
        episodeMediaMetaData,
        podcastData,
        showLoader: loaderReducer,
        ...authReducer,
        podcastId,
        showRssProgressBar,
        rssFeedUrl,
        // Data related to create episode
        routeParams: ownProps?.match?.params,
        allEpisodes,
        userDetails,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...creationActions,
            ...profileActions,
        },
        dispatch
    );
}

export default connect(
    mapStateToProperties,
    mapDispatchToProps
)(StepwiseCreation);
