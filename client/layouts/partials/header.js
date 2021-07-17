import React from "react";
import Link from "next/link";

function Header() {
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
            </nav>
        </div>
    );
}

export default Header;
