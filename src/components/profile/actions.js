import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERR_DATA,
  GET_USER_DETAILS,
  SET_USER_DETAILS,
  UPDATE_USER_DETAILS,
} from "./constants";

export const changePassword = (payload) => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const changePasswordErrData = (payload) => ({
  type: CHANGE_PASSWORD_ERR_DATA,
  payload,
});

export const getUserDetails = (payload) => ({
  type: GET_USER_DETAILS,
  payload,
});

export const setUserDetails = (payload) => ({
  type: SET_USER_DETAILS,
  payload,
});

export const updateUserDetails = (payload) => ({
  type: UPDATE_USER_DETAILS,
  payload,
});
