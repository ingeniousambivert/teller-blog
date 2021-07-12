import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import { PostsContainer } from "../../containers";
import { PrivateRoute } from "../../routes";
import { useRecoilState } from "recoil";
import { userAuth, userData } from "../../state/user";
import { getUser, revokeUserAccess } from "../../state/user/thunks";

function Posts() {
    const [auth, setAuth] = useRecoilState(userAuth);
    const [data, setData] = useRecoilState(userData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signOut = async () => {
        // auth && (await revokeUserAccess());
        setAuth(null);
        setData(null);
        setError(null);
    };

    const getData = async () => {
        setLoading(true);
        const response = await getUser(auth?.id);
        if (response.status === 200) {
            setData(await response.data);
        } else if (response.status === 401) {
            signOut();
        } else {
            setError(response);
        }
        setLoading(false);
    };

    const renderError = (error) => {
        console.log(error);
        return (
            <div className="container mx-auto">
                <div className="flex flex-col justify-center items-center space-y-5">
                    <div role="alert" className="w-3/4 md:w-1/2">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            <p>There was an error</p>
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>{error?.data?.error}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={signOut}
                            className="px-5 py-1 border-2 border-red-600 rounded-3xl text-white bg-red-600 hover:bg-red-500 hover:border-red-500 transition duration-300 focus:outline-none">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    useEffect(async () => {
        await getData();
    }, [auth]);

    return (
        <PrivateRoute>
            {error ? (
                renderError(error)
            ) : loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div className="mx-14 space-y-2">
                    <PostsContainer user={data} getData={getData} signOut={signOut} />
                </div>
            )}
        </PrivateRoute>
    );
}

export default Posts;
