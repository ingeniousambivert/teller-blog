import { Meta, Header, Footer } from "../layouts";
import { Categories } from "../components";
import { Feed } from "../containers";

export default function Index() {
    return (
        <div className="space-y-5 space-x-2 md:space-x-0">
            <Meta />
            <div className="mx-5 md:mx-10">
                <Header />
                <Categories />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <Feed />
            </div>
            <Footer />
        </div>
    );
}
