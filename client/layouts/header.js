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
            </nav>
        </div>
    );
}

export default Header;
