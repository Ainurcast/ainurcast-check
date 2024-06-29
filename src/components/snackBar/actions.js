import {
    SHOW_SNACKBAR,
    UPDATE_SNACKBAR,
    HIDE_SNACKBAR,
} from "./constants";
export const showSnackBar = (payload) => {
    return {
        type: SHOW_SNACKBAR,
        payload
    }
}

export const hideSnackBar = (payload) => {
    return {
        type: HIDE_SNACKBAR,
        payload
    }
}

export const updateSnackBar = (payload) => {
    return {
        type: UPDATE_SNACKBAR,
        payload
    }
}