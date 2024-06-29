import { GET_EPISODE_BY_ID, SET_EPISODE_DETAILS_BY_ID, UPDATE_EPISODE } from "./constants";

export const getEpisodeById = (payload) => ({
    type: GET_EPISODE_BY_ID,
    payload,
});

export const setEpisodeData = (payload) => ({
    type: SET_EPISODE_DETAILS_BY_ID,
    payload,
});


export const updateEpisode = (payload) => ({
    type: UPDATE_EPISODE,
    payload,
});
