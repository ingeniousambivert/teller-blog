import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { UpdateData, UpdateEmail, UpdatePassword } from "./update";
import { updateData, updateEmail, updatePassword } from "../../state/user/thunks";

function ShowData(props) {
    const { user, setEdit, setEditData, setEditEmail, setEditPassword } = props;

    return (
        <div className="flex flex-col justify-center md:justify-start gap-y-2">
            <div className="flex flex-col justify-center md:justify-start">
                <div>
                    <p className="text-2xl md:text-3xl font-semibold text-center md:text-left">
                        {user?.firstname}&nbsp;{user?.lastname}
                    </p>
                </div>
                <div>
                    <div className="mt-1 md:text-md text-gray-600 flex flex-col md:flex-row">
                        <span className="text-center md:text-left"> {user?.email} &nbsp;</span>
                        <span className="text-center md:text-left">
                            {!user?.isVerified && (
                                <button className="underline text-xs ml-1 hover:text-black focus:outline-none transition duration-300">
                                    Re-send Verification
                                </button>
                            )}
                        </span>
                    </div>
                </div>
                <div>
                    <p className="mt-2 mx-4 md:mx-0 text-md text-gray-600 text-center md:text-left">
                        {user?.profile?.bio}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-x-2 text-xs justify-center md:justify-start mt-5">
                <div>
                    <button
                        onClick={() => {
                            setEdit(true);
                            setEditData(true);
                        }}
                        className="hover:text-blue-600 border transition duration-300 py-1.5 px-2.5 hover:border-blue-500 rounded-2xl focus:outline-none">
                        Update Profile
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            setEdit(true);
                            setEditEmail(true);
                        }}
                        className="hover:text-blue-600 border transition duration-300 py-1.5 px-2.5 hover:border-blue-500 rounded-2xl focus:outline-none">
                        Update Email
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            setEdit(true);
                            setEditPassword(true);
                        }}
                        className="hover:text-blue-600 border transition duration-300 py-1.5 px-2.5 hover:border-blue-500 rounded-2xl focus:outline-none">
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProfileContainer(props) {
    const { user, getData, signOut } = props;
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateUserData = async (data) => {
        setLoading(true);
        await updateData(user?._id, data);
        await getData();
        setLoading(false);
    };
    const updateUserEmail = async (data) => {
        setLoading(true);
        await updateEmail(user?._id, data);
        await getData();
        setLoading(false);
    };
    const updateUserPassword = async (data) => {
        setLoading(true);
        await updatePassword(user?._id, data);
        setLoading(false);
        await signOut();
    };

    return (
        <div className="mt-20 max-w-md md:max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col">
                <div>
                    <img
                        className="h-48 md:h-56 w-full object-cover"
                        src={user?.profile?.cover}
                        alt="Profile Cover"
                    />
                </div>
                <div className="py-8 pl-4 pr-4 md:pl-2 md:pr-4 grid grid-flow-cols grid-cols-1 justify-items-center md:justify-items-start focus-within:md:grid-flow-row md:grid-cols-12 lg:grid-cols-10">
                    <div className="md:col-span-3 lg:col-span-2 md:ml-5">
                        <img
                            src={user?.profile?.picture}
                            className="rounded-xl object-cover w-36 h-36 lg:w-44 lg:h-44 shadow"
                            alt="Profile"
                        />
                    </div>
                    <div className="md:col-span-9 lg:col-span-8 md:mt-0 mt-4 flex flex-col justify-center md:justify-start space-y-2">
                        {edit ? (
                            <Fragment>
                                {editData && (
                                    <UpdateData
                                        setEdit={setEdit}
                                        setEditData={setEditData}
                                        user={user}
                                        updateUserData={updateUserData}
                                        loading={loading}
                                    />
                                )}
                                {editEmail && (
                                    <UpdateEmail
                                        setEdit={setEdit}
                                        setEditEmail={setEditEmail}
                                        user={user}
                                        updateUserEmail={updateUserEmail}
                                        loading={loading}
                                    />
                                )}
                                {editPassword && (
                                    <UpdatePassword
                                        setEdit={setEdit}
                                        setEditPassword={setEditPassword}
                                        user={user}
                                        updateUserPassword={updateUserPassword}
                                        loading={loading}
                                    />
                                )}
                            </Fragment>
                        ) : (
                            <ShowData
                                user={user}
                                setEdit={setEdit}
                                setEditData={setEditData}
                                setEditEmail={setEditEmail}
                                setEditPassword={setEditPassword}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

ProfileContainer.propTypes = {
    user: PropTypes.object.isRequired,
    getData: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
};
ShowData.propTypes = {
    user: PropTypes.object.isRequired,
    setEdit: PropTypes.func.isRequired,
    setEditData: PropTypes.func.isRequired,
    setEditEmail: PropTypes.func.isRequired,
    setEditPassword: PropTypes.func.isRequired
};

export default ProfileContainer;
