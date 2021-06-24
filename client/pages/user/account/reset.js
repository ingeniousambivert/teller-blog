import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userData, userAuth } from "../../../state/user";
import { manageAccount } from "../../../state/user/thunks";
import Link from "next/link";

function ResetPassword() {
    const router = useRouter();
    const setUser = useSetRecoilState(userData);
    const setAuth = useSetRecoilState(userAuth);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [params, setParams] = useState(null);
    const [error, setError] = useState(null);
    const { asPath } = router;

    const resetUserPassword = async (data) => {
        setAuth(null);
        setUser(null);
        const response = await manageAccount("reset-password", data);
        return response;
    };

    useEffect(async () => {
        if (asPath.includes("?", "userId", "token")) {
            const queryPath = asPath.substring(20);
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
                setParams({ userId, token });
            } else {
                setError("Invalid Link");
            }
        } else {
            router.push("/");
        }
    }, [asPath]);

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        const { password, confirmPassword } = data;
        if (password === confirmPassword) {
            const response = await resetUserPassword({
                password,
                ...params
            });

            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError(response?.data?.error);
            }
        } else {
            setError("Passwords do not match");
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full md:w-7/12 lg:w-5/12 flex">
                        <div className="w-full p-5 ">
                            <h1 className="pt-4 text-2xl text-center font-bold">
                                Reset your password
                            </h1>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-2">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        {...register("password", { required: true })}
                                        className={
                                            errors.password
                                                ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                        }
                                        id="password"
                                        type="password"
                                        placeholder="Enter your new Password"
                                    />
                                    {errors.password?.type === "required" && (
                                        <p className="text-xs italic text-red-500">
                                            Please enter your new Password.
                                        </p>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="password">
                                        Confirm Password
                                    </label>
                                    <input
                                        {...register("confirmPassword", { required: true })}
                                        className={
                                            errors.confirmPassword
                                                ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                        }
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                    />
                                    {errors.confirmPassword?.type === "required" && (
                                        <p className="text-xs italic text-red-500">
                                            Please confirm your password
                                        </p>
                                    )}
                                </div>

                                <div className="mb-6 text-center">
                                    <Fragment>
                                        {loading ? (
                                            <button
                                                type="button"
                                                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 focus:outline-none focus:shadow-outline flex flex-row justify-center items-center space-x-5">
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white "
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Resetting
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 focus:outline-none focus:shadow-outline"
                                                type="submit">
                                                Reset Password
                                            </button>
                                        )}
                                    </Fragment>
                                </div>
                                <div className="text-center">
                                    <Fragment>
                                        {success && (
                                            <Fragment>
                                                <p className="text-blue-500">
                                                    Password Reset Successfully
                                                </p>
                                                <Link href="/signin">Sign In</Link>
                                            </Fragment>
                                        )}
                                        {error && (
                                            <div>
                                                <p className="text-red-500">
                                                    Error Resetting Password
                                                </p>
                                                <p className="text-red-500">{error}</p>
                                            </div>
                                        )}
                                    </Fragment>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
