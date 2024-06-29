import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as adminActions from "./actions";
import * as profileActions from "../profile/actions";
import Admin from "./admin";

function mapStateToProperties(state) {
    const {
        adminReducer: { adminUserData },
        profileReducer: { userDetails },
        loaderReducer,
    } = state;

    return {
        showLoader: loaderReducer,
        userDetails,
        adminUserData
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...adminActions,
            ...profileActions
        },
        dispatch
    );
}

export default connect(
    mapStateToProperties,
    mapDispatchToProps
)(Admin);