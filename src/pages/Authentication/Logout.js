import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { logoutUser } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { authMutations } from "../../states/auth/auth.mutations.ts";

const Logout = (props) => {
    const dispatch = useDispatch();

    // const { isUserLogout } = useSelector((state) => ({
    //   isUserLogout: state.Login.isUserLogout,
    // }));
    const isUserLogout = false;

    useEffect(() => {
        // dispatch(logoutUser());
        authMutations.logout(props.history);
    }, [dispatch]);

    if (isUserLogout) {
        return <Redirect to="/login" />;
    }

    return <></>;
};

Logout.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Logout);
