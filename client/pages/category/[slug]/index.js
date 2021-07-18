import React from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import PropTypes from "prop-types";
import { Meta } from "../../../layouts";
import { FeedContainer } from "../../../containers";
import { getStrapiData } from "../../../utils/client";
import { articlesState, filterState } from "../../../state/feed";

export default function CategoryArticles({ articles, category }) {
    const [filter, setFilter] = useRecoilState(filterState);
    const setArticlesState = useSetRecoilState(articlesState);

    setFilter(category);
    setArticlesState(articles);

    const seo = {
        metaTitle: category.charAt(0).toUpperCase() + category.slice(1),
        metaDescription: `All ${category} articles`
    };

    return (
        <div>
            <Meta seo={seo} />
            <div className="mx-5 md:mx-10">
                <div className="px-5">
                    <nav className="flex flex-wrap justify-between items-center my-12">
                        <div>
                            <h1 className="text-2xl font-bold capitalize">{filter}</h1>
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

export async function getStaticProps(context) {
    const category = context.params.slug;
    const articles = await getStrapiData(`/articles/?_where[0][category.slug]=${category}`);

    return {
        props: { articles, category },
        revalidate: 1
    };
}

export const getStaticPaths = async () => {
    const categories = await getStrapiData("/categories");

    const slugs = categories.map((category) => category.slug);
    const paths = slugs.map((slug) => ({ params: { slug: slug.toString() } }));

    return {
        paths,
        fallback: false
    };
};

CategoryArticles.propTypes = {
    articles: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
        .isRequired,
    category: PropTypes.string.isRequired
};
