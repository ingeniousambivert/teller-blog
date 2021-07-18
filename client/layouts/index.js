import PropTypes from "prop-types";
import Meta from "./partials/meta";
import Header from "./partials/header";
import Footer from "./partials/footer";

function Layout({ children }) {
    return (
        <div className="space-y-5 space-x-2 md:space-x-0">
            <div className="mx-5 md:mx-10">
                <Header />
            </div>
            <div className="w-full min-h-screen">{children}</div>
            <Footer />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};

export { Meta, Header, Footer, Layout };
