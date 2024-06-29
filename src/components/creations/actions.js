import {
    GET_DROPDOWN_DATA,
    SET_DROPDOWN_DATA,
    UPLOAD_FILE,
    SET_IMAGE_DATA,
    CREATE_PODCAST,
    TOGGLE_AUDIO_LOADER,
    SET_EPISODE_MEATADATA,
    GET_PODCAST,
    SET_PODCAST,
    SET_PODCAST_ID,
    CREATE_EPISODE,
    GET_EPISODES,
    SET_EPISODES,
    SET_RSS_DATA,
    PUBLISH_PODCAST,
    TOGGLE_RSS_LOADER,
    UPDATE_PODCAST,
    CLEAR_REDUCER,
    VIOLATIONS_RETRY
} from "./constants";

export const getDropdownData = (payload) => ({
    type: GET_DROPDOWN_DATA,
    payload,
});

export const setDropdownData = (payload) => ({
    type: SET_DROPDOWN_DATA,
    payload,
});

export const uploadFile = (payload) => ({
    type: UPLOAD_FILE,  
    payload,
});

export const toggleCustomAudioLoader = () => ({
    type: TOGGLE_AUDIO_LOADER,
});

export const setEpisodeMetadata = (payload) => ({
    type: SET_EPISODE_MEATADATA,
    payload,
});

export const setImageData = (payload) => ({
    type: SET_IMAGE_DATA,
    payload,
});

//PodCast Actions

export const setPodcastId = (payload) => ({
    type: SET_PODCAST_ID,
    payload,
});

export const getPodcast = (payload) => ({
    type: GET_PODCAST,
    payload,
});

export const setPodcastData = (payload) => ({
    type: SET_PODCAST,
    payload,
});

export const createPodcast = (payload) => ({
    type: CREATE_PODCAST,
    payload,
});

export const updatePodcast = (payload) => ({
    type: UPDATE_PODCAST,
    payload,
});

// Create Episode

export const createEpisode = (payload) => ({
    type: CREATE_EPISODE,
    payload,
});

export const getAllEpisodes = (payload) => ({
    type: GET_EPISODES,
    payload,
});

export const setEpisodes = (payload) => ({
    type: SET_EPISODES,
    payload,
});

// Publish Podcast

export const publishPodcast = (payload) => ({
    type: PUBLISH_PODCAST,
    payload,
});

export const toggleRssLoader = () => ({
    type: TOGGLE_RSS_LOADER,
});

export const setRssFeed = (payload) => ({
    type: SET_RSS_DATA,
    payload,
});

export const clearReducer = (payload) => ({
    type: CLEAR_REDUCER,
    payload,
});


// Retry

export const violationsRetry = (payload) => ({
    type: VIOLATIONS_RETRY,
    payload,
});
