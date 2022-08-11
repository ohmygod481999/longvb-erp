import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import {
    GET_LOGIN_FLOW,
    LOGIN,
    LOGIN_USER,
    LOGOUT_USER,
    SOCIAL_LOGIN,
} from "./actionTypes";
import {
    apiError,
    getLoginFlowSuccess,
    loginError,
    loginSuccess,
    logoutUserSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
    postFakeLogin,
    postJwtLogin,
    postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import ory from "../../../parties/ory.ts";

const fireBaseBackend = getFirebaseBackend();

function* getLoginFlow() {
    const res = yield call(() =>
        ory.initializeSelfServiceLoginFlowForBrowsers(
            false,
            undefined,
            undefined
        )
    );
    yield put(getLoginFlowSuccess(res.data));
}

function* login({ payload: { values, flowId, history } }) {
    try {
        // const res = yield call(() =>
        //     ory.submitSelfServiceLoginFlow(flowId, values)
        // );
        yield put(loginSuccess({
            id: 1,
            company_id: 1
        }))
        sessionStorage.setItem("authUser", JSON.stringify({
            data: {
                id: 1,
                company_id: 1
            },
            status: "success",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWQwOTUyNTU3NThiYjM0YWU4YzAyZSIsImlhdCI6MTY2MDE5NDgxNiwiZXhwIjoxNjY3OTcwODE2fQ.j-ikdkNia5Y6fzQIXhJblynSyXr1hm4Kzp_LUJ_UlrM"
        }));
        history.push("/dashboard");
    } catch (err) {
        console.log(err.response.data);
        yield put(loginError("Đăng nhập thất bại"));
    }
}

function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(postFakeLogin, {
            email: user.email,
            password: user.password,
        });
        sessionStorage.setItem("authUser", JSON.stringify(response));
        if (response.status === "success") {
            yield put(loginSuccess(response));
            history.push("/dashboard");
        } else {
            yield put(apiError(response));
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser() {
    try {
        sessionStorage.removeItem("authUser");
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = yield call(fireBaseBackend.logout);
            yield put(logoutUserSuccess(LOGOUT_USER, response));
        } else {
            yield put(logoutUserSuccess(LOGOUT_USER, true));
        }
    } catch (error) {
        yield put(apiError(LOGOUT_USER, error));
    }
}

function* socialLogin({ payload: { data, history, type } }) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const fireBaseBackend = getFirebaseBackend();
            const response = yield call(
                fireBaseBackend.socialLoginUser,
                data,
                type
            );
            sessionStorage.setItem("authUser", JSON.stringify(response));
            yield put(loginSuccess(response));
        } else {
            const response = yield call(postSocialLogin, data);
            sessionStorage.setItem("authUser", JSON.stringify(response));
            yield put(loginSuccess(response));
        }
        history.push("/dashboard");
    } catch (error) {
        yield put(apiError(error));
    }
}

function* authSaga() {
    yield takeLatest(GET_LOGIN_FLOW, getLoginFlow);
    yield takeLatest(LOGIN, login);
    yield takeEvery(LOGIN_USER, loginUser);
    yield takeLatest(SOCIAL_LOGIN, socialLogin);
    yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
