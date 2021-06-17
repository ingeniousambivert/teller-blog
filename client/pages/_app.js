import React from "react";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PropTypes from "prop-types";
import { RecoilRoot } from "recoil";

import { Layout } from "../layouts";

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
function App({ Component, pageProps }) {
    return (
        <ErrorBoundary>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
            </RecoilRoot>
        </ErrorBoundary>
    );
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};
App.propTypes = {
    Component: PropTypes.any.isRequired,
    pageProps: PropTypes.object
};

export default App;
