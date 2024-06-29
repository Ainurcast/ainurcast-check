import { CHANGE_PASSWORD_ERR_DATA, SET_USER_DETAILS } from "./constants";

const initialState = {
    changePasswordErrData: "",
    userDetails : {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_ERR_DATA: {
            return {
                ...state,
                changePasswordErrData: action.payload,
            };
        }
        case SET_USER_DETAILS: {
            return {
                ...state,
                userDetails: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
