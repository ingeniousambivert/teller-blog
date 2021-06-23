import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Dropdown, Modal } from "../../components";
import { SelectorIcon } from "@heroicons/react/solid";
import { UpdateData, UpdateEmail, UpdatePassword } from "./update";
import { updateData, updateEmail, updatePassword, updateMedia } from "../../state/user/thunks";

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
                    {user?.profile?.bio ? (
                        <p className="mt-2 mx-4 md:mx-0 text-md text-gray-600 text-center md:text-left">
                            {user?.profile?.bio}
                        </p>
                    ) : (
                        <button
                            onClick={() => {
                                setEdit(true);
                                setEditData(true);
                            }}
                            className="text-xs mt-3 hover:text-blue-600 underline transition duration-300 focus:outline-none">
                            Add profile bio
                        </button>
                    )}
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

function PictureModal(props) {
    const { isPictureOpen, togglePicture, type, updateUserMedia, updateUserData, loading } = props;
    const { register, handleSubmit } = useForm();
    const [preview, setPreview] = useState(
        "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
    );

    const previewHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        const form = document.getElementById("profilePictureForm");
        const formData = new FormData(form);
        formData.append("profilePicture", data.profilePicture[0]);
        await updateUserMedia(formData);
        togglePicture();
    };

    const removePicture = async () => {
        await updateUserData({ "profile.picture": null });
        togglePicture();
    };

    return (
        <Fragment>
            <Fragment>
                {type === "add" && (
                    <Modal isOpen={isPictureOpen} toggle={togglePicture}>
                        <form onSubmit={handleSubmit(onSubmit)} id="profilePictureForm">
                            <Modal.Header>Add Profile Picture</Modal.Header>

                            <Modal.Body>
                                <div className="grid grid-cols-1 space-y-2">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                            <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                                    <img
                                                        className="mx-auto w-auto h-auto mt-10"
                                                        src={preview}
                                                        alt="no data"
                                                    />
                                                </div>
                                                <p className="text-blue-400 cursor-pointer">
                                                    Select an image from your device
                                                </p>
                                            </div>

                                            <input
                                                {...register("profilePicture")}
                                                type="file"
                                                accept="image/*"
                                                name="profilePicture"
                                                className="hidden"
                                                onChange={previewHandler}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    onClick={togglePicture}
                                    className="border focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm hover:border-red-500 hover:text-red-500 transition duration-300">
                                    Cancel
                                </button>
                                {loading ? (
                                    <button
                                        type="button"
                                        className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300 flex flex-row justify-center items-center space-x-5">
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
                                        Uploading
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300">
                                        Upload
                                    </button>
                                )}
                            </Modal.Footer>
                        </form>
                    </Modal>
                )}
            </Fragment>
            <Fragment>
                {type === "remove" && (
                    <Modal isOpen={isPictureOpen} toggle={togglePicture}>
                        <Modal.Header> Remove Profile Picture</Modal.Header>

                        <Modal.Body>
                            <div className="container">
                                <p>Are you sure you want to remove the display picture?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                onClick={togglePicture}
                                className="border focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm hover:border-red-500 hover:text-red-500 transition duration-300">
                                Cancel
                            </button>
                            {loading ? (
                                <button
                                    type="button"
                                    className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300 flex flex-row justify-center items-center space-x-5">
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
                                    Removing
                                </button>
                            ) : (
                                <button
                                    onClick={removePicture}
                                    className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300">
                                    Remove
                                </button>
                            )}
                        </Modal.Footer>
                    </Modal>
                )}
            </Fragment>
        </Fragment>
    );
}

