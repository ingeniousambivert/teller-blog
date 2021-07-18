import { Fragment, useState } from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../../state/feed";

export default function Navbar() {
    const [category, setCategory] = useState(1);

    const categories = useRecoilValue(categoriesState);
    return (
        <div>
            <Disclosure as="nav">
                {({ open }) => (
                    <Fragment>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <button className="focus:outline-none">
                                            <h1 className="text-2xl md:text-3xl font-bold">
                                                <span className="px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                                                    T
                                                </span>
                                                <span className="ml-1">ELLER</span>
                                                <span className="text-red-400 hover:text-red-500 transition duration-300">
                                                    .
                                                </span>
                                            </h1>
                                        </button>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-2">
                                                {categories.map((item) => (
                                                    <Fragment key={item.id}>
                                                        {item.id === 1 ? (
                                                            <Link href="/">
                                                                <button
                                                                    onClick={() => {
                                                                        setCategory(item.id);
                                                                    }}
                                                                    className={
                                                                        item.id === category
                                                                            ? "text-sm px-5 py-1 border-2 rounded-lg shadow-sm bg-blue-600 text-white border-blue-600 transition duration-300 focus:outline-none"
                                                                            : "text-sm px-5 py-1 border-2 border-gray-200 rounded-lg text-gray-500 shadow-sm bg-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 focus:bg-blue-600 focus:text-white"
                                                                    }>
                                                                    {item.name}
                                                                </button>
                                                            </Link>
                                                        ) : (
                                                            <Link href={`/category/${item.slug}`}>
                                                                <button
                                                                    onClick={() => {
                                                                        setCategory(item.id);
                                                                    }}
                                                                    className={
                                                                        item.id === category
                                                                            ? "text-sm px-5 py-1 border-2 rounded-lg shadow-sm bg-blue-600 text-white border-blue-600 transition duration-300 focus:outline-none"
                                                                            : "text-sm px-5 py-1 border-2 border-gray-200 rounded-lg text-gray-500 shadow-sm bg-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 focus:bg-blue-600 focus:text-white"
                                                                    }>
                                                                    {item.name}
                                                                </button>
                                                            </Link>
                                                        )}
                                                    </Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    <Disclosure.Button className="bg-blue-600 inline-flex items-center justify-center p-1.5 rounded-md text-white hover:bg-blue-700 focus:outline-none">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {categories.map((item) =>
                                    item.id === 1 ? (
                                        <Fragment key={item.id}>
                                            <Link href="/">
                                                <button
                                                    onClick={() => {
                                                        setCategory(item.id);
                                                    }}
                                                    className={
                                                        item.id === category
                                                            ? "bg-blue-600 text-white block px-3 py-2 rounded-md text-base cursor-pointer font-medium w-full text-left focus:outline-none"
                                                            : "text-gray-600 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md cursor-pointer text-base font-medium  w-full text-left focus:outline-none"
                                                    }>
                                                    {item.name}
                                                </button>
                                            </Link>
                                        </Fragment>
                                    ) : (
                                        <Link href={`/category/${item.slug}`}>
                                            <button
                                                onClick={() => {
                                                    setCategory(item.id);
                                                }}
                                                key={item.id}
                                                className={
                                                    item.id === category
                                                        ? "bg-blue-600 text-white block px-3 py-2 rounded-md text-base cursor-pointer font-medium w-full text-left focus:outline-none"
                                                        : "text-gray-600 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md cursor-pointer text-base font-medium  w-full text-left focus:outline-none"
                                                }>
                                                {item.name}
                                            </button>
                                        </Link>
                                    )
                                )}
                            </div>
                        </Disclosure.Panel>
                    </Fragment>
                )}
            </Disclosure>
        </div>
    );
}
