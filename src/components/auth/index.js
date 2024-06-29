import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Auth from "./auth";
import * as authActions from "./actions";

function mapStateToProperties(state, ownProps) {
    const {
        authReducer: {
            loginData = {},
            successRegister = false,
            registerData = {},
            resetPasswordSuccess = "",
        },
        loaderReducer,
    } = state;

    return {
        loginData,
        successRegister,
        forgotPasswordSuccess: resetPasswordSuccess,
        registerData,
        routeParams: ownProps?.match?.params,
        showLoader: loaderReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...authActions,
        },
        dispatch
    );
}

export default connect(mapStateToProperties, mapDispatchToProps)(Auth);
