import { GET_ADMIN_USER, SET_ADMIN_USER, UPDATE_TABLE_DATA } from "./constants";

export const getAdminUser = () => ({
    type: GET_ADMIN_USER,
});

export const setAdminUser = (payload) => ({
    type: SET_ADMIN_USER,
    payload,
});

export const updateTableData = (payload) => ({
    type: UPDATE_TABLE_DATA,
    payload,
});