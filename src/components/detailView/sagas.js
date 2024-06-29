import { takeLatest, call, put } from "redux-saga/effects";
//utils
import * as ApiList from "../../utils/apiList";
//actions
import * as detailViewActions from "./actions";
import * as loaderAction from "../loader/actions";
import * as snackbarAction from "../snackBar/actions";
//constants
import { GET_EPISODE_BY_ID, UPDATE_EPISODE } from "./constants";

export function* getEpisodeById(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.getEpisodeDetails, action.payload);
        yield put(
            detailViewActions.setEpisodeData(
                response?.data?.episodes_info?.[0] ?? {}
            )
        );
    } catch (error) {
        yield put(
            snackbarAction.showSnackBar({
                message: error?.data?.message ?? "something went wrong!",
                type: "error",
                showSnackbar: true,
            })
        );
    } finally {
        yield put(loaderAction.hideLoader());
    }
}

export function* updateEpisode(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.updateEpisode, action.payload);
        yield put(
            detailViewActions.setEpisodeData(
                response?.data?.episode_info ?? {}
            )
        );
    } catch (error) {
        yield put(
            snackbarAction.showSnackBar({
                message: error?.data?.message ?? "something went wrong!",
                type: "error",
                showSnackbar: true,
            })
        );
    } finally {
        yield put(loaderAction.hideLoader());
    }
}

export function* watchDetailViewSaga() {
    yield takeLatest(GET_EPISODE_BY_ID, getEpisodeById);
    yield takeLatest(UPDATE_EPISODE, updateEpisode);
}
