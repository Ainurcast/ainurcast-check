import {
    SHOW_LOADER,
    HIDE_LOADER,
} from "./constants";

export const showLoader = () => ({
    type: SHOW_LOADER,
});

export const hideLoader = () => ({
    type: HIDE_LOADER,
});
