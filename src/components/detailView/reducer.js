import { SET_EPISODE_DETAILS_BY_ID } from "./constants";

const initialState = {
    episodeDetails: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EPISODE_DETAILS_BY_ID: {
            return {
                ...state,
                episodeDetails: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
