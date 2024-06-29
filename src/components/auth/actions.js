import {
    SET_LOGIN_DATA,
    DO_LOGIN,
    REGISTER_USER,
    REGISTER_SUCCESS,
    VERIFY_EMAIL,
    RESET_PASSWORD,
    SET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESEND_EMAIL,
} from "./constants";

export const setLoginData = (payload) => ({
    type: SET_LOGIN_DATA,
    payload,
});

export const doLogin = (payload) => ({
    type: DO_LOGIN,
    payload,
});

export const registerUser = (payload) => ({
    type: REGISTER_USER,
    payload,
});

export const registerSuccess = (payload) => ({
    type: REGISTER_SUCCESS,
    payload,
});

export const verifyEmail = (payload) => ({
    type: VERIFY_EMAIL,
    payload,
});

export const resetPassword = (payload) => ({
    type: RESET_PASSWORD,
    payload,
});

export const setPassword = (payload) => ({
    type: SET_PASSWORD,
    payload,
});

export const resetPasswordSuccess = (payload) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload,
});

export const resendEmail = (payload) => ({
    type: RESEND_EMAIL,
    payload,
});
