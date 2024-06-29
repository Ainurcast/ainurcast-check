import {
    SET_DROPDOWN_DATA,
    SET_EPISODE_MEATADATA,
    SET_IMAGE_DATA,
    TOGGLE_AUDIO_LOADER,
    SET_PODCAST,
    SET_PODCAST_ID,
    SET_EPISODES,
    TOGGLE_RSS_LOADER,
    SET_RSS_DATA,
    CLEAR_REDUCER,
} from "./constants";

const initialState = {
    dropDownData: [],
    imageData: {},
    audioLoader: false,
    episodeMediaMetaData: {},
    podcastData: {},
    podcastId: "",
    allEpisodes: [],
    showRssProgressBar: false,
    rssFeedUrl: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGE_DATA: {
            return {
                ...state,
                imageData: action.payload,
            };
        }

        case SET_DROPDOWN_DATA: {
            return {
                ...state,
                dropDownData: action.payload,
            };
        }

        case TOGGLE_AUDIO_LOADER: {
            return {
                ...state,
                audioLoader: !state.audioLoader,
            };
        }

        case SET_EPISODE_MEATADATA: {
            return {
                ...state,
                episodeMediaMetaData: action.payload,
            };
        }

        case SET_PODCAST: {
            return {
                ...state,
                podcastData: action.payload,
            };
        }

        case SET_PODCAST_ID: {
            return {
                ...state,
                podcastId: action.payload,
            };
        }

        case SET_EPISODES: {
            return {
                ...state,
                allEpisodes: action.payload,
            };
        }

        case TOGGLE_RSS_LOADER: {
            return {
                ...state,
                showRssProgressBar: !state.showRssProgressBar,
            };
        }

        case SET_RSS_DATA: {
            return {
                ...state,
                rssFeedUrl: action.payload,
            };
        }

        case CLEAR_REDUCER: {
            return initialState;
        }

        default: {
            return state;
        }
    }
};

export default reducer;
