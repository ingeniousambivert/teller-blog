import PropTypes from "prop-types";

const Loader = ({ color, fullHeight }) => {
    let circleCommonClasses = `h-4 md:w-4 border-4 border-${color} rounded-full`;
    return (
        <div
            className={
                fullHeight
                    ? "flex flex-col justify-center items-center space-y-5 text-center min-h-screen"
                    : "flex flex-col justify-center items-center space-y-5 text-center"
            }>
            <div className="flex flex-row justify-center items-center">
                <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
                <div className={`${circleCommonClasses} animate-bounce400`}></div>
            </div>
            <p className={`md:text-lg text-${color}`}>Loading...</p>
        </div>
    );
};

Loader.defaultProps = {
    color: "blue-600",
    fullHeight: true
};

Loader.propTypes = {
    color: PropTypes.string,
    fullHeight: PropTypes.bool
};

export default Loader;
