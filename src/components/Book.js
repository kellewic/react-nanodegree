import PropTypes from "prop-types";
import BookCover from "./BookCover";
import BookControlMenu from "./BookControlMenu";

/**
 * Displays book with title, subtitle, and authors along with a control menu to move the book to a different shelf
 * @param {Object} book - Book to display
 */
const Book = ({ book }) => {
    const bookTitle = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;

    return (
        <div className="book">
            <div className="book-top">
                <BookCover book={book} />
                <BookControlMenu book={book} />
            </div>
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{book.authors?.join(", ")}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

export default Book;