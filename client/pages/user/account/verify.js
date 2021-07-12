import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader } from "../../../components";
import { manageAccount } from "../../../state/user/thunks";

function VerifyUser() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(null);
    const { asPath } = router;

    const verifyUserEmail = async (userId, token) => {
        const response = await manageAccount("verify-user", { userId, token });
        return response;
    };

    useEffect(async () => {
        if (asPath.includes("?", "userId", "token")) {
            const queryPath = asPath.substring(21);
            const queries = queryPath.split("&");
            let userId = null;
            let token = null;
            queries.forEach((query) => {
                if (query.includes("userId")) {
                    userId = query.split("=")[1];
                }
                if (query.includes("token")) {
                    token = query.split("=")[1];
                }
            });
            if (userId && token) {
                const response = await verifyUserEmail(userId, token);
                if (response && response.status === 200) {
                    setVerified(true);
                } else {
                    setError(response?.data?.error);
                }
            } else {
                setError("Invalid Link");
            }
            setLoading(false);
        } else {
            router.push("/");
        }
    }, [asPath]);

    return (
        <div className="container mx-auto">
            {loading ? (
                <Loader text="Verifying..." />
            ) : (
                <div className="flex flex-col justify-center items-center space-y-5 text-center min-h-screen">
                    {verified ? (
                        <Fragment>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-40 w-40"
                                    viewBox="0 0 20 20"
                                    fill="#53b981">
                                    <path
                                        fillRule="evenodd"
                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p>Successfully Verified</p>
                            </div>
                            <div>
                                <Link href="user/profile">
                                    <p className="text-sm text-blue-500 underline">Goto Profile</p>
                                </Link>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-40 w-40"
                                    viewBox="0 0 20 20"
                                    fill="#ec4443">
                                    <path
                                        fillRule="evenodd"
                                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p>Verification Failed</p>
                            </div>
                            <div>
                                <p>{error}</p>
                            </div>
                        </Fragment>
                    )}
                </div>
            )}
        </div>
    );
}

export default VerifyUser;
