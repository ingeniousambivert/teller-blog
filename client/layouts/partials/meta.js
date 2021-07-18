import { Fragment } from "react";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import { seoState } from "../../state/feed";
import { getStrapiMedia } from "../../utils/client";

const Meta = ({ seo }) => {
    const globalSeo = useRecoilValue(seoState);
    let fullSeo = {};
    if (globalSeo) {
        const { defaultSeo, siteName } = globalSeo;
        const seoWithDefaults = {
            ...defaultSeo,
            ...seo
        };
        fullSeo = {
            ...seoWithDefaults,
            metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`,
            shareImage: getStrapiMedia(seoWithDefaults.shareImage)
        };
    }

    return (
        <Head>
            {fullSeo.metaTitle && (
                <Fragment>
                    <title>{fullSeo.metaTitle}</title>
                    <meta property="og:title" content={fullSeo.metaTitle} />
                    <meta name="twitter:title" content={fullSeo.metaTitle} />
                </Fragment>
            )}
            {fullSeo.metaDescription && (
                <Fragment>
                    <meta name="description" content={fullSeo.metaDescription} />
                    <meta property="og:description" content={fullSeo.metaDescription} />
                    <meta name="twitter:description" content={fullSeo.metaDescription} />
                </Fragment>
            )}
            {fullSeo.shareImage && (
                <Fragment>
                    <meta property="og:image" content={fullSeo.shareImage} />
                    <meta name="twitter:image" content={fullSeo.shareImage} />
                    <meta name="image" content={fullSeo.shareImage} />
                </Fragment>
            )}
            {fullSeo.article && <meta property="og:type" content="article" />}
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
};

Meta.propTypes = {
    seo: PropTypes.object
};

export default Meta;