function CoverModal(props) {
    const { isCoverOpen, toggleCover, type, updateUserMedia, updateUserData, loading } = props;
    const { register, handleSubmit } = useForm();
    const [preview, setPreview] = useState(
        "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
    );

    const previewHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        const form = document.getElementById("coverPictureForm");
        const formData = new FormData(form);
        formData.append("coverPicture", data.coverPicture[0]);
        await updateUserMedia(formData);
        toggleCover();
    };
    const removeCover = async () => {
        await updateUserData({ "profile.cover": null });
        toggleCover();
    };

    return (
        <Fragment>
            <Fragment>
                {type === "add" && (
                    <Modal isOpen={isCoverOpen} toggle={toggleCover}>
                        <form onSubmit={handleSubmit(onSubmit)} id="coverPictureForm">
                            <Modal.Header>Add Cover Picture</Modal.Header>

                            <Modal.Body>
                                <div className="grid grid-cols-1 space-y-2">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                            <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                                    <img
                                                        className="mx-auto w-auto h-auto mt-10"
                                                        src={preview}
                                                        alt="no data"
                                                    />
                                                </div>
                                                <p className="text-blue-400 cursor-pointer">
                                                    Select an image from your device
                                                </p>
                                            </div>

                                            <input
                                                {...register("coverPicture")}
                                                type="file"
                                                accept="image/*"
                                                name="coverPicture"
                                                className="hidden"
                                                onChange={previewHandler}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    onClick={toggleCover}
                                    className="border focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm hover:border-red-500 hover:text-red-500 transition duration-300">
                                    Cancel
                                </button>
                                {loading ? (
                                    <button
                                        type="button"
                                        className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300 flex flex-row justify-center items-center space-x-5">
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
                                        Uploading
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300">
                                        Upload
                                    </button>
                                )}
                            </Modal.Footer>
                        </form>
                    </Modal>
                )}
            </Fragment>
            <Fragment>
                {type === "remove" && (
                    <Modal isOpen={isCoverOpen} toggle={toggleCover}>
                        <Modal.Header> Remove Cover Picture</Modal.Header>

                        <Modal.Body>
                            <div className="container">
                                <p>Are you sure you want to remove the cover picture?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                onClick={toggleCover}
                                className="border focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm hover:border-red-500 hover:text-red-500 transition duration-300">
                                Cancel
                            </button>
                            {loading ? (
                                <button
                                    type="button"
                                    className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300 flex flex-row justify-center items-center space-x-5">
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
                                    Removing
                                </button>
                            ) : (
                                <button
                                    onClick={removeCover}
                                    className="text-white focus:outline-none m-1.5 rounded-3xl px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition duration-300">
                                    Remove
                                </button>
                            )}
                        </Modal.Footer>
                    </Modal>
                )}
            </Fragment>
        </Fragment>
    );
}

