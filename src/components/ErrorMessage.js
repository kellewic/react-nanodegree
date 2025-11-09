import PropTypes from "prop-types";

/**
 * Displays error message
 * @param {Object} error - Error object to display
 */
function ErrorMessage({ error }) {
    return (
        <div className="error-container">
            <div className="error">Error: {error.message}</div>
        </div>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.object.isRequired,
};

export default ErrorMessage;