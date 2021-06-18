import PropTypes from "prop-types";

const Jumbotron = ({ children, className }) => (
    <div
        className={`${className} shadow-lg border font-light border-solid rounded-md py-12 px-8 mb-4`}>
        {children}
    </div>
);

Jumbotron.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired,
    className: PropTypes.string
};

export default Jumbotron;
