import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../../components";
import { articlesState } from "../../state/feed";
import { getStrapiData } from "../../utils/client";
import Posts from "./posts";

function FeedContainer(props) {
    const { count } = props;
    const [articles, setArticles] = useRecoilState(articlesState);
    const [hasMore, setHasMore] = useState(true);
    const getMoreArticles = async () => {
        const newArticles = await getStrapiData(`/articles?_start=${articles.length}&_limit=10`);
        setArticles([...articles, ...newArticles]);
    };

    useEffect(() => {
        setHasMore(parseInt(count) > articles.length ? true : false);
    }, [articles]);
    return (
        articles && (
            <div className="container">
                <div className="space-y-5">
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={getMoreArticles}
                        hasMore={hasMore}
                        loader={<Loader fullHeight={false} />}>
                        <Posts articles={articles} />
                    </InfiniteScroll>
                </div>
            </div>
        )
    );
}

FeedContainer.propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default FeedContainer;
