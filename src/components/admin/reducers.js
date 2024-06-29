import { SET_ADMIN_USER  } from "./constants";

const initialState = {
    adminUserData: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN_USER: {
            return {
                ...state,
                adminUserData: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
