/* eslint-disable react/display-name */
import { useEffect, useRef, useState, Fragment } from "react";
import PropTypes from "prop-types";

const useToggle = () => {
    const [show, setShow] = useState(false);
    const ref = useRef(null);

    const toggle = () => {
        setShow(!show);
    };

    // close dropdown when you click outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                if (!show) return;
                setShow(false);
            }
        };
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [show, ref]);

    // close dropdown when you click on "ESC" key
    useEffect(() => {
        const handleEscape = (event) => {
            if (!show) return;

            if (event.key === "Escape") {
                setShow(false);
            }
        };
        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [show]);

    return {
        show,
        toggle,
        ref
    };
};

const style = {
    menu: `block z-30 absolute top-0 left-0 bg-white float-left py-2 px-0 text-left bg-white rounded-md mt-0.5 mb-0 mx-0 bg-clip-padding shadow-md border-2 border-gray-200`,
    item: `block w-full text-center py-1 px-8 mb-2 text-sm font-normal clear-both whitespace-nowrap border-0 hover:text-blue-600 cursor-pointer`,
    button: `block w-full text-center py-1 px-8 mb-2 text-sm font-normal clear-both whitespace-nowrap border-0 cursor-pointer`
};

const Dropdown = ({ children }) => {
    const { show, toggle } = useToggle();
    /* First child contains the dropdown toggle */
    const dropdownToggle = children[0];

    /* Second child contains the dropdown menu */
    const dropdownMenu = children[1];

    return (
        <Fragment>
            <button
                className="focus:outline-none"
                onClick={toggle}
                type="button"
                id="options-menu"
                aria-expanded="true"
                aria-haspopup="true">
                {dropdownToggle}
            </button>
            {show && <>{dropdownMenu}</>}
        </Fragment>
    );
};

Dropdown.Toggle = ({ children }) => <Fragment>{children}</Fragment>;

Dropdown.Menu = ({ children }) => (
    <div className="relative">
        <div
            style={{ transform: "translate3d(0px, 3px, 0px)" }}
            className={style.menu}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu">
            {children}
        </div>
    </div>
);

/* You can wrap the a tag with Link and pass href prop to Link if you are using either Create-React-App, Next.js or Gatsby */
Dropdown.Item = ({ children, button }) => (
    <span tabIndex={0} className={button ? style.button : style.item} role="menuitem">
        {children}
    </span>
);

Dropdown.Divider = () => <hr className="my-2" />;

Dropdown.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};
Dropdown.Item.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired,
    button: PropTypes.bool
};
Dropdown.Toggle.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};
Dropdown.Menu.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object
    ]).isRequired
};

export default Dropdown;
