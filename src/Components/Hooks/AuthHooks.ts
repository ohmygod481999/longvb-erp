import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";
import { GET_AUTH } from "../../states/auth/auth.queries.ts";
import { Auth } from "../../models/auth.model.ts";
import { constants } from "../constants/index.ts";
import { authMutations } from "../../states/auth/auth.mutations.ts";

const useAuth = () => {
    const { data } = useQuery<{ auth: Auth }>(GET_AUTH);

    console.log(data.auth);

    // const [loading, setLoading] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        if (data.auth) {
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
        if (data.auth) return true;
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

export { useAuth };
