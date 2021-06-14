import { RecentLarge, RecentSmall, PopularMedium, PopularSmall } from "../components/posts";
function Feed() {
    return (
        <div className="container">
            <div className="space-y-5">
                <div className="max-w-2xl ml-7 sm:ml-24 md:ml-12 lg:ml-0">
                    <h1 className="text-2xl font-bold mb-4">Recent</h1>
                </div>
                <div className="flex flex-col lg:grid lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:space-x-5">
                    <div>
                        <RecentLarge />
                    </div>

                    <div className="flex flex-col gap-4">
                        <RecentSmall />
                    </div>
                </div>
                <div className="max-w-2xl ml-7 sm:ml-24 md:ml-12 lg:ml-0">
                    <h1 className="text-2xl font-bold mb-4">Popular</h1>
                </div>
                <div className="flex flex-col lg:grid lg:grid-rows-1 lg:grid-cols-2 gap-2 lg:space-x-5">
                    <div className="grid grid-flow-row grid-cols-1 lg:grid-flow-row lg:grid-cols-2 gap-4">
                        <PopularMedium />
                    </div>
                    <div className="flex flex-col gap-4">
                        <PopularSmall />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className="text-center text-sm">
                        <button
                            className="w-half px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 focus:outline-none focus:shadow-outline"
                            type="button">
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;
