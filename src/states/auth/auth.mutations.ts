import { ReactiveVar } from "@apollo/client";
import { authState } from ".";
import { AccountInfo, Auth } from "../../models/auth.model";
import { constants } from "../../Components/constants";
import { deleteCookie, getCookie } from "../../helpers";
import { config } from "../../config";

function createUpdateAuth(authState: ReactiveVar<Auth | null>) {
    return (accountInfo: AccountInfo) => {
        const auth = authState();
        authState({
            user: accountInfo,
        });
    };
}

function createLogin(authState: ReactiveVar<Auth | null>) {
    return (email: string, password: string, history: any) => {
        const auth = authState();
        // get user info from server
        const dummyAccountInfo: AccountInfo = {
            id: 1,
            company_id: 1,
            company: {
                id: 1,
                created_at: "",
                name: "dummy"
            },
            email: "test@gmail.com",
            account_info: {
                facebook: "facebook",
                phone: "01012020202",
            }
        };
        authState({
            user: dummyAccountInfo,
        });
        sessionStorage.setItem(constants.AUTH_KEY, "test-key");
        history.push("/dashboard");
    };
}

function createLogout(authState: ReactiveVar<Auth | null>) {
    return (history: any) => {
        const auth = authState();
        // get user info from server
        authState(null);
        const idToken = getCookie(constants.ID_TOKEN)
        deleteCookie(constants.AUTH_KEY);
        deleteCookie(constants.ID_TOKEN);
        // history.push("https://longvb.ddns.net:5444/oauth2/sessions/logout");
        window.location.replace(`${process.env.REACT_APP_HYDRA_URL}/oauth2/sessions/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${config.HOST}`);
    };
}

export const authMutations = {
    updateAuth: createUpdateAuth(authState),
    login: createLogin(authState),
    logout: createLogout(authState),
};
