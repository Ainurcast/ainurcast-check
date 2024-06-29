import { takeLatest, call, put } from "redux-saga/effects";
//utils
import * as ApiList from "../../utils/apiList";
//actions
import * as loaderAction from "../loader/actions";
import * as snackbarAction from "../snackBar/actions";
import * as profileAction from "./actions";
//constants
import { CHANGE_PASSWORD, GET_USER_DETAILS, UPDATE_USER_DETAILS } from "./constants";

export function* changePassword(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.changePassword, action.payload);
        yield put(
            snackbarAction.showSnackBar({
                message: response?.data?.message,
                type: "success",
                showSnackbar: true,
            })
        );
    } catch (error) {
        yield put(
            profileAction.changePasswordErrData(error?.data?.message)
        );
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

export function* updateUserDetails(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.updateUserDetails,action.payload);
        if(response?.data){
            yield call(getUserDetails,true);
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

export function* getUserDetails(action) {
    if(action.payload){
        yield put(loaderAction.showLoader());
    }
    try {
        const response = yield call(ApiList.userDetails);
        yield put(
            profileAction.setUserDetails(response?.data)
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
        if(action.payload){
            yield put(loaderAction.hideLoader());
        }
    }
  }

export function* watchProfileSaga() {
    yield takeLatest(CHANGE_PASSWORD, changePassword);
    yield takeLatest(GET_USER_DETAILS, getUserDetails);
    yield takeLatest(UPDATE_USER_DETAILS, updateUserDetails);
}
