import { useRecoilValue } from "recoil";
import { articlesState } from "../../state/feed";
import PrimaryPosts from "./primary";
import SecondaryPosts from "./secondary";

function FeedContainer() {
    const articles = useRecoilValue(articlesState);
    const primaryArticles = articles.slice(0, 3);
    const secondaryArticles = articles.slice(3, articles.length);

    return (
        articles && (
            <div className="container">
                <div className="space-y-5">
                    <PrimaryPosts articles={primaryArticles} />
                    <SecondaryPosts articles={secondaryArticles} />
                </div>
            </div>
        )
    );
}

export default FeedContainer;
