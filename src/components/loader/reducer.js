import {
    SHOW_LOADER,
    HIDE_LOADER,
} from "./constants";

const loader = false;

const reducer = (state = loader, action) => {
    switch (action.type) {
        case SHOW_LOADER: {
            return true;
        }

        case HIDE_LOADER: {
            return false;
        }

        default: {
            return state;
        }
    }
}

export default reducer;