import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as detailViewActions from "./actions";
import EpisodeDetailView from "./episodeDetailView";
import * as profileActions from "../profile/actions";

function mapStateToProperties(state, ownProps) {
    const {
        detailViewReducer: { episodeDetails },
        profileReducer: { userDetails },
        loaderReducer,
    } = state;
    return {
        episodeDetails,
        showLoader: loaderReducer,
        userDetails,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...detailViewActions,
            ...profileActions
        },
        dispatch
    );
}

export default connect(
    mapStateToProperties,
    mapDispatchToProps
)(EpisodeDetailView);
