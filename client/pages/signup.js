import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userAuth } from "../state/user";
import { errorAlert } from "../components/alerts";
import { createUser, authenticateUser } from "../state/user/thunks";
import { PublicRoute } from "../routes";
import { SignUpForm } from "../components";

function SignUp() {
    const setUserAuth = useSetRecoilState(userAuth);

    const [loading, setLoading] = useState(false);

    const create = async (data) => {
        setLoading(true);
        const response = await createUser(data);
        if (response?.status === 200 || response?.status === 201) {
            const { email, password } = data;
            const auth = await authenticateUser({ email, password });

            if (auth?.status === 200 && auth.data !== null) {
                setUserAuth({
                    accessToken: auth.data.accessToken,
                    refreshToken: auth.data.refreshToken,
                    id: auth.data.id
                });
            } else {
                const errorMessage = auth?.data?.error;
                errorAlert(`Error : ${errorMessage}`, "topRight");
            }
        } else {
            const errorMessage = response?.data?.error;
            errorAlert(`Error : ${errorMessage}`, "topRight");
        }
        setLoading(false);
    };

    return (
        <PublicRoute>
            <div className="mx-5 md:mx-10">
                <SignUpForm createUser={create} loading={loading} />
            </div>
        </PublicRoute>
    );
}

export default SignUp;
