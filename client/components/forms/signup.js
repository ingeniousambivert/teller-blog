import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useForm } from "react-hook-form";

function SignUpForm(props) {
    const { createUser, loading } = props;
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        await createUser({
            ...data,
            profile: { bio: "", cover: "", picture: "" }
        });
    };

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex lg:shadow-md">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage: `url("https://images.unsplash.com/photo-1493612276216-ee3925520721?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80")`
                            }}></div>

                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h1 className="pt-4 text-2xl text-center font-bold">Welcome Onboard</h1>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="grid grid-cols-1 grid-flow-row md:grid-cols-2 md:grid-rows-1">
                                    <div className="mb-2">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="firstname">
                                            First Name
                                        </label>
                                        <input
                                            {...register("firstname", { required: true })}
                                            className={
                                                errors.firstname
                                                    ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                    : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                            }
                                            id="firstname"
                                            type="text"
                                            placeholder="Enter your First Name"
                                        />
                                        {errors.firstname?.type === "required" && (
                                            <p className="text-xs italic text-red-500">
                                                Please enter your First Name.
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:ml-2">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="lastname">
                                            Last Name
                                        </label>
                                        <input
                                            {...register("lastname", { required: true })}
                                            className={
                                                errors.lastname
                                                    ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                    : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                            }
                                            id="lastname"
                                            type="text"
                                            placeholder="Enter your Last Name"
                                        />
                                        {errors.lastname?.type === "required" && (
                                            <p className="text-xs italic text-red-500">
                                                Please enter your Last Name.
                                            </p>
                                        )}
                                    </div>
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
                                <div className="mb-4">
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
                                        placeholder="Enter your Password"
                                    />
                                    {errors.email?.type === "required" && (
                                        <p className="text-xs italic text-red-500">
                                            Please enter your Password.
                                        </p>
                                    )}
                                </div>
                                <div className="mb-6 text-center">
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
                                            Signing Up
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 focus:outline-none focus:shadow-outline"
                                            type="submit">
                                            Sign Up
                                        </button>
                                    )}
                                </div>
                                <hr className="mb-6 border-t" />

                                <div className="text-center">
                                    <span className="text-sm"> Already have an account?</span>
                                    <Link href="/signin">
                                        <button className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-500  transition duration-300 focus:outline-none">
                                            &nbsp;Sign In
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SignUpForm.propTypes = {
    createUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default SignUpForm;
