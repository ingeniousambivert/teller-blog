import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

function UpdateData(props) {
    const { user, setEdit, setEditData, updateUserData, loading } = props;
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        defaultValues: {
            firstname: user?.firstname,
            lastname: user?.lastname,
            bio: user?.profile?.bio
        }
    });

    const hideEditView = () => {
        setEdit(false);
        setEditData(false);
    };

    const onSubmit = async (data) => {
        const { firstname, lastname, bio } = data;
        await updateUserData({ firstname, lastname, "profile.bio": bio });
        hideEditView();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div>
                        <input
                            {...register("firstname", { required: true })}
                            className={
                                errors.firstname
                                    ? "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                    : "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
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
                    <div>
                        <input
                            {...register("lastname", { required: true })}
                            className={
                                errors.lastname
                                    ? "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                    : "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
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
                <div>
                    <textarea
                        style={{ resize: "none" }}
                        {...register("bio", { maxLength: 240 })}
                        className={
                            errors.bio
                                ? "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                : "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                        }
                        id="bio"
                        type="text"
                        placeholder="Add a bio"
                    />
                    {errors.bio?.type === "maxLength" && (
                        <p className="text-xs italic text-red-500">
                            Your bio can only be 100 charatcters or less
                        </p>
                    )}
                </div>
                <div className="flex flex-row gap-3 mt-5">
                    <div className="text-white text-sm text-center">
                        {loading ? (
                            <button
                                type="button"
                                className="bg-blue-600 transition duration-300 py-1.5 px-2.5 hover:bg-blue-500 rounded-2xl focus:outline-none  flex flex-row justify-center items-center space-x-3">
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
                                Updating
                            </button>
                        ) : (
                            <button
                                className="bg-blue-600 transition duration-300 py-1.5 px-3 hover:bg-blue-500 rounded-2xl focus:outline-none"
                                type="submit">
                                Update
                            </button>
                        )}
                    </div>
                    <div className="text-sm text-center">
                        <button
                            onClick={hideEditView}
                            className="transition duration-300 py-1.5 px-3 border hover:border-gray-400 rounded-2xl focus:outline-none ">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
function UpdateEmail(props) {
    const { user, setEdit, setEditEmail, updateUserEmail, loading } = props;
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        defaultValues: user
    });

    const hideEditView = () => {
        setEdit(false);
        setEditEmail(false);
    };

    const onSubmit = async (data) => {
        const { email, password } = data;
        await updateUserEmail({ email, password });
        hideEditView();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <div className="w-72">
                    <input
                        {...register("email", { required: true })}
                        className={
                            errors.email
                                ? "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                : "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                        }
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-xs italic text-red-500">Please enter your email</p>
                    )}
                </div>
                <div className="w-72">
                    <input
                        {...register("password", { required: true })}
                        className={
                            errors.password
                                ? "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                : "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                        }
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    {errors.password?.type === "required" && (
                        <p className="text-xs italic text-red-500">Please enter your password</p>
                    )}
                </div>

                <div className="flex flex-row gap-3 mt-5">
                    <div className="text-white text-sm text-center">
                        {loading ? (
                            <button
                                type="button"
                                className="bg-blue-600 transition duration-300 py-1.5 px-2.5 hover:bg-blue-500 rounded-2xl focus:outline-none  flex flex-row justify-center items-center space-x-3">
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
                                Updating
                            </button>
                        ) : (
                            <button
                                className="bg-blue-600 transition duration-300 py-1.5 px-3 hover:bg-blue-500 rounded-2xl focus:outline-none"
                                type="submit">
                                Update
                            </button>
                        )}
                    </div>
                    <div className="text-sm text-center">
                        <button
                            onClick={hideEditView}
                            className="transition duration-300 py-1.5 px-3 border hover:border-gray-400 rounded-2xl focus:outline-none ">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
function UpdatePassword(props) {
    const { setEdit, setEditPassword, updateUserPassword, loading } = props;
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const hideEditView = () => {
        setEdit(false);
        setEditPassword(false);
    };

    const onSubmit = async (data) => {
        const { currentPassword, newPassword } = data;
        await updateUserPassword({ currentPassword, newPassword });
        hideEditView();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <div className="w-72">
                    <input
                        {...register("currentPassword", { required: true })}
                        className={
                            errors.currentPassword
                                ? "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                : "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                        }
                        id="currentPassword"
                        type="password"
                        placeholder="Enter your current password"
                    />
                    {errors.currentPassword?.type === "required" && (
                        <p className="text-xs italic text-red-500">
                            Please enter your current password
                        </p>
                    )}
                </div>
                <div className="w-72">
                    <input
                        {...register("newPassword", { required: true })}
                        className={
                            errors.newPassword
                                ? "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-red-500 focus:border-red-500   focus:z-10"
                                : "block w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl appearance-none focus:outline-none focus:shadow-outline focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                        }
                        id="newPassword"
                        type="password"
                        placeholder="Enter your new password"
                    />
                    {errors.newPassword?.type === "required" && (
                        <p className="text-xs italic text-red-500">
                            Please enter your new password
                        </p>
                    )}
                </div>

                <div className="flex flex-row gap-3 mt-5">
                    <div className="text-white text-sm text-center">
                        {loading ? (
                            <button
                                type="button"
                                className="bg-blue-600 transition duration-300 py-1.5 px-2.5 hover:bg-blue-500 rounded-2xl focus:outline-none  flex flex-row justify-center items-center space-x-3">
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
                                Updating
                            </button>
                        ) : (
                            <button
                                className="bg-blue-600 transition duration-300 py-1.5 px-3 hover:bg-blue-500 rounded-2xl focus:outline-none"
                                type="submit">
                                Update
                            </button>
                        )}
                    </div>
                    <div className="text-sm text-center">
                        <button
                            onClick={hideEditView}
                            className="transition duration-300 py-1.5 px-3 border hover:border-gray-400 rounded-2xl focus:outline-none ">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

UpdateData.propTypes = {
    updateUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setEdit: PropTypes.func.isRequired,
    setEditData: PropTypes.func.isRequired,
    loading: PropTypes.bool
};
UpdateEmail.propTypes = {
    updateUserEmail: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setEdit: PropTypes.func.isRequired,
    setEditEmail: PropTypes.func.isRequired,
    loading: PropTypes.bool
};
UpdatePassword.propTypes = {
    updateUserPassword: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setEdit: PropTypes.func.isRequired,
    setEditPassword: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export { UpdateData, UpdateEmail, UpdatePassword };
