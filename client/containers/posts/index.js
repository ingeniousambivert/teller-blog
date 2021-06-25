import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Card } from "../../components/cards";

function PostsContainer() {
    const categories = [
        {
            id: 1,
            name: "All"
        },
        {
            id: 2,
            name: "Technology"
        },
        {
            id: 3,
            name: "Food"
        },
        {
            id: 4,
            name: "World"
        },
        {
            id: 5,
            name: "Finance"
        }
    ];
    const [selected, setSelected] = useState(categories[0]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <div>
            <div className="flex flex-col space-y-5">
                <div className="flex flex-col md:flex-row justify-end space-x-5">
                    <div>
                        <input
                            name="search"
                            className="w-full md:w-96 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border-2 rounded-3xl focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:ring-1 focus:border-blue-500 focus:z-10"
                            id="search"
                            type="search"
                            placeholder="Search post by title"
                        />
                    </div>
                    <div className="flex flex-row justify-end space-x-5">
                        <div>
                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <Fragment>
                                        <div className="relative">
                                            <Listbox.Button className="rounded-3xl relative w-24 border-2 border-gray-200 text-gray-500 shadow-sm bg-gray-200 pl-2 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                                <span className="flex items-center">
                                                    <span className="ml-2 block truncate w-16 text-sm">
                                                        {selected.name}
                                                    </span>
                                                </span>
                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <SelectorIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Listbox.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0">
                                                <Listbox.Options
                                                    static
                                                    className="absolute z-10 mt-1 w-36 text-sm bg-white shadow-lg max-h-56 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                                                    {categories.map((category) => (
                                                        <Listbox.Option
                                                            key={category.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active
                                                                        ? "text-white bg-blue-600"
                                                                        : "text-gray-900",
                                                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                                                )
                                                            }
                                                            value={category}>
                                                            {({ selected, active }) => (
                                                                <Fragment>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(
                                                                                selected
                                                                                    ? "font-semibold"
                                                                                    : "font-normal",
                                                                                "ml-3 block truncate"
                                                                            )}>
                                                                            {category.name}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active
                                                                                    ? "text-white"
                                                                                    : "text-blue-600",
                                                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                            )}>
                                                                            <CheckIcon
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                    ) : null}
                                                                </Fragment>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Fragment>
                                )}
                            </Listbox>
                        </div>
                        <div>
                            <button className="flex flex-row border-2 border-blue-600 justify-between items-center px-3 text-sm py-1.5 rounded-3xl bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none transition duration-300">
                                Create Post
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <Card>
                        <p>Posts here</p>
                    </Card> */}
                </div>
            </div>
        </div>
    );
}

export default PostsContainer;