import React from "react";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

function RecentLarge() {
    return (
        <div>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl col-span-2">
                <div className="flex flex-col">
                    <div>
                        <img
                            className="object-cover h-80 w-full"
                            src="https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80"
                            alt="Man looking at item at a store"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                            Case study
                        </div>
                        <p className="block mt-1 text-md leading-tight font-medium text-black hover:underline">
                            Finding customers for your new business Finding customers for your new
                            business Finding customers for your new business
                        </p>
                        <p className="block mt-1 text-sm text-gray-500 truncate">
                            Finding customers for your new business can be tough Finding customers
                            for your new business can be tough
                        </p>

                        <p className="mt-2 text-sm text-gray-500">May 20, 2021</p>
                        <a className="text-indigo-500" href="/">
                            <Link href="/post/23">
                                <small className="flex flex-row mt-2">
                                    <span> Read More</span>
                                    <ArrowSmRightIcon className="h-5 w-5 " />
                                </small>
                            </Link>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecentSmall() {
    return (
        <React.Fragment>
            <div>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-36 w-full object-cover md:h-full md:w-36"
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                                alt="Man looking at item at a store"
                            />
                        </div>
                        <div className="p-4">
                            <div className="uppercase tracking-wide text-xs text-blue-500 font-semibold">
                                Case study
                            </div>
                            <p className="block mt-1 text-md leading-tight font-medium text-black hover:underline">
                                Finding customers for your new business Finding customers for your
                                new business Finding customers for your new business
                            </p>

                            <p className="mt-2 text-sm text-gray-500">May 20, 2021</p>
                            <a className="text-indigo-500" href="/">
                                <small className="flex flex-row mt-2">
                                    <span> Read More</span>
                                    <ArrowSmRightIcon className="h-5 w-5 " />
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-36 w-full object-cover md:h-full md:w-36"
                                src="https://images.unsplash.com/photo-1536925155833-43e9c2b2f499?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                                alt="Man looking at item at a store"
                            />
                        </div>
                        <div className="p-4">
                            <div className="uppercase tracking-wide text-xs text-blue-500 font-semibold">
                                Case study
                            </div>
                            <p className="block mt-1 text-md leading-tight font-medium text-black hover:underline">
                                Finding customers for your new business Finding customers for your
                                new business Finding customers for your new business
                            </p>

                            <p className="mt-2 text-sm text-gray-500">May 20, 2021</p>
                            <a className="text-indigo-500" href="/">
                                <small className="flex flex-row mt-2">
                                    <span> Read More</span>
                                    <ArrowSmRightIcon className="h-5 w-5 " />
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-36 w-full object-cover md:h-full md:w-36"
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                                alt="Man looking at item at a store"
                            />
                        </div>
                        <div className="p-4">
                            <div className="uppercase tracking-wide text-xs text-blue-500 font-semibold">
                                Case study
                            </div>
                            <p className="block mt-1 text-md leading-tight font-medium text-black hover:underline">
                                Finding customers for your new business Finding customers for your
                                new business Finding customers for your new business
                            </p>

                            <p className="mt-2 text-sm text-gray-500">May 20, 2021</p>
                            <a className="text-indigo-500" href="/">
                                <small className="flex flex-row mt-2">
                                    <span> Read More</span>
                                    <ArrowSmRightIcon className="h-5 w-5 " />
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export { RecentLarge, RecentSmall };
