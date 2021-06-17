import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

/* Toast logic*/
export const errorAlert = (message, placement, duration) => {
    triggerToast(message, placement, duration);
};

const triggerToast = (message, placement, duration) => {
    ReactDOM.render(
        <ToastContainer duration={duration ? duration : 3000} placement={placement}>
            {message}
        </ToastContainer>,
        document.getElementById("toast")
    );
};

const ToastContainer = ({ children, placement, duration }) => {
    const [closeTimeout, setCloseTimeout] = useState(0);

    useEffect(() => {
        beginCloseTimeout();

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                ReactDOM.unmountComponentAtNode(document.getElementById("toast"));
            }
        };
        document.addEventListener("keyup", handleEscape);

        return () => {
            document.removeEventListener("keyup", handleEscape);
        };
    }, []);

    const closeSnackBar = () => {
        clearTimeout(closeTimeout);
        ReactDOM.unmountComponentAtNode(document.getElementById("toast"));
    };

    const beginCloseTimeout = () => {
        if (duration) {
            const timeout = setTimeout(() => closeSnackBar(), duration);
            setCloseTimeout(timeout);
        }
    };

    return (
        <div
            className={`${placements[placement]} flex fixed bg-white shadow-lg rounded text-sm py-3 z-10 px-4 border-l-4 border-red-500`}
            onMouseEnter={() => clearTimeout(closeTimeout)}>
            <div className="pr-1">
                <DangerIcon />
            </div>
            {children}
        </div>
    );
};

/* The placement of toast (topLeft, topRight, bottomLeft and bottomRight)*/
const placements = {
    topLeft: "animate-left top-6 left-4",
    topRight: "animate-right top-6 right-4",
    bottomLeft: "animate-left bottom-6 left-4",
    bottomRight: "animate-right bottom-6 right-4"
};

/* Icon */
const DangerIcon = () => (
    <svg
        fill="#EF4444"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18px"
        height="18px">
        <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59z" />
    </svg>
);

ToastContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]),
    placement: PropTypes.string,
    duration: PropTypes.number
};
