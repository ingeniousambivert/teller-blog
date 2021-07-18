import React, { Fragment } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "../../utils/client";

function PrimaryPosts({ articles }) {
    const primaryArticle = articles[0];
    let primaryCoverImageUrl;
    let primaryAuthorImageUrl;
    if (primaryArticle) {
        primaryCoverImageUrl = getStrapiMedia(primaryArticle.image);
        primaryAuthorImageUrl = getStrapiMedia(primaryArticle.author.picture);
    }
    let secondaryArticles;
    if (articles.length > 1) {
        secondaryArticles = articles.slice(1, articles.length);
    }
    return (
        <div className="flex flex-col lg:grid lg:grid-rows-1 lg:grid-cols-2 lg:space-x-5">
            {primaryArticle && (
                <Fragment>
                    <div>
                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl col-span-2">
                            <div className="flex flex-col">
                                <div>
                                    <img
                                        className="object-cover h-80 w-full"
                                        src={primaryCoverImageUrl}
                                        alt={primaryArticle.title}
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                                        {primaryArticle.category.name}
                                    </div>
                                    <Link href={`/article/${primaryArticle.slug}`}>
                                        <p className="block mt-1 text-md leading-tight font-medium text-black hover:underline cursor-pointer">
                                            {primaryArticle.title}
                                        </p>
                                    </Link>

                                    <div className="text-sm text-gray-600 flex flex-row gap-2 mt-2 items-center">
                                        <div>
                                            <img
                                                className="rounded-full object-cover h-10 w-10"
                                                src={primaryAuthorImageUrl}
                                                alt={primaryArticle.author.name}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-md font-semibold">
                                                {primaryArticle.author.name}
                                            </span>
                                            <span className="text-sm text-gray-400 truncate">
                                                {new Date(primaryArticle.updatedAt).toString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="block mt-1 text-sm text-gray-800 truncate">
                                        <ReactMarkdown>{primaryArticle.description}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {articles.length > 1 && (
                        <div className="grid grid-flow-row grid-cols-1 lg:grid-flow-row lg:grid-cols-2 gap-4">
                            {secondaryArticles.map((secondaryArticle) => {
                                const secondaryCoverImageUrl = getStrapiMedia(
                                    secondaryArticle.image
                                );
                                const secondaryAuthorImageUrl = getStrapiMedia(
                                    secondaryArticle.author.picture
                                );
                                return (
                                    <div key={secondaryArticle.id}>
                                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                                            <div className="flex flex-col">
                                                <div>
                                                    <img
                                                        className="object-cover h-66 w-full"
                                                        src={secondaryCoverImageUrl}
                                                        alt={secondaryArticle.title}
                                                    />
                                                </div>
                                                <div className="p-8">
                                                    <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                                                        {secondaryArticle.category.name}
                                                    </div>
                                                    <Link
                                                        href={`/article/${secondaryArticle.slug}`}>
                                                        <p className="block mt-1 text-md leading-tight font-medium text-black hover:underline cursor-pointer">
                                                            {secondaryArticle.title}
                                                        </p>
                                                    </Link>
                                                    <div className="text-sm text-gray-600 flex flex-row gap-2 mt-2 items-center">
                                                        <div>
                                                            <img
                                                                className="rounded-full object-cover h-10 w-10"
                                                                src={secondaryAuthorImageUrl}
                                                                alt={secondaryArticle.author.name}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-md font-semibold">
                                                                {secondaryArticle.author.name}
                                                            </span>
                                                            <span className="text-sm text-gray-400 truncate">
                                                                {new Date(
                                                                    secondaryArticle.updatedAt
                                                                ).toString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="block mt-1 text-sm text-gray-800 truncate">
                                                        <ReactMarkdown>
                                                            {secondaryArticle.description}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
}

PrimaryPosts.propTypes = {
    articles: PropTypes.array.isRequired
};

export default PrimaryPosts;
