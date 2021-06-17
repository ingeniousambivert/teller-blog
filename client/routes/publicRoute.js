import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../state/user";

function PublicRoute({ children }) {
    const isUserAuthenticated = useRecoilValue(isAuthenticated);
    const Router = useRouter();

    const render = (children) => {
        // checks whether on client / browser or server.
        if (typeof window !== "undefined") {
            if (isUserAuthenticated) {
                Router.replace("/user/profile");
                return null;
            }
            return children;
        }
        // if on server, return null
        return null;
    };
    useEffect(() => {}, [isUserAuthenticated]);

    return <Fragment>{render(children)}</Fragment>;
}

PublicRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
        .isRequired
};

export default PublicRoute;
