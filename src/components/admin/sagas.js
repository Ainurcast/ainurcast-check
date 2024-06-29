import { takeLatest, call, put } from "redux-saga/effects";
//utils
import * as ApiList from "../../utils/apiList";
//actions
import * as loaderAction from "../loader/actions";
import * as snackbarAction from "../snackBar/actions";
import * as adminAction from "./actions";
//constants
import { GET_ADMIN_USER, UPDATE_TABLE_DATA } from "./constants";

export function* getAdminUser() {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.adminUser);
        yield put(adminAction.setAdminUser(response?.data?.podcasrt_info));
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

export function* updateTableData(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.updateTableData, action.payload);
        if (response.status === 200) {
            const updatedAdminData = yield call(ApiList.adminUser);
            yield put(
                adminAction.setAdminUser(updatedAdminData?.data?.podcasrt_info)
            );
            yield put(
                snackbarAction.showSnackBar({
                    message: response?.data?.message || "something went wrong!",
                    type: "success",
                    showSnackbar: true,
                })
            );
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

export function* watchAdminSaga() {
    yield takeLatest(GET_ADMIN_USER, getAdminUser);
    yield takeLatest(UPDATE_TABLE_DATA, updateTableData);
}
