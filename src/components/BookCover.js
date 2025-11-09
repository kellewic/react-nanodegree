import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookCoverImage from "./BookCoverImage";

/**
 * Displays book cover with link to details page
 * @param {Object} book - Book to display
 */
function BookCover({ book }) {
    let backgroundImage = book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail;

    return (
        <Link to={`/books/${book.id}`} state={{ book }} title="View book details" className="book-cover-link">
            <BookCoverImage book={book} />
        </Link>
    );
}

BookCover.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookCover;