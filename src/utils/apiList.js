import { get, post, put } from "./api";
import urls from "./urls";

// Example
// with request query
// export const fetchAuthMode = (data) => get(urls.FETCH_AUTH_MODE, data);

//AUTHENTICATION
export const doLogin = (loginData) => post(urls.LOGIN, loginData);
export const registerUser = (registerData) => post(urls.REGISTER, registerData);
export const userDetails = () => get(urls.USER_DETAILS);
export const updateUserDetails = (data) => put(urls.USER_DETAILS,data);
export const verifyEmail = (data) => get(`${urls.VERIFY_EMAIL}/${data}`);
export const resetPassword = (data) => post(urls.RESET_PASSWORD,data);
export const setPassword = (data) => post(urls.SET_PASSWORD,data);
export const resendEmail = (data) => post(urls.RESEND_EMAIL,data);
export const passwordHash = (data) => post(urls.PASSWORD_HASH,data);

//HOME
export const getPodcast = () => get(urls.USER_PODCAST);
export const getEpisodes = (data) => get(urls.GET_EPISODES, data);
export const getEpisodeDetails = (data) => get(urls.GET_EPISODE_DETAILS, data);

//Creations
export const createPodcast = (data) => post(urls.CREATE_PODCAST, data);
export const updatePodcast = (data) => post(urls.UPDATE_PODCAST, data);
export const createEpisode = (data) => post(urls.CREATE_EPISODE, data);
export const getDropDownData = () => get(urls.GET_DROPDOWN_DATA);
export const uploadFile = ({ formData, cancelToken, ...rest }) =>
    post(urls.UPLOAD_FILE, {
        formData: formData,
        isFormData: true,
        cancelToken: cancelToken,
        ...rest
    });
//Updations
export const updateEpisode = (data) => post(urls.UPDATE_EPISODE, data);

//publish podcast
export const publishPodcast = (data) => post(urls.PUBLISH_PODCAST, data);

// Violations Retry
export const violationsRetry = (data) => post(`${urls.VIOLATIONS_RETRY}${data.ott_id}`);

//Profile
export const changePassword = (data) => post(urls.CHANGE_PASSWORD, data);

//Admin

export const adminUser = () => get(urls.ADMIN_USER);
export const updateTableData = (data) => put(urls.ADMIN_USER, data);
