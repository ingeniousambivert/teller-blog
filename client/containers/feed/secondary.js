import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "../../utils/client";

function SecondaryPosts({ articles }) {
    return (
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-4">
            {articles.map((article) => {
                const coverImageUrl = getStrapiMedia(article.image);
                const authorImageUrl = getStrapiMedia(article.author.picture);
                return (
                    <div key={article.id}>
                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                            <div className="flex flex-col">
                                <div>
                                    <img
                                        className="object-cover h-66 w-full"
                                        src={coverImageUrl}
                                        alt={article.title}
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                                        {article.category.name}
                                    </div>
                                    <Link href={`article/${article.slug}`}>
                                        <p className="block mt-1 text-md leading-tight font-medium text-black hover:underline cursor-pointer">
                                            {article.title}
                                        </p>
                                    </Link>

                                    <div className="text-sm text-gray-600 flex flex-row gap-2 mt-2 items-center">
                                        <div>
                                            <img
                                                className="rounded-full object-cover h-10 w-10"
                                                src={authorImageUrl}
                                                alt={article.author.name}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-md font-semibold">
                                                {article.author.name}
                                            </span>
                                            <span className="text-sm text-gray-400 truncate">
                                                {new Date(article.updatedAt).toString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="block mt-1 text-sm text-gray-800 truncate">
                                        <ReactMarkdown>{article.description}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

SecondaryPosts.propTypes = {
    articles: PropTypes.array.isRequired
};

export default SecondaryPosts;
