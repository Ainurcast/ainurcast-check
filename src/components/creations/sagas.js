import { takeLatest, call, put } from "redux-saga/effects";
//utils
import * as ApiList from "../../utils/apiList";
//actions
import * as creationActions from "./actions";
import * as loaderAction from "../loader/actions";
import * as snackbarAction from "../snackBar/actions";
//constants
import {
    CREATE_PODCAST,
    GET_DROPDOWN_DATA,
    GET_PODCAST,
    UPLOAD_FILE,
    CREATE_EPISODE,
    GET_EPISODES,
    PUBLISH_PODCAST,
    UPDATE_PODCAST,
    VIOLATIONS_RETRY,
} from "./constants";

export function* getDropDownData(action) {
    if(action.payload){
        yield put(loaderAction.showLoader());
    }
    try {
        const response = yield call(ApiList.getDropDownData);
        yield put(creationActions.setDropdownData(response?.data?.res_data));
    } catch (error) {
        yield put(
            snackbarAction.showSnackBar({
                message: error?.data?.message ?? "something went wrong!",
                type: "error",
                showSnackbar: true,
            })
        );
    } finally {
        if(action.payload){
            yield put(loaderAction.hideLoader());
        }
    }
}

export function* uploadFile(action) {
    const { formData } = action.payload;
    const isEpisodeFile = JSON.parse(formData?.get("is_episode_file"));
    if (isEpisodeFile) {
        yield put(creationActions.toggleCustomAudioLoader());
    }
    try {
        const response = yield call(ApiList.uploadFile, action.payload);
        if (isEpisodeFile) {
            yield put(
                creationActions.setEpisodeMetadata(
                    response?.data?.res_data ?? {}
                )
            );
        } else {
            yield put(creationActions.setImageData(response?.data?.res_data));
        }
    } catch (error) {
        if(error){
            yield put(
                snackbarAction.showSnackBar({
                    message: error?.data?.message ?? "something went wrong!",
                    type: "error",
                    showSnackbar: true,
                })
            );
        }
    } finally {
        if (isEpisodeFile) {
            yield put(creationActions.toggleCustomAudioLoader());
        }
    }
}

export function* createPodcast(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.createPodcast, action.payload);
        yield put(creationActions.setPodcastData(response?.data?.podcast_info));
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

export function* getPodcast() {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.getPodcast);
        const podcastId = response?.data?.podcasrt_info?.[0]?.podcast_id;
        if (podcastId) {
            const episodeResponse = yield call(ApiList.getEpisodes, {
                podcast_id: podcastId,
            });
            yield put(
                creationActions.setEpisodes(
                    episodeResponse?.data?.episodes_info
                )
            );
        }
        yield put(
            creationActions.setPodcastData(
                response?.data?.podcasrt_info?.[0] || {}
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

export function* createEpisode(action) {
    yield put(loaderAction.showLoader());
    try {
        yield call(ApiList.createEpisode, action.payload);
        const episodeResponse = yield call(ApiList.getEpisodes, {
            podcast_id: action.payload?.podcast_id,
        });
        yield put(
            creationActions.setEpisodes(episodeResponse?.data?.episodes_info)
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

export function* getAllEpisodes(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.getEpisodes, action.payload);
        yield put(creationActions.setEpisodes(response?.data?.episodes_info));
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

export function* publishPodcast(action) {
    yield put(creationActions.toggleRssLoader());
    try {
        const response = yield call(ApiList.publishPodcast, action.payload);
        if (response?.data?.rss_feed_url) {
            const episodeResponse = yield call(ApiList.getEpisodes, {
                podcast_id: action.payload?.podcast_id,
            });
            yield put(
                creationActions.setEpisodes(
                    episodeResponse?.data?.episodes_info
                )
            );
            if(episodeResponse){
                const response = yield call(ApiList.getPodcast);
                yield put(
                    creationActions.setPodcastData(
                        response?.data?.podcasrt_info?.[0] || {}
                    )
                );
            }
        }
        yield put(creationActions.setRssFeed(response?.data?.rss_feed_url));
    } catch (error) {
        yield put(
            snackbarAction.showSnackBar({
                message: error?.data?.message ?? "something went wrong!",
                type: "error",
                showSnackbar: true,
            })
        );
    } finally {
        yield put(creationActions.toggleRssLoader());
    }
}

export function* updatePodcast(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.updatePodcast, action.payload);
        yield put(creationActions.setPodcastData(response?.data?.podcast_info));
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

export function* violationsRetry(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.violationsRetry, action.payload);
        if(response) {
            yield call(getPodcast);
        }
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

export function* watchCreationsSaga() {
    yield takeLatest(GET_DROPDOWN_DATA, getDropDownData);
    yield takeLatest(UPLOAD_FILE, uploadFile);
    yield takeLatest(CREATE_PODCAST, createPodcast);
    yield takeLatest(GET_PODCAST, getPodcast);
    yield takeLatest(CREATE_EPISODE, createEpisode);
    yield takeLatest(GET_EPISODES, getAllEpisodes);
    yield takeLatest(PUBLISH_PODCAST, publishPodcast);
    yield takeLatest(UPDATE_PODCAST, updatePodcast);
    yield takeLatest(VIOLATIONS_RETRY, violationsRetry);
}
