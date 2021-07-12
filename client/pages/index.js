import { Categories } from "../components";
import { FeedContainer } from "../containers";

export default function Index() {
    return (
        <div>
            <div className="mx-5 md:mx-10">
                <Categories />
            </div>
            <div className="flex flex-col items-center justify-center">
                <FeedContainer />
            </div>
        </div>
    );
}
