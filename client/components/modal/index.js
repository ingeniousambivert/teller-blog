/* eslint-disable react/display-name */
import { useEffect, useRef, Fragment } from "react";
import PropTypes from "prop-types";
/* You'll need to install @reach/portal which simplify creating portal*/
import Portal from "@reach/portal";

const style = {
    container: `fixed top-0 overflow-y-auto left-0 z-40 w-full h-full m-0`,
    content: `relative flex flex-col bg-white rounded-xl pointer-events-auto`,
    orientation: `mt-12 mx-8 pb-6 md:m-auto md:w-6/12 lg:w-4/12 md:pt-12 focus:outline-none`,
    overlay: `fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50`,
    header: `items-start justify-between p-4 border-b border-gray-300`,
    headerTitle: `text-lg md:text-xl font-light`,
    body: `flex-shrink flex-grow p-4`,
    footer: `flex flex-wrap items-center justify-end p-3 border-t border-gray-300`
};

const Modal = ({ children, isOpen, toggle }) => {
    const ref = useRef();

    // close modal when you click outside the dialog
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                if (!isOpen) return;
                toggle(false);
            }
        };
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [isOpen, ref]);

    // close modal when you click on "ESC" key
    useEffect(() => {
        const handleEscape = (event) => {
            if (!isOpen) return;
            if (event.key === "Escape") {
                toggle(false);
            }
        };
        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [isOpen]);

    //hide scrollbar and prevent body from moving when modal is open
    useEffect(() => {
        if (!isOpen) return;

        // Put focus on modal dialogue
        ref.current?.focus();

        const html = document.documentElement;

        const overflow = html.style.overflow;
        const paddingRight = html.style.paddingRight;
        const scrollbarWidth = window.innerWidth - html.clientWidth;

        html.style.overflow = "hidden";
        html.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            html.style.overflow = overflow;
            html.style.paddingRight = paddingRight;
        };
    }, [isOpen]);

    return (
        <Portal>
            {isOpen && (
                <Fragment>
                    <div className={style.overlay} />
                    <div className={style.container}>
                        <div
                            aria-modal={true}
                            className={style.orientation}
                            ref={ref}
                            // eslint-disable-next-line jsx-a11y/aria-role
                            role="dialogue"
                            tabIndex={-1}>
                            <div className={style.content}>{children}</div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Portal>
    );
};

Modal.Header = ({ children }) => (
    <div className={style.header}>
        <p className={style.headerTitle}>{children}</p>
    </div>
);
Modal.Body = ({ children }) => <div className={style.body}>{children}</div>;
Modal.Footer = ({ children }) => <div className={style.footer}>{children}</div>;

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
};
Modal.Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};
Modal.Body.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};
Modal.Footer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};

export default Modal;
