import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { manageAccount } from "../../../state/user/thunks";

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const { email } = data;
        const response = await manageAccount("forgot-password", { email });
        if (response.status === 200) {
            setSent(true);
        } else {
            setError(response?.data?.error);
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
                                Forgot your password?
                            </h1>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <p className="block mb-2 text-xs text-center text-gray-700">
                                        Enter your email to recieve a link to reset your password
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        {...register("email", { required: true })}
                                        className={
                                            errors.email
                                                ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                        }
                                        id="email"
                                        type="email"
                                        placeholder="Enter your Email"
                                    />
                                    {errors.email?.type === "required" && (
                                        <p className="text-xs italic text-red-500">
                                            Please enter your Email Address.
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
                                                Sending Email
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 focus:outline-none focus:shadow-outline"
                                                type="submit">
                                                Send Email
                                            </button>
                                        )}
                                    </Fragment>
                                </div>
                                <div className="text-center">
                                    <Fragment>
                                        {sent && (
                                            <p className="text-blue-500">Successfully Sent Email</p>
                                        )}
                                        {error && (
                                            <div>
                                                <p className="text-red-500">Error Sending Email</p>
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

export default ForgotPassword;
