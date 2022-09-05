import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { GET_ACCOUNT_INFO, GET_AUTH } from "../../states/auth/auth.queries";
import { AccountInfo, Auth } from "../../models/auth.model";
import { constants } from "../constants/index";
import { authMutations } from "../../states/auth/auth.mutations";
import { getCookie } from "../../helpers";
import { graphqlClient } from "../../helpers/graphql-client";
import { axiosInstance } from "../../helpers/api_helper";

const useAuth = () => {
    const { data } = useQuery<{ auth: Auth }>(GET_AUTH);

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean | null>(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (data && data.auth) {
            setIsLoggedIn(true);
        } else {
            const accessToken = getCookie(constants.AUTH_KEY);
            const refreshToken = getCookie(constants.REFRESH_TOKEN);

            if (accessToken) {
                // get user Info
                axiosInstance
                    .get("/oauth/userinfo", {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                            refreshtoken: refreshToken,
                        },
                        withCredentials: true,
                    })
                    .then(({ data }) => {
                        const accountInfo = data;
                        if (!accountInfo) {
                            // user not yet registerd
                            console.log("user not yet registerd");
                            setErrorMsg("user not yet registerd");
                            setIsLoggedIn(false);
                        }
                        const { email, id, company, account_info } =
                            accountInfo;

                        console.log(accountInfo);

                        // const company_id = 1;
                        // accountInfo.company_id = company_id;
                        authMutations.updateAuth(accountInfo);
                        setIsLoggedIn(true);
                    })
                    .catch((err) => {
                        console.log(err);
                        setErrorMsg(err);

                        setIsLoggedIn(false);
                    });
                // graphqlClient
                //     .query({
                //         query: GET_ACCOUNT_INFO,
                //     })
                //     .then(({ data }) => {
                //         const { accountInfo }: { accountInfo: AccountInfo } =
                //             data;

                //         if (!accountInfo) {
                //             // user not yet registerd
                //             console.log("user not yet registerd");
                //             setErrorMsg("user not yet registerd");
                //             setIsLoggedIn(false);
                //         }
                //         const { email, id, company_id, account_info } =
                //             accountInfo;

                //         console.log(accountInfo);

                //         // const company_id = 1;
                //         // accountInfo.company_id = company_id;
                //         authMutations.updateAuth(accountInfo);
                //         setIsLoggedIn(true);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //         setErrorMsg(err);

                //         setIsLoggedIn(false);
                //     });
            } else {
                setIsLoggedIn(false);
            }
        }
    }, [data]);

    const hadAccess = useMemo(() => {
        if (data?.auth?.user?.company_id) {
            return true;
        }
        return false;
    }, [data]);

    return { isLoggedIn, hadAccess, errorMsg };
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
