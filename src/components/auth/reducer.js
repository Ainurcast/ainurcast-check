import { REGISTER_SUCCESS, SET_LOGIN_DATA, RESET_PASSWORD_SUCCESS } from "./constants";

const initialState = {
    loginData: {},
    successRegister: false,
    registerData: {},
    resetPasswordSuccess: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_DATA: {
            return {
                ...state,
                loginData: action.payload,
            };
        }

        case REGISTER_SUCCESS:
            return {
                ...state,
                successRegister: !state.successRegister,
                registerData: action.payload
            };
        
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload,
            }

        default: {
            return state;
        }
    }
};

export default reducer;
