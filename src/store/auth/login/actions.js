import {
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    API_ERROR,
    SOCIAL_LOGIN,
    RESET_LOGIN_FLAG,
    GET_LOGIN_FLOW,
    GET_LOGIN_FLOW_SUCCESS,
    LOGIN,
    LOGIN_ERROR,
} from "./actionTypes";

export const getLoginFlow = () => {
    return {
        type: GET_LOGIN_FLOW,
        payload: {},
    };
};

export const login = (values, flowId, history) => {
    return {
        type: LOGIN,
        payload: { values, flowId, history },
    };
};

export const getLoginFlowSuccess = (flow) => {
    return {
        type: GET_LOGIN_FLOW_SUCCESS,
        payload: { flow },
    };
};

export const loginUser = (user, history) => {
    return {
        type: LOGIN_USER,
        payload: { user, history },
    };
};

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    };
};

export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: error,
    };
};

export const logoutUser = (history) => {
    return {
        type: LOGOUT_USER,
        payload: { history },
    };
};

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {},
    };
};

export const apiError = (error) => {
    return {
        type: API_ERROR,
        payload: error,
    };
};

export const socialLogin = (data, history, type) => {
    return {
        type: SOCIAL_LOGIN,
        payload: { data, history, type },
    };
};

export const resetLoginFlag = () => {
    return {
        type: RESET_LOGIN_FLAG,
    };
};
