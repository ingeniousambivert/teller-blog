import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

function SignUpForm() {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const onSubmit = (data) => console.log(data);

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
                                            htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            {...register("firstName", { required: true })}
                                            className={
                                                errors.firstName
                                                    ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                    : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                            }
                                            id="firstName"
                                            type="text"
                                            placeholder="Enter your First Name"
                                        />
                                        {errors.firstName?.type === "required" && (
                                            <p className="text-xs italic text-red-500">
                                                Please enter your First Name.
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:ml-2">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            {...register("lastName", { required: true })}
                                            className={
                                                errors.lastName
                                                    ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                    : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                            }
                                            id="lastName"
                                            type="text"
                                            placeholder="Enter your Last Name"
                                        />
                                        {errors.lastName?.type === "required" && (
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
                                                ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
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
                                                ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
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
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Register Account
                                    </button>
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

function SignInForm() {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex lg:shadow-md">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage: `url("https://images.unsplash.com/photo-1585834901549-f0f6f0115bea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80")`
                            }}></div>

                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h1 className="pt-4 text-2xl text-center font-bold">Welcome Back</h1>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
                                                ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
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
                                                ? "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                                : "w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-3xl shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
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
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Sign In
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-500 transition duration-300"
                                        href="/">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="text-center">
                                    <span className="text-sm">Don&apos;t have an account?</span>
                                    <Link href="/signup">
                                        <button className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-500 transition duration-300 focus:outline-none">
                                            &nbsp;Sign Up
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

export { SignUpForm, SignInForm };
