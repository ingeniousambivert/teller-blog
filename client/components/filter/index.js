import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../../state/feed";

function Categories() {
    const categories = useRecoilValue(categoriesState);
    const [selected, setSelected] = useState(null);

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    useEffect(() => {
        setSelected(categories[0]);
    }, [categories]);

    return (
        <div className="px-5">
            <nav className="flex flex-wrap justify-between items-center my-12">
                <div>
                    <h1 className="text-2xl font-bold">BLOG</h1>
                </div>

                <div className="hidden lg:inline-block">
                    <div className="flex flex-row space-x-2">
                        {categories.map((category) => {
                            return (
                                <div key={category.id}>
                                    <button className="text-sm px-5 py-1 border-2 border-gray-200 rounded-2xl text-gray-500 shadow-sm bg-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 focus:bg-blue-600 focus:text-white">
                                        {category.name}
                                    </button>
                                </div>
                            );
                        })}
                        <div>
                            <input
                                className="text-sm px-5 py-1 border-2 border-gray-300 rounded-2xl shadow-sm placeholder-gray-400  text-black focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:hidden flex flex-row gap-2">
                    {selected && (
                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <Fragment>
                                    <div className="mt-1 relative">
                                        <Listbox.Button className="rounded-3xl relative w-24 border-2 border-gray-200 text-gray-500 shadow-sm bg-gray-200 pl-2 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm">
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
                    )}
                    <div className="mt-1">
                        <input
                            className="text-sm pl-3 py-1.5 shadow-sm bg-white border-2 border-gray-300 rounded-3xl placeholder-gray-400  text-black focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:z-10"
                            placeholder="Search"
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Categories;
