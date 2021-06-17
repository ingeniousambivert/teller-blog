import React, { useEffect } from "react";
import Link from "next/link";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { SelectorIcon } from "@heroicons/react/solid";
import { Dropdown } from "../../components";
import { isAuthenticated, userData, userAuth } from "../../state/user";

function Header() {
    const isUserAuthenticated = useRecoilValue(isAuthenticated);
    const [user, setUser] = useRecoilState(userData);
    const setAuth = useSetRecoilState(userAuth);

    const signOut = () => {
        setAuth({});
        setUser({});
    };

    const renderNav = (isAuthenticated) => {
        if (isAuthenticated) {
            return (
                <div className="flex flex-col">
                    {user && user.firstname && (
                        <Dropdown>
                            <Dropdown.Toggle>
                                <button className=" flex flex-row justify-between items-center pl-4 pr-2.5 py-1.5 rounded-3xl bg-blue-600 text-white hover:bg-blue-500 focus:outline-none transition duration-300">
                                    <span className="mr-0.5"> {user.firstname}</span>
                                    <span>
                                        <SelectorIcon className="h-4 w-5 text-white" />
                                    </span>
                                </button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link href="/">Home</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link href="/user/profile">Profile</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link href="/user/posts">Posts</Link>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item button={true}>
                                    <button
                                        className="text-red-600  focus:outline-none transition duration-300"
                                        onClick={signOut}>
                                        Sign Out
                                    </button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <ul className="flex flex-row space-x-2 text-sm md:text-base">
                        <li>
                            <Link href="/signin">
                                <button className="px-5 py-2 text-blue-600 hover:text-blue-500 focus:outline-none transition duration-300">
                                    Sign In
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                <button className="px-5 py-1 border-2 border-blue-600 rounded-3xl text-white bg-blue-600 hover:bg-blue-500 hover:border-blue-500 transition duration-300 focus:outline-none">
                                    Sign Up
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        }
    };
    useEffect(() => {}, [isUserAuthenticated]);
    return (
        <div className="px-5 mt-5">
            <nav className="flex flex-row justify-between">
                <div>
                    <Link href="/">
                        <button className="focus:outline-none">
                            <h1 className="text-2xl md:text-3xl font-bold">
                                <span className="px-2 bg-blue-600 text-white rounded-md">T</span>
                                <span className="ml-1">ELLER</span>
                                <span className="text-red-400">.</span>
                            </h1>
                        </button>
                    </Link>
                </div>
                {renderNav(isUserAuthenticated)}
            </nav>
        </div>
    );
}

export default Header;