function ProfileContainer(props) {
    const { user, getData, signOut } = props;
    const [edit, setEdit] = useState(false);

    const [editData, setEditData] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isPictureOpen, setIsPictureOpen] = useState(false);
    const [pictureType, setPictureType] = useState(null);
    const [isCoverOpen, setIsCoverOpen] = useState(false);
    const [coverType, setCoverType] = useState(null);

    const togglePicture = () => {
        setIsPictureOpen(!isPictureOpen);
    };

    const toggleCover = () => {
        setIsCoverOpen(!isCoverOpen);
    };

    const updateUserMedia = async (data) => {
        setLoading(true);
        await updateMedia(user?._id, data);
        await getData();
        setLoading(false);
    };
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
        <div className="mt-20 max-w-md md:max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-visible z-0">
            <div className="flex flex-col overflow-visible z-0">
                <div>
                    {user?.profile?.cover ? (
                        <div className="border-b h-48 md:h-56 w-full">
                            <div className="z-0 h-48 md:h-56 w-full">
                                <img
                                    className="h-48 md:h-56 w-full object-cover"
                                    src={user?.profile?.cover}
                                    alt="Profile Cover"
                                />
                            </div>
                            <div className="float-right -mt-8 mr-8 opacity-50 hover:opacity-100 z-999 relative transition duration-300">
                                <Dropdown className="z-50">
                                    <Dropdown.Toggle>
                                        <button className="bg-white border-white shadow-xl text-black py-1 pl-2.5 pr-1.5 rounded-2xl focus:outline-none text-xs flex flex-row">
                                            <span className="mr-0.5">Update</span>
                                            <span>
                                                <SelectorIcon className="h-4 w-3 text-black" />
                                            </span>
                                        </button>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item button={true}>
                                            <button
                                                onClick={() => {
                                                    setCoverType("add");
                                                    toggleCover();
                                                }}
                                                className="hover:text-blue-600 focus:outline-none transition duration-300">
                                                Change
                                            </button>
                                        </Dropdown.Item>
                                        <Dropdown.Item button={true}>
                                            <button
                                                onClick={() => {
                                                    setCoverType("remove");
                                                    toggleCover();
                                                }}
                                                className="text-red-600  focus:outline-none transition duration-300">
                                                Remove
                                            </button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 md:h-56 w-full border-b bg-gray-50 flex flex-col justify-center items-center">
                            <div>
                                <button
                                    onClick={() => {
                                        setCoverType("add");
                                        toggleCover();
                                    }}
                                    className="hover:text-blue-600 shadow-md border transition duration-300 py-1.5 px-2.5 hover:border-blue-500 rounded-3xl focus:outline-none">
                                    Add cover picture
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="py-8 pl-4 pr-4 md:pl-2 md:pr-4 grid grid-flow-cols grid-cols-1 justify-items-center md:justify-items-start focus-within:md:grid-flow-row md:grid-cols-12 lg:grid-cols-10 overflow-visible z-0">
                    <div className="md:col-span-3 lg:col-span-2 md:ml-5">
                        <div className="relative">
                            {user?.profile?.picture ? (
                                <div className="rounded-xl shadow w-36 h-36 lg:w-44 lg:h-44">
                                    <div className="z-0 w-36 h-36 lg:w-44 lg:h-44">
                                        <img
                                            src={user?.profile?.picture}
                                            className="rounded-xl z-0 object-cover w-36 h-36 lg:w-44 lg:h-44"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="float-right -mt-8 mr-2 opacity-50 hover:opacity-100 z-999 relative transition duration-300">
                                        <Dropdown className="z-50">
                                            <Dropdown.Toggle>
                                                <button className="bg-white border-white shadow-xl text-black py-1 pl-2.5 pr-1.5 rounded-2xl focus:outline-none text-xs flex flex-row">
                                                    <span className="mr-0.5">Update</span>
                                                    <span>
                                                        <SelectorIcon className="h-4 w-3 text-black" />
                                                    </span>
                                                </button>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item button={true}>
                                                    <button
                                                        onClick={() => {
                                                            setPictureType("add");
                                                            togglePicture();
                                                        }}
                                                        className="hover:text-blue-600 focus:outline-none transition duration-300">
                                                        Change
                                                    </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item button={true}>
                                                    <button
                                                        onClick={() => {
                                                            setPictureType("remove");
                                                            togglePicture();
                                                        }}
                                                        className="text-red-600  focus:outline-none transition duration-300">
                                                        Remove
                                                    </button>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl w-36 h-36 lg:w-44 lg:h-44 shadow bg-gray-50 flex flex-col justify-center items-center">
                                    <div>
                                        <button
                                            onClick={() => {
                                                setPictureType("add");
                                                togglePicture();
                                            }}
                                            className="text-xs hover:text-blue-600 shadow-md border transition duration-300 py-1.5 px-2.5 hover:border-blue-500 rounded-2xl focus:outline-none">
                                            Add display picture
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div>
                                <PictureModal
                                    loading={loading}
                                    updateUserMedia={updateUserMedia}
                                    updateUserData={updateUserData}
                                    isPictureOpen={isPictureOpen}
                                    togglePicture={togglePicture}
                                    type={pictureType}
                                />
                                <CoverModal
                                    loading={loading}
                                    updateUserMedia={updateUserMedia}
                                    updateUserData={updateUserData}
                                    isCoverOpen={isCoverOpen}
                                    toggleCover={toggleCover}
                                    type={coverType}
                                />
                            </div>
                        </div>
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

PictureModal.propTypes = {
    type: PropTypes.string.isRequired,
    isPictureOpen: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    togglePicture: PropTypes.func.isRequired,
    updateUserMedia: PropTypes.func.isRequired,
    updateUserData: PropTypes.func.isRequired
};

CoverModal.propTypes = {
    type: PropTypes.string.isRequired,
    isCoverOpen: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleCover: PropTypes.func.isRequired,
    updateUserMedia: PropTypes.func.isRequired,
    updateUserData: PropTypes.func.isRequired
};
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
