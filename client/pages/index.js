import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";
import { Categories } from "../components";
import { FeedContainer } from "../containers";
import { getStrapiData } from "../utils/client";
import { articlesState, categoriesState } from "../state/feed";

export default function Index({ articles, categories }) {
    const setArticles = useSetRecoilState(articlesState);
    const setCategories = useSetRecoilState(categoriesState);

    setArticles(articles);
    setCategories(categories);

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

export async function getStaticProps() {
    const [articles, categories] = await Promise.all([
        getStrapiData("/articles"),
        getStrapiData("/categories")
    ]);

    return {
        props: { articles, categories },
        revalidate: 1
    };
}

Index.propTypes = {
    articles: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
        .isRequired,
    categories: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
        .isRequired
};
