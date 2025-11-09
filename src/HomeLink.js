import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Displays link to home page
 * @param {string} styleClass - Class name to apply
 */
function HomeLink({ styleClass = "close-search" }) {
    return (
        <div className={styleClass}>
            <Link to="/" title="Back to home" aria-label="Back to home">Home</Link>
        </div>
    );
}

HomeLink.propTypes = {
    styleClass: PropTypes.string,
};

export default HomeLink;