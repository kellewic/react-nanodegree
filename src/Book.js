import PropTypes from "prop-types";
import BookControlMenu from "./BookControlMenu";

const Book = ({ book }) => {
    const bookTitle = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?.thumbnail})` }}></div>
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