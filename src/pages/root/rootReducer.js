/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "../../components/auth/reducer";
import creationReducer from "../../components/creations/reducer";
import detailViewReducer from "../../components/detailView/reducer";
import loaderReducer from "../../components/loader/reducer";
import snackBarReducer from "../../components/snackBar/reducer";
import profileReducer from "../../components/profile/reducers";
import adminReducer from "../../components/admin/reducers";

export default function createRootReducer(history) {
    const rootReducer = combineReducers({
        router: connectRouter(history),
        authReducer,
        loaderReducer,
        snackBarReducer,
        creationReducer,
        detailViewReducer,
        profileReducer,
        adminReducer,
    });

    return rootReducer;
}
