import {
    UPDATE_SNACKBAR,
    HIDE_SNACKBAR,
} from "./constants";

const initialState = {
    showSnackbar: false,
    message: "",
    type: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SNACKBAR: {
            return {
                ...state,
                showSnackbar: action.payload.showSnackbar,
                message: action.payload.message,
                type: action.payload.type
            }
        }

        case HIDE_SNACKBAR: {
            return {
                ...state,
                showSnackbar: false,
                message: '',
                type: ''
            }
        }

        default: {
            return state;
        }
    }
}

export default reducer;