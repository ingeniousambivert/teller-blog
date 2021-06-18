import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userAuth } from "../state/user";
import { errorAlert } from "../components/alerts";
import { authenticateUser } from "../state/user/thunks";
import { PublicRoute } from "../routes";
import { SignInForm } from "../components";

function SignIn() {
    const setUserAuth = useSetRecoilState(userAuth);
    const [loading, setLoading] = useState(false);

    const authenticate = async (data) => {
        setLoading(true);
        const response = await authenticateUser(data);

        if (response.status === 200) {
            setUserAuth({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                id: response.data.id
            });
        } else {
            const errorMessage = response?.data?.error;
            errorAlert(`Error : ${errorMessage}`, "topRight");
        }
        setLoading(false);
    };

    return (
        <PublicRoute>
            <div className="mx-5 md:mx-10">
                <SignInForm authenticateUser={authenticate} loading={loading} />
            </div>
        </PublicRoute>
    );
}

export default SignIn;
