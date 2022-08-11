import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";
import { GET_AUTH } from "../../states/auth/auth.queries";
import { Auth } from "../../models/auth.model";
import { constants } from "../constants/index";
import { authMutations } from "../../states/auth/auth.mutations";

const useAuth = () => {
    const { data } = useQuery<{ auth: Auth }>(GET_AUTH);

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean | null>(null);

    useEffect(() => {
        if (data && data.auth) {
            setIsLoggedIn(true);
        } else {
            const accessToken = sessionStorage.getItem(constants.AUTH_KEY);
            if (accessToken) {
                // get user Info
                const userInfo = {
                    id: "7c978bbb-bb2f-4527-8851-4236c846d420",
                    company_id: 1,
                };
                authMutations.updateAuth(userInfo.id, userInfo.company_id);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
    }, [data]);

    const isLoggedInasd = useMemo(() => {
        if (data?.auth) return true;
        const accessToken = sessionStorage.getItem(constants.AUTH_KEY);
        if (accessToken) {
            // get user info
            const userInfo = {
                id: "7c978bbb-bb2f-4527-8851-4236c846d420",
                company_id: 1,
            };
            authMutations.updateAuth(userInfo.id, userInfo.company_id);
        }
        return false;
    }, [data]);

    return { isLoggedIn };
};

const useProfile = () => {
    const { data } = useQuery<{ auth: Auth }>(GET_AUTH);

    const userProfile = useMemo(() => {
        if (data?.auth) {
            return data.auth.user;
        }
        return null;
    }, [data]);

    return { userProfile };
};

export { useAuth, useProfile };
