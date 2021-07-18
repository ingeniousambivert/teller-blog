import App from "next/app";
import React from "react";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PropTypes from "prop-types";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { seoState, categoriesState } from "../state/feed";
import { Layout } from "../layouts";
import { getStrapiData } from "../utils/client";

const queryClient = new QueryClient();
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div className="container mx-auto flex-auto justify-center space-4 p-8">
                    <p className="text-red-500 font-bold text-4xl">Something went wrong.</p>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

function LayeredComponent({ Component, props }) {
    const { global, categories } = props;
    const setCategoriesState = useSetRecoilState(categoriesState);
    setCategoriesState([{ id: 1, name: "All", slug: "all" }, ...categories]);
    const setSeoState = useSetRecoilState(seoState);
    setSeoState(global);
    return <Component {...props} />;
}
function NextApp({ Component, pageProps }) {
    return (
        <ErrorBoundary>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Layout>
                        <LayeredComponent Component={Component} props={pageProps} />
                    </Layout>
                </QueryClientProvider>
            </RecoilRoot>
        </ErrorBoundary>
    );
}

NextApp.getInitialProps = async (ctx) => {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);

    const [global, categories] = await Promise.all([
        getStrapiData("/global"),
        getStrapiData("/categories")
    ]);

    return { ...appProps, pageProps: { global, categories } };
};

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};

LayeredComponent.propTypes = {
    Component: PropTypes.any.isRequired,
    props: PropTypes.object,
    global: PropTypes.object,
    categories: PropTypes.array
};

NextApp.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object
};

export default NextApp;
