import { ReactiveVar } from "@apollo/client";
import { authState } from ".";
import { Auth } from "../../models/auth.model";
import { constants } from "../../Components/constants";

function createUpdateAuth(authState: ReactiveVar<Auth | null>) {
    return (userId: string, company_id: number) => {
        const auth = authState();
        authState({
            user: {
                id: userId,
                company_id: company_id,
            },
        });
    };
}

function createLogin(authState: ReactiveVar<Auth | null>) {
    return (email: string, password: string, history: any) => {
        const auth = authState();
        // get user info from server
        authState({
            user: {
                id: "7c978bbb-bb2f-4527-8851-4236c846d420",
                company_id: 1,
            },
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
        sessionStorage.removeItem(constants.AUTH_KEY);
        history.push("/login");
    };
}

export const authMutations = {
    updateAuth: createUpdateAuth(authState),
    login: createLogin(authState),
    logout: createLogout(authState),
};
