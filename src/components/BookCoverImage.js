import PropTypes from "prop-types";

/**
 * Displays book cover image
 * @param {Object} book - Book to display
 */
function BookCoverImage({ book }) {
    let backgroundImage = book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail;

    return (
        <div className="book-cover"
            style={{
                width: 128,
                height: 193,
                backgroundImage: backgroundImage ?
                    `url(${backgroundImage})` :
                    "none"
            }}></div>
    );
}

BookCoverImage.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookCoverImage;