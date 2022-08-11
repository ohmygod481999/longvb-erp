import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { logoutUser } from "../store/actions";
import { useAuth } from "../Components/Hooks/AuthHooks.ts";

const AuthProtected = (props) => {
    const { isLoggedIn } = useAuth();

    console.log(isLoggedIn)

    if (isLoggedIn === null) {
        return <div>Loading...</div>
    }

    if (!isLoggedIn) {
        return (
            <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
            />
        );
    }

    return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    <>
                        {" "}
                        <Component {...props} />{" "}
                    </>
                );
            }}
        />
    );
};

export { AuthProtected, AccessRoute };
