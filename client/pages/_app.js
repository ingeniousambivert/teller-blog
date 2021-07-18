import App from "next/app";
import React from "react";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PropTypes from "prop-types";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { seoState } from "../state/feed";
import { Layout } from "../layouts";
import { getStrapiData } from "../utils/client";

const queryClient = new QueryClient();
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div className="container mx-auto">
                    <h2 className="font-bold text-2xl">Something went wrong.</h2>
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

function MainComponent({ Component, props }) {
    const { global } = props;
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
                        <MainComponent Component={Component} props={pageProps} />
                    </Layout>
                </QueryClientProvider>
            </RecoilRoot>
        </ErrorBoundary>
    );
}

NextApp.getInitialProps = async (ctx) => {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);
    // Fetch global site settings from Strapi
    const global = await getStrapiData("/global");
    // Pass the data to our page via props
    return { ...appProps, pageProps: { global } };
};

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};

MainComponent.propTypes = {
    Component: PropTypes.any.isRequired,
    props: PropTypes.object,
    global: PropTypes.object
};

NextApp.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object
};

export default NextApp;
