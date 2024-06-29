import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as profileActions from "./actions";
import * as creationActions from "../creations/actions";
import Profile from "./profile";

function mapStateToProperties(state, ownProps) {
    const {
        profileReducer: { changePasswordErrData, userDetails },
        loaderReducer,
        creationReducer:{ imageData }
    } = state;

    return {
        passwordErrData: changePasswordErrData,
        showLoader: loaderReducer,
        userDetails,
        imageData
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...profileActions,
            uploadFile: creationActions.uploadFile,
        },
        dispatch
    );
}

export default connect(mapStateToProperties, mapDispatchToProps)(Profile);
