import { ReactiveVar } from "@apollo/client";
import { authState } from ".";
import { AccountInfo, Auth } from "../../models/auth.model";
import { constants } from "../../Components/constants";
import { deleteCookie } from "../../helpers";

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
            email: "test@gmail.com",
            facebook: "facebook",
            name: "test",
            phone: "01012020202",
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
        deleteCookie(constants.AUTH_KEY);
        history.push("/login");
    };
}

export const authMutations = {
    updateAuth: createUpdateAuth(authState),
    login: createLogin(authState),
    logout: createLogout(authState),
};
