import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { Meta } from "../../../layouts";
import { getStrapiData, getStrapiMedia } from "../../../utils/client";

export default function Article({ article }) {
    const coverImageUrl = getStrapiMedia(article.image);
    const authorImageUrl = getStrapiMedia(article.author.picture);

    const seo = {
        metaTitle: article.title,
        metaDescription: article.description,
        shareImage: article.image,
        article: true
    };
    return (
        <div className="mb-10">
            <Meta seo={seo} />
            <div className="max-w-md mx-auto bg-white rounded-t-xl overflow-hidden md:max-w-4xl col-span-2">
                <div className="flex flex-col">
                    <div>
                        <img
                            className="object-cover h-100 w-full"
                            src={coverImageUrl}
                            alt="Man looking at item at a store"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                            {article.category.name}
                        </div>
                        <p className="block mt-1 text-4xl leading-tight font-medium text-black">
                            {article.title}
                        </p>

                        <p className="text-sm text-gray-600 flex flex-row gap-2 mt-2 items-center">
                            <div>
                                <img
                                    className="rounded-full object-cover h-10 w-10"
                                    src={authorImageUrl}
                                    alt={article.author.name}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-md font-semibold">{article.author.name}</span>
                                <span className="text-sm text-gray-400">
                                    {new Date(article.updatedAt).toString()}
                                </span>
                            </div>
                        </p>
                        <div className="block mt-5 text-lg text-gray-800">
                            <ReactMarkdown>{article.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps = async (context) => {
    const article = await getStrapiData(`/articles/${context.params.slug}`);

    return {
        props: {
            article
        }
    };
};

export const getStaticPaths = async () => {
    const articles = await getStrapiData("/articles");

    const slugs = articles.map((article) => article.slug);
    const paths = slugs.map((slug) => ({ params: { slug: slug.toString() } }));

    return {
        paths,
        fallback: false
    };
};

Article.propTypes = {
    article: PropTypes.object.isRequired
};
