import Head from "next/head";
import PropTypes from "prop-types";
const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    );
};

Meta.defaultProps = {
    title: "Teller Blog",
    keywords: "blog, blogger, blogs, blogging",
    description: "Blogging site"
};
Meta.propTypes = {
    title: PropTypes.string,
    keywords: PropTypes.string,
    description: PropTypes.string
};

export default Meta;
