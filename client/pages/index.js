import React from "react";
import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";
import { Meta } from "../layouts";
import { FeedContainer } from "../containers";
import { getStrapiData } from "../utils/client";
import { articlesState } from "../state/feed";

export default function Index({ articles, homepage }) {
    const setArticlesState = useSetRecoilState(articlesState);
    setArticlesState(articles);

    return (
        <div>
            <Meta seo={homepage.seo} />
            <div className="mx-5 md:mx-10">
                <div className="px-5">
                    <nav className="flex flex-wrap justify-between items-center my-12">
                        <div>
                            <h1 className="text-2xl font-bold capitalize">all</h1>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <FeedContainer />
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const [articles, homepage] = await Promise.all([
        getStrapiData("/articles"),
        getStrapiData("/homepage")
    ]);

    return {
        props: { articles, homepage },
        revalidate: 1
    };
}

Index.propTypes = {
    articles: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
        .isRequired,
    homepage: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
        .isRequired
};
