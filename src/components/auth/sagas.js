import { takeLatest, call, put } from "redux-saga/effects";
//utils
import * as ApiList from "../../utils/apiList";
import history from "../../utils/history";
import forge from "node-forge";
//actions
import * as loginActions from "./actions";
import * as loaderAction from "../loader/actions";
import * as snackbarAction from "../snackBar/actions";
//urls
import { DO_LOGIN, REGISTER_USER, VERIFY_EMAIL, RESET_PASSWORD, SET_PASSWORD, RESEND_EMAIL } from "./constants";

function encryptData(publicEncryptionKey, pwd) {
    const decodedPublicKey = forge.util.decode64(publicEncryptionKey);
    const publicKey = forge.pki.publicKeyFromPem(decodedPublicKey);
    const encrypted = publicKey.encrypt(pwd);
    const base64Encrypted = forge.util.encode64(encrypted);
    return base64Encrypted;
  }

export function* doLogin(action) {
    yield put(loaderAction.showLoader());
    try {
        const { email, password } = action?.payload;
        const response = yield call(ApiList.passwordHash, { email });
        if(response?.data){
            // const encryptedPassword = encryptData(response?.data?.public_key, password);
            const encryptedPassword = password;

            const loginResponse = yield call(ApiList.doLogin, {
                email,
                password : encryptedPassword,
                token_id : response?.data?.token_id,
            });
            if(loginResponse?.data){
                yield put(loginActions.setLoginData(loginResponse?.data));
                localStorage.setItem("SESSION-TOKEN", loginResponse?.data?.token);
                localStorage.setItem("USER-CODE", loginResponse?.data?.user_id);
                localStorage.setItem("EMAIL", loginResponse?.data?.email);
                localStorage.setItem("FIRST-NAME", `${loginResponse?.data?.first_name}`);
                localStorage.setItem("LAST-NAME", `${loginResponse?.data?.last_name}`);
                if(loginResponse?.data?.is_admin){
                    history.push("/admin");
                } else {
                    history.push("/home");
                }
            }
        }
    } catch (error) {
        console.log("error",error)
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

export function* registerUser(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.registerUser, action.payload);
        yield put(loginActions.registerSuccess(response?.data));
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

export function* verifyEmail(action) {
  yield put(loaderAction.showLoader());
  try {
      const response = yield call(ApiList.verifyEmail, action.payload);
    //   if(response?.data?.message){
    //     history.push("/auth");
    //   }
      yield put(
          snackbarAction.showSnackBar({
              message: response?.data?.message,
              type: "success",
              showSnackbar: true,
          })
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

export function* resetPassword(action) {
  yield put(loaderAction.showLoader());
  yield put(loginActions.resetPasswordSuccess(""));
  try {
      const response = yield call(ApiList.resetPassword, action.payload);
      if(response?.data?.message){
        yield put(loginActions.resetPasswordSuccess(action?.payload?.email));
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

export function* setPassword(action) {
  yield put(loaderAction.showLoader());
  try {
      const response = yield call(ApiList.setPassword, action.payload);
      if(response?.data?.message){
        history.push("/auth");
      }
      yield put(
          snackbarAction.showSnackBar({
              message: response?.data?.message,
              type: "success",
              showSnackbar: true,
          })
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

export function* resendEmail(action) {
    yield put(loaderAction.showLoader());
    try {
        const response = yield call(ApiList.resendEmail, action.payload);
        yield put(
            snackbarAction.showSnackBar({
                message: response?.data?.message,
                type: "success",
                showSnackbar: true,
            })
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

export function* watchAuthSaga() {
    yield takeLatest(DO_LOGIN, doLogin);
    yield takeLatest(REGISTER_USER, registerUser);
    yield takeLatest(VERIFY_EMAIL, verifyEmail);
    yield takeLatest(RESET_PASSWORD,resetPassword);
    yield takeLatest(SET_PASSWORD,setPassword);
    yield takeLatest(RESEND_EMAIL, resendEmail);
}
